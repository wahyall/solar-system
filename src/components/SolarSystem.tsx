import { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import Lenis from 'lenis';
import { planetData, MAX_SCROLL } from '@/lib/planetData';

interface PlanetMeshes {
  sphere: THREE.Mesh;
  clouds?: THREE.Mesh;
  ring?: THREE.Mesh;
}

const SolarSystem = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    lenis: Lenis;
    planets: PlanetMeshes[];
  } | null>(null);

  const initScene = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x050508, 1.0);

    // Camera
    const isMobile = window.innerWidth < 768;
    const camera = new THREE.PerspectiveCamera(
      isMobile ? 75 : 60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 5, 40);
    camera.lookAt(0, 0, 0);

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050508);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x888899, 0.8);
    scene.add(ambientLight);

    const sunLight = new THREE.PointLight(0xffcc66, 3.0, 0, 0.5);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    const hemisphereLight = new THREE.HemisphereLight(0x6688cc, 0x443322, 0.4);
    scene.add(hemisphereLight);

    const cameraLight = new THREE.DirectionalLight(0xffffff, 0.6);
    cameraLight.position.copy(camera.position);
    scene.add(cameraLight);

    // Starfield
    const starCount = 5000;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 800;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 800;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 800;
    }
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({
      size: 0.5,
      color: 0xffffff,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Texture loader
    const textureLoader = new THREE.TextureLoader();
    const loadTexture = (url: string): Promise<THREE.Texture> =>
      new Promise((resolve, reject) => {
        textureLoader.load(url, resolve, undefined, reject);
      });

    // Create planet
    const createPlanetMesh = async (
      radius: number,
      textureUrl: string,
      position: [number, number, number],
      emissive: boolean
    ): Promise<THREE.Mesh> => {
      const geometry = new THREE.SphereGeometry(radius, 64, 64);
      const texture = await loadTexture(textureUrl);
      texture.colorSpace = THREE.SRGBColorSpace;
      let material: THREE.Material;
      if (emissive) {
        material = new THREE.MeshBasicMaterial({ map: texture });
      } else {
        material = new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.8,
          metalness: 0.1,
        });
      }
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(position[0], position[1], position[2]);
      return mesh;
    };

    // Create orbital trail
    const createTrail = (radius: number, color: number): THREE.Line => {
      const segments = 128;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(segments * 3);
      for (let i = 0; i < segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        positions[i * 3] = Math.cos(angle) * radius;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = Math.sin(angle) * radius;
      }
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const material = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0.15,
      });
      const line = new THREE.Line(geometry, material);
      return line;
    };

    // Create sun glow
    const sunGlowGeometry = new THREE.SphereGeometry(10, 64, 64);
    const sunGlowMaterial = new THREE.ShaderMaterial({
      transparent: true,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normal;
          vec3 viewPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * vec4(viewPosition, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          gl_FragColor = vec4(1.0, 0.6, 0.2, 1.0) * intensity * 0.8;
        }
      `,
    });
    const sunGlow = new THREE.Mesh(sunGlowGeometry, sunGlowMaterial);
    scene.add(sunGlow);

    // Initialize all planets
    const planets: PlanetMeshes[] = [];

    // Orbital data: angle + speed for each planet (skip Sun at index 0)
    const orbitalSpeeds = [0, 0.0008, 0.0006, 0.0005, 0.0004, 0.00025, 0.0002, 0.00015, 0.0001];
    const orbitalAngles: number[] = planetData.map(() => Math.random() * Math.PI * 2);
    const orbitalRadii: number[] = planetData.map((p) =>
      Math.sqrt(p.position[0] ** 2 + p.position[2] ** 2)
    );

    const initPlanets = async () => {
      for (let i = 0; i < planetData.length; i++) {
        const planet = planetData[i];
        const sphere = await createPlanetMesh(
          planet.radius,
          planet.textureUrl,
          planet.position,
          planet.emissive || false
        );
        scene.add(sphere);

        const meshes: PlanetMeshes = { sphere };

        // Add orbital trail (skip Sun)
        if (i > 0) {
          const trail = createTrail(orbitalRadii[i], planet.trailColor);
          scene.add(trail);
        }

        // Add clouds for Earth
        if (planet.hasClouds && planet.cloudTextureUrl) {
          const cloudGeometry = new THREE.SphereGeometry(planet.radius * 1.02, 64, 64);
          const cloudTexture = await loadTexture(planet.cloudTextureUrl);
          cloudTexture.colorSpace = THREE.SRGBColorSpace;
          const cloudMaterial = new THREE.MeshStandardMaterial({
            map: cloudTexture,
            transparent: true,
            opacity: 0.4,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            roughness: 1.0,
            metalness: 0.0,
          });
          const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
          cloudMesh.position.set(planet.position[0], planet.position[1], planet.position[2]);
          scene.add(cloudMesh);
          meshes.clouds = cloudMesh;
        }

        // Add ring for Saturn
        if (planet.hasRing && planet.ringTextureUrl) {
          const ringGeometry = new THREE.RingGeometry(7, 12, 128);
          const ringTexture = await loadTexture(planet.ringTextureUrl);
          ringTexture.colorSpace = THREE.SRGBColorSpace;

          const posAttr = ringGeometry.attributes.position;
          const uvAttr = ringGeometry.attributes.uv;
          for (let v = 0; v < posAttr.count; v++) {
            const x = posAttr.getX(v);
            const z = posAttr.getZ(v);
            const radius = Math.sqrt(x * x + z * z);
            const u = (radius - 7) / (12 - 7);
            uvAttr.setXY(v, u, 0.5);
          }
          uvAttr.needsUpdate = true;

          const ringMaterial = new THREE.MeshStandardMaterial({
            map: ringTexture,
            transparent: true,
            opacity: 0.9,
            side: THREE.DoubleSide,
            roughness: 0.9,
            metalness: 0.1,
          });
          const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
          ringMesh.rotation.x = Math.PI / 2 + (26.7 * Math.PI) / 180;
          ringMesh.position.set(planet.position[0], planet.position[1], planet.position[2]);
          scene.add(ringMesh);
          meshes.ring = ringMesh;
        }

        planets.push(meshes);
      }

      // Hide loading screen
      const loadingScreen = document.getElementById('loading-screen');
      if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.transition = 'opacity 0.8s ease';
        setTimeout(() => {
          loadingScreen.style.display = 'none';
        }, 800);
      }

      // Show nav
      const nav = document.getElementById('nav-bar');
      if (nav) {
        nav.style.opacity = '1';
      }
    };

    initPlanets();

    // Scroll setup
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: true,
    });

    // Camera offset for mouse pan
    const cameraOffset = { x: 0, y: 5 };
    const targetOffset = { x: 0, y: 5 };

    // Track the current scroll value for use in the animation loop
    let currentScroll = 0;

    lenis.on('scroll', ({ scroll }: { scroll: number }) => {
      currentScroll = scroll;
      const scrollProgress = Math.min(scroll / MAX_SCROLL, 1);

      // Find active planet
      const activePlanet =
        planetData.find((p) => scroll >= p.scrollStart && scroll < p.scrollEnd) ||
        planetData[planetData.length - 1];

      if (activePlanet) {
        const planetProgress =
          (scroll - activePlanet.scrollStart) /
          (activePlanet.scrollEnd - activePlanet.scrollStart);
        const targetZ = activePlanet.cameraZ + (planetProgress * 20 - 10);
        camera.position.z += (targetZ - camera.position.z) * 0.05;
      }

      camera.lookAt(0, 0, camera.position.z - 20);

      // Update CSS progress bar
      document.documentElement.style.setProperty(
        '--scroll-progress',
        scrollProgress.toString()
      );

      // Update content panel — handles both desktop & mobile info sets
      const currentIndex = planetData.indexOf(activePlanet);
      const planetCount = planetData.length;
      const infoPanels = document.querySelectorAll('.planet-info');
      infoPanels.forEach((el, i) => {
        const localIndex = i % planetCount;
        if (localIndex === currentIndex) {
          el.classList.add('active');
          el.classList.remove('inactive');
        } else {
          el.classList.add('inactive');
          el.classList.remove('active');
        }
      });
    });

    // Mouse pan
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;
      targetOffset.x -= deltaX * 0.01;
      targetOffset.y += deltaY * 0.01;
      targetOffset.y = Math.max(-10, Math.min(20, targetOffset.y));
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    renderer.domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch support
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.y;
      targetOffset.x -= deltaX * 0.01;
      targetOffset.y += deltaY * 0.01;
      targetOffset.y = Math.max(-10, Math.min(20, targetOffset.y));
      previousMousePosition = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    renderer.domElement.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);
    const currentBaseCam = new THREE.Vector3(0, 0, 40);
    const targetCamPos = new THREE.Vector3(0, 0, 40);
    const currentLookAt = new THREE.Vector3(0, 0, 0);
    const targetLookAt = new THREE.Vector3(0, 0, 0);

    // Animation loop
    const animate = (time?: number) => {
      requestAnimationFrame(animate);
      lenis.raf(time || performance.now());

      // Find which planet is currently active based on scroll
      const activePlanet =
        planetData.find((p) => currentScroll >= p.scrollStart && currentScroll < p.scrollEnd) ||
        planetData[planetData.length - 1];
      const activePlanetIndex = planetData.indexOf(activePlanet);

      // Rotate & orbit planets
      planets.forEach((mesh, i) => {
        // Self-rotation (axial spin)
        if (mesh.sphere) {
          mesh.sphere.rotation.y += 0.002 * (i + 1) * 0.1;
        }
        if (mesh.clouds) {
          mesh.clouds.rotation.y += 0.001;
        }
        if (mesh.ring) {
          mesh.ring.rotation.z = Math.PI / 2 + (26.7 * Math.PI) / 180;
        }

        let px = 0;
        let pz = 0;

        // Orbital revolution (skip Sun at index 0)
        if (i > 0 && orbitalRadii[i] > 0) {
          orbitalAngles[i] += orbitalSpeeds[i];

          px = Math.sin(orbitalAngles[i]) * orbitalRadii[i];
          pz = Math.cos(orbitalAngles[i]) * orbitalRadii[i];

          mesh.sphere.position.x = px;
          mesh.sphere.position.z = pz;

          if (mesh.clouds) {
            mesh.clouds.position.x = px;
            mesh.clouds.position.z = pz;
          }
          if (mesh.ring) {
            mesh.ring.position.x = px;
            mesh.ring.position.z = pz;
          }
        } else {
          px = planetData[i].position[0];
          pz = planetData[i].position[2];
        }

        // Make camera follow the active planet
        if (i === activePlanetIndex) {
          const planetProgress =
            (currentScroll - activePlanet.scrollStart) /
            (activePlanet.scrollEnd - activePlanet.scrollStart);

          if (i === 0) {
            targetCamPos.x = 0;
            targetCamPos.z = activePlanet.radius * (5 - planetProgress * 2.5);
            targetLookAt.set(0, 0, 0);
          } else {
            const dirX = Math.sin(orbitalAngles[i]);
            const dirZ = Math.cos(orbitalAngles[i]);
            
            // Camera distance from planet based on its radius
            const dist = activePlanet.radius * (5 - planetProgress * 2.5);
            
            targetCamPos.x = px + dirX * dist;
            targetCamPos.z = pz + dirZ * dist;
            
            targetLookAt.set(px, 0, pz);
          }
        }
      });

      // Interpolate base camera position
      currentBaseCam.x += (targetCamPos.x - currentBaseCam.x) * 0.05;
      currentBaseCam.z += (targetCamPos.z - currentBaseCam.z) * 0.05;

      // Smooth camera pan
      cameraOffset.x += (targetOffset.x - cameraOffset.x) * 0.05;
      cameraOffset.y += (targetOffset.y - cameraOffset.y) * 0.05;

      camera.position.x = currentBaseCam.x + cameraOffset.x;
      camera.position.y = cameraOffset.y; // Keep Y controlled by mouse pan offset
      camera.position.z = currentBaseCam.z;

      // Interpolate lookAt
      currentLookAt.x += (targetLookAt.x - currentLookAt.x) * 0.05;
      currentLookAt.y += (targetLookAt.y - currentLookAt.y) * 0.05;
      currentLookAt.z += (targetLookAt.z - currentLookAt.z) * 0.05;

      camera.lookAt(currentLookAt);

      // Keep camera light in sync with camera
      cameraLight.position.copy(camera.position);

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const onResize = () => {
      const isMobileNow = window.innerWidth < 768;
      camera.fov = isMobileNow ? 75 : 60;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    sceneRef.current = {
      renderer,
      scene,
      camera,
      lenis,
      planets,
    };

    return () => {
      window.removeEventListener('resize', onResize);
      renderer.domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      renderer.domElement.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      // Animation frame will stop on next cycle due to component unmount
      lenis.destroy();
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    const cleanup = initScene();
    return () => {
      if (cleanup) cleanup();
    };
  }, [initScene]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1,
      }}
    />
  );
};

export default SolarSystem;
