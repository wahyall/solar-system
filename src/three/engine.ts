import * as THREE from 'three';
import Lenis from 'lenis';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

import { allBodies, planetData, MAX_SCROLL, type BodyInfo } from '@/lib/planetData';
import {
  AU_KM,
  LIGHT_SECONDS_PER_AU,
  MAX_DATE_MS,
  MIN_DATE_MS,
  daysSinceJ2000,
  gmstRadians,
  moonGeocentric,
  planetState,
  positionFromElements,
  type BodyKey,
  type PlanetKey,
  type Vec3,
} from '@/lib/orbits';
import { SPEEDS, simStore, type FocusKey, type Readout, type SimState } from '@/lib/simStore';
import { eclToThree, helioToScene, poleToScene, scaleDistance } from './scale';
import * as S from './shaders';

const MS_PER_DAY = 86400000;
const TAU = Math.PI * 2;
const UP = new THREE.Vector3(0, 1, 0);
const ORIGIN = new THREE.Vector3();
/** Moon's mean distance in scene units (≈ 3.2 Earth display radii). */
const MOON_DISTANCE = 6.4;

interface BodyRuntime {
  info: BodyInfo;
  root: THREE.Group;
  tilt: THREE.Group;
  spin: THREE.Group;
  mesh: THREE.Mesh;
  clouds?: THREE.Mesh;
  cloudUniforms?: { uCloudOffset: { value: number } };
  orbitUniforms?: { uM: { value: number }; uHighlight: { value: number } };
  spinAngle: number;
  cloudDrift: number;
  helio: Vec3;
  label: HTMLButtonElement;
}

/** Deterministic PRNG so the belt and starfield are identical every load. */
const mulberry32 = (seed: number) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const shortestAngle = (a: number) => Math.atan2(Math.sin(a), Math.cos(a));
const damp = (lambda: number, dt: number) => 1 - Math.exp(-lambda * dt);

/** Spherical interpolation of two offset vectors (direction slerp + length lerp). */
const slerpOffset = (a: THREE.Vector3, b: THREE.Vector3, t: number, out: THREE.Vector3) => {
  const la = a.length();
  const lb = b.length();
  if (la < 1e-6 || lb < 1e-6) return out.lerpVectors(a, b, t);
  const da = a.clone().divideScalar(la);
  const db = b.clone().divideScalar(lb);
  const dot = THREE.MathUtils.clamp(da.dot(db), -1, 1);
  const angle = Math.acos(dot);
  if (angle < 1e-4) {
    out.copy(da);
  } else {
    let axis = new THREE.Vector3().crossVectors(da, db);
    if (axis.lengthSq() < 1e-10) axis = new THREE.Vector3().crossVectors(da, UP);
    if (axis.lengthSq() < 1e-10) axis.set(1, 0, 0);
    axis.normalize();
    out.copy(da).applyAxisAngle(axis, angle * t);
  }
  return out.multiplyScalar(THREE.MathUtils.lerp(la, lb, t));
};

export function createEngine(canvas: HTMLCanvasElement, labelLayer: HTMLDivElement): () => void {
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
  } catch {
    simStore.set({ error: 'WebGL is not available in this browser.' });
    return () => {};
  }

  const isMobile = () => window.innerWidth < 768;
  /** Vertical FOV that widens in portrait so subjects keep similar screen width. */
  const fovFor = (aspect: number) => THREE.MathUtils.clamp(45 / Math.pow(Math.min(aspect, 1), 0.6), 45, 68);
  const pixelRatio = () => Math.min(window.devicePixelRatio, isMobile() ? 1.5 : 2);

  renderer.setPixelRatio(pixelRatio());
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.5;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(0x000000, 1);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    fovFor(window.innerWidth / window.innerHeight),
    window.innerWidth / window.innerHeight,
    0.05,
    7000,
  );
  camera.position.set(0, 12, 60);

  /* ----------------------------- post ---------------------------------- */
  const composer = new EffectComposer(renderer);
  composer.setPixelRatio(pixelRatio());
  composer.setSize(window.innerWidth, window.innerHeight);
  composer.addPass(new RenderPass(scene, camera));
  // Threshold in linear HDR (before tone mapping): only the photosphere,
  // the inner corona and sun glints exceed it, ordinary lit surfaces do not.
  const bloom = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.42, 0.35, 1.0);
  composer.addPass(bloom);
  composer.addPass(new OutputPass());

  /* ----------------------------- loading ------------------------------- */
  const manager = new THREE.LoadingManager();
  manager.onProgress = (_url, loaded, total) => simStore.set({ loadProgress: loaded / total });
  manager.onLoad = () => simStore.set({ loaded: true, loadProgress: 1 });
  manager.onError = (url) => console.warn('Failed to load', url);
  const loader = new THREE.TextureLoader(manager);
  const maxAniso = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  const textures = new Map<string, THREE.Texture>();
  const tex = (url: string, srgb = true) => {
    const key = `${url}|${srgb}`;
    let t = textures.get(key);
    if (!t) {
      t = loader.load(url);
      t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
      t.anisotropy = maxAniso;
      textures.set(key, t);
    }
    return t;
  };

  /* ----------------------------- shared uniforms ----------------------- */
  const sunPos = new THREE.Vector3(0, 0, 0);
  // Kept below the bloom threshold for bright albedos (Saturn ≈ 0.8); display
  // brightness comes from tone-mapping exposure, which runs after bloom.
  const sunColor = new THREE.Vector3(1.0, 0.97, 0.92).multiplyScalar(1.1);
  const pixelRatioUniform = { value: renderer.getPixelRatio() };

  /* ----------------------------- background ---------------------------- */
  const sky = new THREE.Group();
  scene.add(sky);
  {
    const milky = new THREE.Mesh(
      new THREE.SphereGeometry(3000, 64, 32),
      new THREE.MeshBasicMaterial({
        map: tex('/textures/2k_stars_milky_way.jpg'),
        side: THREE.BackSide,
        depthWrite: false,
        color: new THREE.Color(0.32, 0.32, 0.36),
      }),
    );
    // The panorama is a galactic equirectangular map: centre (l = 0) at u = 0.5,
    // longitude increasing to the left, galactic south at the top edge (the
    // Magellanic Clouds sit in the upper half). With SphereGeometry UVs that
    // means local +X = galactic centre, +Y = south galactic pole, +Z = l 90°.
    const ngp = poleToScene(192.85948, 27.12825);
    const gc = poleToScene(266.4051, -28.93617);
    gc.sub(ngp.clone().multiplyScalar(gc.dot(ngp))).normalize();
    const l90 = new THREE.Vector3().crossVectors(ngp, gc);
    milky.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(gc, ngp.clone().negate(), l90));
    milky.renderOrder = -10;
    sky.add(milky);

    const rand = mulberry32(7);
    const count = 7000;
    const pos = new Float32Array(count * 3);
    const size = new Float32Array(count);
    const color = new Float32Array(count * 3);
    const palette = [
      [0.7, 0.8, 1.0],
      [0.9, 0.93, 1.0],
      [1.0, 0.96, 0.9],
      [1.0, 0.85, 0.68],
      [1.0, 0.74, 0.55],
    ];
    for (let i = 0; i < count; i++) {
      const u = rand() * 2 - 1;
      const th = rand() * TAU;
      const s = Math.sqrt(1 - u * u);
      pos.set([s * Math.cos(th) * 2800, u * 2800, s * Math.sin(th) * 2800], i * 3);
      const m = Math.pow(rand(), 5); // many faint, few bright
      size[i] = 1.0 + m * 2.6;
      const c = palette[Math.floor(rand() * palette.length)];
      const b = 0.18 + m * 1.1;
      color.set([c[0] * b, c[1] * b, c[2] * b], i * 3);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('aSize', new THREE.BufferAttribute(size, 1));
    g.setAttribute('aColor', new THREE.BufferAttribute(color, 3));
    const stars = new THREE.Points(
      g,
      new THREE.ShaderMaterial({
        vertexShader: S.starVertex,
        fragmentShader: S.starFragment,
        uniforms: { uPixelRatio: pixelRatioUniform },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    stars.renderOrder = -9;
    sky.add(stars);
  }

  /* ----------------------------- bodies -------------------------------- */
  const bodies = {} as Record<BodyKey, BodyRuntime>;
  const pickables: THREE.Object3D[] = [];
  const sunUniforms = { uTime: { value: 0 } };
  let corona: THREE.Mesh | null = null;

  const makeLabel = (info: BodyInfo) => {
    const el = document.createElement('button');
    el.type = 'button';
    el.className = 'body-label';
    el.style.setProperty('--dot', info.displayColor);
    el.textContent = info.name;
    el.setAttribute('aria-label', `Focus ${info.name}`);
    el.addEventListener('click', () => simStore.set({ mode: 'explore', focus: info.key }));
    labelLayer.appendChild(el);
    return el;
  };

  for (const info of allBodies) {
    const root = new THREE.Group();
    const tilt = new THREE.Group();
    const spin = new THREE.Group();
    root.add(tilt);
    tilt.add(spin);
    scene.add(root);
    if (info.key !== 'moon') tilt.quaternion.setFromUnitVectors(UP, poleToScene(info.poleRA, info.poleDec));
    const segs = info.radius > 2.5 ? 128 : 96;
    const geo = new THREE.SphereGeometry(info.radius, segs, segs / 2);

    let material: THREE.ShaderMaterial;
    const rt: Partial<BodyRuntime> = { info, root, tilt, spin, spinAngle: 0, cloudDrift: 0, helio: { x: 0, y: 0, z: 0 } };

    if (info.key === 'sun') {
      material = new THREE.ShaderMaterial({
        vertexShader: S.sphereVertex,
        fragmentShader: S.sunFragment,
        uniforms: { uMap: { value: tex(info.textureUrl) }, uTime: sunUniforms.uTime, uIntensity: { value: 1.35 } },
      });
      const half = info.radius * 4.5;
      corona = new THREE.Mesh(
        new THREE.PlaneGeometry(half * 2, half * 2),
        new THREE.ShaderMaterial({
          vertexShader: S.coronaVertex,
          fragmentShader: S.coronaFragment,
          uniforms: { uTime: sunUniforms.uTime, uRatio: { value: info.radius / half }, uIntensity: { value: 0.4 } },
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        }),
      );
      corona.renderOrder = 5;
      root.add(corona);
    } else if (info.key === 'earth') {
      const cloudOffset = { value: 0 };
      material = new THREE.ShaderMaterial({
        vertexShader: S.sphereVertex,
        fragmentShader: S.earthFragment,
        uniforms: {
          uDay: { value: tex(info.textureUrl) },
          uNight: { value: tex(info.nightTextureUrl!) },
          uClouds: { value: tex(info.cloudTextureUrl!, false) },
          uSunPos: { value: sunPos },
          uSunColor: { value: sunColor },
          uAtmoColor: { value: new THREE.Vector3(...info.atmosphere!.color) },
          uCloudOffset: cloudOffset,
          uAmbient: { value: 0.012 },
        },
      });
      const clouds = new THREE.Mesh(
        new THREE.SphereGeometry(info.radius * 1.012, 128, 64),
        new THREE.ShaderMaterial({
          vertexShader: S.sphereVertex,
          fragmentShader: S.cloudFragment,
          uniforms: { uClouds: { value: tex(info.cloudTextureUrl!, false) }, uSunPos: { value: sunPos }, uSunColor: { value: sunColor } },
          transparent: true,
          depthWrite: false,
        }),
      );
      clouds.renderOrder = 1;
      spin.add(clouds);
      rt.clouds = clouds;
      rt.cloudUniforms = { uCloudOffset: cloudOffset };
    } else {
      const ring = info.hasRing
        ? { inner: info.radius * info.ringInner!, outer: info.radius * info.ringOuter!, map: tex(info.ringTextureUrl!) }
        : null;
      material = new THREE.ShaderMaterial({
        vertexShader: S.sphereVertex,
        fragmentShader: S.planetFragment,
        uniforms: {
          uMap: { value: tex(info.textureUrl) },
          uSunPos: { value: sunPos },
          uSunColor: { value: sunColor },
          uAmbient: { value: 0.015 },
          uHasRing: { value: ring ? 1 : 0 },
          uRingNormal: { value: poleToScene(info.poleRA, info.poleDec) },
          uCenter: { value: root.position },
          uRingInner: { value: ring?.inner ?? 0 },
          uRingOuter: { value: ring?.outer ?? 1 },
          uRingMap: { value: ring?.map ?? null },
        },
      });
      if (ring) {
        const ringMesh = new THREE.Mesh(
          new THREE.RingGeometry(ring.inner, ring.outer, 256, 1),
          new THREE.ShaderMaterial({
            vertexShader: S.ringVertex,
            fragmentShader: S.ringFragment,
            uniforms: {
              uMap: { value: ring.map },
              uInner: { value: ring.inner },
              uOuter: { value: ring.outer },
              uSunPos: { value: sunPos },
              uSunColor: { value: sunColor },
              uCenter: { value: root.position },
              uPlanetR: { value: info.radius },
            },
            transparent: true,
            depthWrite: false,
            side: THREE.DoubleSide,
          }),
        );
        ringMesh.rotation.x = -Math.PI / 2; // ring plane normal → local +Y (the pole)
        ringMesh.renderOrder = 1;
        tilt.add(ringMesh);
      }
    }

    if (info.atmosphere) {
      const a = info.atmosphere;
      const shell = new THREE.Mesh(
        new THREE.SphereGeometry(info.radius * a.scale, 96, 48),
        new THREE.ShaderMaterial({
          vertexShader: S.atmosphereVertex,
          fragmentShader: S.atmosphereFragment,
          uniforms: {
            uCenter: { value: root.position },
            uPlanetR: { value: info.radius },
            uAtmoR: { value: info.radius * a.scale },
            uSunPos: { value: sunPos },
            uSunColor: { value: sunColor },
            uColor: { value: new THREE.Vector3(...a.color) },
            uDensity: { value: a.density },
          },
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        }),
      );
      shell.renderOrder = 2;
      root.add(shell);
    }

    const mesh = new THREE.Mesh(geo, material);
    mesh.userData.key = info.key;
    spin.add(mesh);
    pickables.push(mesh);
    rt.mesh = mesh;
    rt.label = makeLabel(info);
    bodies[info.key] = rt as BodyRuntime;
  }

  /* ----------------------------- orbits -------------------------------- */
  const orbitGroup = new THREE.Group();
  scene.add(orbitGroup);
  {
    const now = Date.now();
    for (const stop of planetData) {
      if (stop.key === 'sun') continue;
      const st = planetState(stop.key as PlanetKey, now);
      const n = 512;
      const pos = new Float32Array((n + 1) * 3);
      const ms = new Float32Array(n + 1);
      const v = new THREE.Vector3();
      for (let i = 0; i <= n; i++) {
        const M = (i / n) * 360;
        helioToScene(positionFromElements(st.a, st.e, st.I, st.argPeri, st.node, M > 180 ? M - 360 : M), v);
        pos.set([v.x, v.y, v.z], i * 3);
        ms[i] = M;
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      g.setAttribute('aM', new THREE.BufferAttribute(ms, 1));
      const uniforms = {
        uColor: { value: new THREE.Color(stop.trailColor) },
        uM: { value: 0 },
        uOpacity: { value: 0.55 },
        uHighlight: { value: 0 },
      };
      const line = new THREE.Line(
        g,
        new THREE.ShaderMaterial({
          vertexShader: S.orbitVertex,
          fragmentShader: S.orbitFragment,
          uniforms,
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        }),
      );
      orbitGroup.add(line);
      bodies[stop.key].orbitUniforms = uniforms;
    }
    // faint lunar orbit, carried with Earth
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 128; i++) {
      const a = (i / 128) * TAU;
      pts.push(new THREE.Vector3(Math.cos(a) * MOON_DISTANCE, 0, Math.sin(a) * MOON_DISTANCE));
    }
    const moonOrbit = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(pts),
      new THREE.LineBasicMaterial({ color: 0xd8d8d0, transparent: true, opacity: 0.18, depthWrite: false }),
    );
    moonOrbit.name = 'moonOrbit';
    bodies.earth.root.add(moonOrbit);
  }

  /* ----------------------------- asteroid belt ------------------------- */
  const beltUniforms = { uDays: { value: 0 }, uPixelRatio: pixelRatioUniform, uSunPos: { value: sunPos } };
  {
    const rand = mulberry32(1801);
    const gauss = () => Math.sqrt(-2 * Math.log(rand() + 1e-9)) * Math.cos(TAU * rand());
    const kirkwood = [2.5, 2.82, 2.95, 3.27];
    const count = 5000;
    const orbit = new Float32Array(count * 4);
    const phase = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      let a = 0;
      do {
        a = 2.1 + rand() * 1.25;
      } while (kirkwood.some((k) => Math.abs(a - k) < 0.025));
      const e = Math.min(0.3, Math.abs(gauss()) * 0.08);
      const inc = (Math.abs(gauss()) * 7 * Math.PI) / 180;
      orbit.set([a, e, inc, rand() * TAU], i * 4);
      phase.set([rand() * TAU, rand() * TAU, Math.pow(rand(), 3)], i * 3);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(count * 3), 3));
    g.setAttribute('aOrbit', new THREE.BufferAttribute(orbit, 4));
    g.setAttribute('aPhase', new THREE.BufferAttribute(phase, 3));
    // positions are computed in the vertex shader, so give a bounding sphere
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), scaleDistance(3.6));
    const belt = new THREE.Points(
      g,
      new THREE.ShaderMaterial({ vertexShader: S.beltVertex, fragmentShader: S.beltFragment, uniforms: beltUniforms }),
    );
    scene.add(belt);
  }

  /* ----------------------------- controls & scroll --------------------- */
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enablePan = false;
  controls.rotateSpeed = 0.6;
  controls.zoomSpeed = 0.9;
  controls.enabled = false;

  const lenis = new Lenis({
    duration: 0.9,
    wheelMultiplier: 1.4,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    syncTouch: true,
  });

  const applyModeDom = (mode: SimState['mode']) => {
    const explore = mode === 'explore';
    document.documentElement.style.overflow = explore ? 'hidden' : '';
    renderer.domElement.style.touchAction = explore ? 'none' : 'pan-y';
    renderer.domElement.style.cursor = explore ? 'grab' : 'pointer';
    if (explore) lenis.stop();
    else lenis.start();
  };

  /* ----------------------------- camera rig ---------------------------- */
  const bodyPos = (key: FocusKey) => (key === 'system' ? ORIGIN : bodies[key].root.position);
  const subjectRadius = (key: FocusKey) => {
    if (key === 'system') return 120;
    const info = bodies[key].info;
    return info.hasRing ? info.radius * info.ringOuter! * 0.8 : info.radius;
  };
  /** A three-quarter, sun-side view direction so the subject reads as lit. */
  const litDirection = (key: FocusKey, out: THREE.Vector3) => {
    if (key === 'sun') return out.set(0.42, 0.26, 1).normalize();
    if (key === 'system') return out.set(0.15, 0.9, 0.42).normalize();
    const p = bodyPos(key);
    const toSun = new THREE.Vector3(-p.x, 0, -p.z).normalize();
    const side = new THREE.Vector3().crossVectors(UP, toSun).normalize();
    const a = THREE.MathUtils.degToRad(38);
    return out
      .copy(toSun)
      .multiplyScalar(Math.cos(a))
      .addScaledVector(side, Math.sin(a))
      .addScaledVector(UP, 0.24)
      .normalize();
  };

  const anchor = new THREE.Vector3();
  const offset = camera.position.clone();
  const tmp = new THREE.Vector3();
  const goal = new THREE.Vector3();
  let transition: null | { fromAnchor: THREE.Vector3; fromOffset: THREE.Vector3; goalOffset: THREE.Vector3 | null; t: number; dur: number } = null;

  const beginTransition = (goalOffset: THREE.Vector3 | null, dur: number) => {
    transition = {
      fromAnchor: anchor.clone(),
      fromOffset: camera.position.clone().sub(anchor),
      goalOffset,
      t: 0,
      dur,
    };
  };

  let tourIndex = 0;
  let focus: FocusKey = simStore.get().focus;
  let mode = simStore.get().mode;

  /** Pull back when the side panel leaves a narrow free area (e.g. portrait tablets). */
  const tourFit = () => {
    const w = window.innerWidth;
    if (w < 768) return 1;
    const free = w - THREE.MathUtils.clamp(w * 0.3, 320, 420);
    return Math.max(1, 0.9 / Math.sqrt(free / window.innerHeight));
  };

  const tourOffset = (key: BodyKey, progress: number, out: THREE.Vector3) => {
    const r = subjectRadius(key) * tourFit();
    const dist = key === 'sun' ? r * THREE.MathUtils.lerp(5.2, 2.7, progress) : r * THREE.MathUtils.lerp(5.4, 3.0, progress);
    return litDirection(key, out).multiplyScalar(dist);
  };

  const exploreGoal = (key: FocusKey) => {
    const r = subjectRadius(key);
    const lit = litDirection(key, new THREE.Vector3());
    if (key === 'system') return lit.multiplyScalar(560);
    const current = camera.position.clone().sub(anchor).normalize();
    return current.lerp(lit, 0.7).normalize().multiplyScalar(r * 4.2);
  };

  const configureControls = (key: FocusKey) => {
    const r = subjectRadius(key);
    controls.minDistance = key === 'system' ? 40 : Math.max(r * 1.45, (bodies[key as BodyKey]?.info.radius ?? 1) * 1.3);
    controls.maxDistance = 1500;
  };

  const enterExplore = (key: FocusKey) => {
    focus = key;
    controls.enabled = false;
    beginTransition(exploreGoal(key), key === 'system' ? 2.4 : 1.8);
    configureControls(key);
  };

  /* ----------------------------- store sync ---------------------------- */
  applyModeDom(mode);
  const unsubscribe = simStore.subscribe(() => {
    const st = simStore.get();
    if (st.mode !== mode) {
      mode = st.mode;
      applyModeDom(mode);
      if (mode === 'explore') {
        enterExplore(st.focus);
      } else {
        controls.enabled = false;
        beginTransition(null, 1.6);
      }
    } else if (mode === 'explore' && st.focus !== focus) {
      enterExplore(st.focus);
    }
    const showOrbits = st.showOrbits;
    orbitGroup.visible = showOrbits;
    const mo = bodies.earth.root.getObjectByName('moonOrbit');
    if (mo) mo.visible = showOrbits;
  });

  /* ----------------------------- picking ------------------------------- */
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let downX = 0;
  let downY = 0;
  const onPointerDown = (e: PointerEvent) => {
    downX = e.clientX;
    downY = e.clientY;
  };
  const onPointerUp = (e: PointerEvent) => {
    if (Math.hypot(e.clientX - downX, e.clientY - downY) > 6) return;
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.set(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObjects(pickables, false)[0];
    if (hit) simStore.set({ mode: 'explore', focus: hit.object.userData.key as BodyKey });
  };
  renderer.domElement.addEventListener('pointerdown', onPointerDown);
  renderer.domElement.addEventListener('pointerup', onPointerUp);

  /* ----------------------------- resize -------------------------------- */
  let viewBlend = mode === 'tour' ? 1 : 0;
  const applyViewOffset = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    let ox = 0;
    let oy = 0;
    if (w >= 768) ox = THREE.MathUtils.clamp(w * 0.3, 320, 420) * 0.5 * viewBlend;
    else oy = h * 0.14 * viewBlend;
    camera.setViewOffset(w, h, ox, oy, w, h);
  };
  const onResize = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    camera.fov = fovFor(w / h);
    camera.aspect = w / h;
    applyViewOffset();
    renderer.setPixelRatio(pixelRatio());
    renderer.setSize(w, h);
    composer.setPixelRatio(pixelRatio());
    composer.setSize(w, h);
    pixelRatioUniform.value = renderer.getPixelRatio();
  };
  window.addEventListener('resize', onResize);

  const onContextLost = (e: Event) => {
    e.preventDefault();
    simStore.set({ error: 'The graphics context was lost. Reload the page to continue.' });
  };
  renderer.domElement.addEventListener('webglcontextlost', onContextLost);

  /* ----------------------------- per-frame ----------------------------- */
  let simTime = simStore.get().simTime;
  let last = performance.now();
  let elapsed = 0;
  let readoutTimer = 0;
  let raf = 0;
  const earthHelio: Vec3 = { x: 1, y: 0, z: 0 };
  let moonKm = 384400;

  const advanceSpin = (b: BodyRuntime, target: number, dAngle: number, dt: number) => {
    const cap = (TAU * dt) / 1.6; // never faster than one turn per 1.6 s on screen
    const capped = Math.abs(dAngle) > cap;
    b.spinAngle += capped ? Math.sign(dAngle) * cap : dAngle;
    // when running at a readable speed, converge onto the true rotation phase
    if (!capped) b.spinAngle += shortestAngle(target - b.spinAngle) * damp(4, dt);
    b.spin.rotation.y = b.spinAngle;
  };

  const updateBodies = (t: number, dDays: number, dt: number) => {
    const days = daysSinceJ2000(t);
    for (const stop of planetData) {
      if (stop.key === 'sun') continue;
      const b = bodies[stop.key];
      const st = planetState(stop.key as PlanetKey, t);
      b.helio = st.position;
      helioToScene(st.position, b.root.position);
      if (b.orbitUniforms) b.orbitUniforms.uM.value = (st.meanAnomaly + 360) % 360;
    }
    earthHelio.x = bodies.earth.helio.x;
    earthHelio.y = bodies.earth.helio.y;
    earthHelio.z = bodies.earth.helio.z;

    // Moon around Earth (distance scaled, direction real)
    const moon = moonGeocentric(t);
    moonKm = moon.distKm;
    const mb = bodies.moon;
    eclToThree(moon.dir, tmp).multiplyScalar((MOON_DISTANCE * moon.distKm) / 384400);
    mb.root.position.copy(bodies.earth.root.position).add(tmp);
    mb.helio = {
      x: earthHelio.x + (moon.dir.x * moon.distKm) / AU_KM,
      y: earthHelio.y + (moon.dir.y * moon.distKm) / AU_KM,
      z: earthHelio.z + (moon.dir.z * moon.distKm) / AU_KM,
    };
    // tidally locked: the near side (texture centre, local +X) faces Earth
    const toEarth = tmp.copy(bodies.earth.root.position).sub(mb.root.position);
    mb.spin.rotation.y = Math.atan2(-toEarth.z, toEarth.x);

    // axial rotation
    for (const info of allBodies) {
      if (info.key === 'moon') continue;
      const b = bodies[info.key];
      const dAngle = (TAU * dDays * 24) / info.rotationHours;
      const target = info.key === 'earth' ? gmstRadians(t) : ((TAU * days * 24) / info.rotationHours) % TAU;
      advanceSpin(b, target, dAngle, dt);
    }

    // Earth's clouds drift slowly relative to the surface
    const eb = bodies.earth;
    if (eb.clouds && eb.cloudUniforms) {
      const drift = (TAU * dDays) / 24;
      const cap = (TAU * dt) / 40;
      eb.cloudDrift += THREE.MathUtils.clamp(drift, -cap, cap);
      eb.clouds.rotation.y = eb.cloudDrift;
      eb.cloudUniforms.uCloudOffset.value = -eb.cloudDrift / TAU;
    }

    beltUniforms.uDays.value = days;
  };

  const updateCamera = (dt: number) => {
    viewBlend += ((mode === 'tour' ? 1 : 0) - viewBlend) * damp(3, dt);
    applyViewOffset();

    if (mode === 'tour') {
      const scroll = lenis.scroll;
      let idx = planetData.findIndex((p) => scroll >= p.scrollStart && scroll < p.scrollEnd);
      if (idx < 0) idx = planetData.length - 1;
      const stop = planetData[idx];
      const progress = THREE.MathUtils.clamp((scroll - stop.scrollStart) / (stop.scrollEnd - stop.scrollStart), 0, 1);
      if (idx !== tourIndex) {
        tourIndex = idx;
        beginTransition(null, 1.5);
        simStore.set({ tourIndex: idx });
      }
      document.documentElement.style.setProperty('--scroll-progress', String(Math.min(scroll / MAX_SCROLL, 1)));
      const target = bodyPos(stop.key);
      tourOffset(stop.key, progress, goal);
      if (transition) {
        transition.t = Math.min(1, transition.t + dt / transition.dur);
        const e = easeInOutCubic(transition.t);
        anchor.lerpVectors(transition.fromAnchor, target, e);
        slerpOffset(transition.fromOffset, goal, e, offset);
        if (transition.t >= 1) transition = null;
      } else {
        anchor.copy(target);
        offset.copy(goal);
      }
      camera.position.copy(anchor).add(offset);
      camera.lookAt(anchor);
      controls.target.copy(anchor);
    } else {
      const target = bodyPos(focus);
      if (transition) {
        transition.t = Math.min(1, transition.t + dt / transition.dur);
        const e = easeInOutCubic(transition.t);
        anchor.lerpVectors(transition.fromAnchor, target, e);
        slerpOffset(transition.fromOffset, transition.goalOffset!, e, offset);
        camera.position.copy(anchor).add(offset);
        camera.lookAt(anchor);
        controls.target.copy(anchor);
        if (transition.t >= 1) {
          transition = null;
          controls.enabled = true;
        }
      } else {
        // follow the moving body without disturbing the user's orbit offset
        tmp.copy(target).sub(controls.target);
        camera.position.add(tmp);
        controls.target.copy(target);
        controls.update(dt);
        anchor.copy(target);
      }
    }

    // orbit highlight for the body in view
    const active = mode === 'tour' ? planetData[tourIndex].key : focus;
    for (const stop of planetData) {
      const u = bodies[stop.key].orbitUniforms;
      if (u) u.uHighlight.value += ((stop.key === active ? 0.8 : 0) - u.uHighlight.value) * damp(4, dt);
    }
  };

  const labelVec = new THREE.Vector3();
  const updateLabels = () => {
    const st = simStore.get();
    const show = st.showLabels && mode === 'explore' && st.loaded;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const tanHalf = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    for (const info of allBodies) {
      const b = bodies[info.key];
      const el = b.label;
      if (!show) {
        el.dataset.hidden = 'true';
        continue;
      }
      labelVec.copy(b.root.position);
      const dist = labelVec.distanceTo(camera.position);
      labelVec.project(camera);
      const behind = labelVec.z > 1;
      // hide the Moon label when it would sit on top of Earth's
      const tooSmall = info.key === 'moon' && dist > 160;
      if (behind || tooSmall || Math.abs(labelVec.x) > 1.2 || Math.abs(labelVec.y) > 1.2) {
        el.dataset.hidden = 'true';
        continue;
      }
      const screenR = (info.radius / (dist * tanHalf)) * (h / 2);
      const x = (labelVec.x * 0.5 + 0.5) * w;
      const y = (-labelVec.y * 0.5 + 0.5) * h + Math.min(screenR, h * 0.4) + 10;
      el.dataset.hidden = 'false';
      el.dataset.active = String(info.key === focus);
      el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translateX(-50%)`;
    }
  };

  const computeReadout = (key: FocusKey): Readout | null => {
    const len = (v: Vec3) => Math.hypot(v.x, v.y, v.z);
    const earthAU = (v: Vec3) => Math.hypot(v.x - earthHelio.x, v.y - earthHelio.y, v.z - earthHelio.z);
    if (key === 'system') return null;
    if (key === 'sun') return { sunAU: 0, earthAU: len(earthHelio), earthKm: len(earthHelio) * AU_KM, lightSec: 0 };
    if (key === 'moon') {
      const r = len(bodies.moon.helio);
      return { sunAU: r, earthAU: moonKm / AU_KM, earthKm: moonKm, lightSec: r * LIGHT_SECONDS_PER_AU };
    }
    const h = bodies[key].helio;
    const r = len(h);
    const e = key === 'earth' ? 0 : earthAU(h);
    return { sunAU: r, earthAU: e, earthKm: e * AU_KM, lightSec: r * LIGHT_SECONDS_PER_AU };
  };

  const tick = (now: number) => {
    raf = requestAnimationFrame(tick);
    const dt = Math.min((now - last) / 1000, 0.1);
    last = now;
    elapsed += dt;
    lenis.raf(now);

    const st = simStore.get();
    if (st.jumpTo !== null) {
      simTime = THREE.MathUtils.clamp(st.jumpTo, MIN_DATE_MS, MAX_DATE_MS);
      simStore.set({ jumpTo: null, simTime });
    }
    const dDays = st.playing ? SPEEDS[st.speedIndex].days * dt : 0;
    const next = simTime + dDays * MS_PER_DAY;
    simTime = THREE.MathUtils.clamp(next, MIN_DATE_MS, MAX_DATE_MS);
    if (simTime !== next && st.playing) simStore.set({ playing: false });

    updateBodies(simTime, simTime === next ? dDays : 0, dt);
    sunUniforms.uTime.value = elapsed;
    updateCamera(dt);
    if (corona) corona.quaternion.copy(camera.quaternion);
    sky.position.copy(camera.position); // camera-relative sky: no parallax
    updateLabels();
    composer.render(dt);

    readoutTimer += dt;
    if (readoutTimer > 0.1) {
      readoutTimer = 0;
      const key = mode === 'tour' ? planetData[tourIndex].key : focus;
      simStore.set({ simTime, wallTime: Date.now(), readout: computeReadout(key) });
    }
  };

  // place everything once before the first frame
  updateBodies(simTime, 0, 0);
  for (const info of allBodies) {
    if (info.key === 'moon') continue;
    const b = bodies[info.key];
    b.spinAngle = info.key === 'earth' ? gmstRadians(simTime) : ((TAU * daysSinceJ2000(simTime) * 24) / info.rotationHours) % TAU;
  }
  tourOffset('sun', 0, offset);
  camera.position.copy(offset);
  camera.lookAt(ORIGIN);
  applyViewOffset();
  if (mode === 'explore') enterExplore(focus);
  raf = requestAnimationFrame(tick);

  // Dev-only diagnostics: GPU frame timing and a no-bloom baseline.
  if (import.meta.env.DEV) {
    const gl = renderer.getContext();
    (window as unknown as Record<string, unknown>).__solar = {
      benchmark: (frames = 60) => {
        const px = new Uint8Array(4);
        const sync = () => gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px);
        composer.render(0.016);
        sync();
        renderer.info.autoReset = false;
        renderer.info.reset();
        const t0 = performance.now();
        for (let i = 0; i < frames; i++) composer.render(0.016);
        sync();
        const ms = (performance.now() - t0) / frames;
        const { calls, triangles } = renderer.info.render;
        renderer.info.autoReset = true;
        return { msPerFrame: ms, callsPerFrame: calls / frames, trianglesPerFrame: triangles / frames };
      },
      store: simStore,
      setBloom: (on: boolean) => {
        bloom.enabled = on;
      },
      settle: (frames = 40) => {
        for (let i = 0; i < frames; i++) tick(last + 100);
      },
    };
  }

  return () => {
    cancelAnimationFrame(raf);
    unsubscribe();
    window.removeEventListener('resize', onResize);
    renderer.domElement.removeEventListener('pointerdown', onPointerDown);
    renderer.domElement.removeEventListener('pointerup', onPointerUp);
    renderer.domElement.removeEventListener('webglcontextlost', onContextLost);
    controls.dispose();
    lenis.destroy();
    bloom.dispose();
    composer.dispose();
    scene.traverse((o) => {
      const m = o as THREE.Mesh;
      m.geometry?.dispose();
      const mat = m.material as THREE.Material | THREE.Material[] | undefined;
      if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
      else mat?.dispose();
    });
    textures.forEach((t) => t.dispose());
    renderer.dispose();
    labelLayer.replaceChildren();
    document.documentElement.style.overflow = '';
  };
}
