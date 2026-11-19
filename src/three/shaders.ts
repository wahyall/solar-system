/**
 * GLSL for the solar system scene (WebGL2 / GLSL ES 3.0 via ShaderMaterial).
 *
 * Every lit shader takes the Sun position in world space and computes its own
 * terminator so the same light direction drives surfaces, clouds, atmosphere
 * and ring shadows. Final colour goes through Three's tone-mapping and
 * colour-space chunks so the same materials work with or without the composer.
 */

const OUTPUT = /* glsl */ `
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
`;

/** Hash-based 3D value noise + fBm (no texture lookups). */
const NOISE = /* glsl */ `
  float hash13(vec3 p) {
    p = fract(p * 0.1031);
    p += dot(p, p.zyx + 31.32);
    return fract((p.x + p.y) * p.z);
  }
  float vnoise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    vec3 u = f * f * (3.0 - 2.0 * f);
    float n000 = hash13(i);
    float n100 = hash13(i + vec3(1, 0, 0));
    float n010 = hash13(i + vec3(0, 1, 0));
    float n110 = hash13(i + vec3(1, 1, 0));
    float n001 = hash13(i + vec3(0, 0, 1));
    float n101 = hash13(i + vec3(1, 0, 1));
    float n011 = hash13(i + vec3(0, 1, 1));
    float n111 = hash13(i + vec3(1, 1, 1));
    return mix(
      mix(mix(n000, n100, u.x), mix(n010, n110, u.x), u.y),
      mix(mix(n001, n101, u.x), mix(n011, n111, u.x), u.y),
      u.z
    );
  }
  float fbm(vec3 p) {
    float a = 0.5;
    float s = 0.0;
    for (int i = 0; i < 5; i++) {
      s += a * vnoise(p);
      p = p * 2.03 + vec3(1.7, 9.2, 3.4);
      a *= 0.5;
    }
    return s;
  }
`;

const RAY_SPHERE = /* glsl */ `
  // returns (tNear, tFar); tNear > tFar when missed
  vec2 raySphere(vec3 ro, vec3 rd, float r) {
    float b = dot(ro, rd);
    float c = dot(ro, ro) - r * r;
    float h = b * b - c;
    if (h < 0.0) return vec2(1e9, -1e9);
    h = sqrt(h);
    return vec2(-b - h, -b + h);
  }
`;

/* ------------------------------------------------------------------ */
/* Shared vertex shader for spheres                                    */
/* ------------------------------------------------------------------ */

export const sphereVertex = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vWorldPos;
  varying vec3 vObjPos;
  void main() {
    vUv = uv;
    vObjPos = position;
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldPos = wp.xyz;
    vNormalW = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

/* ------------------------------------------------------------------ */
/* Sun photosphere                                                      */
/* ------------------------------------------------------------------ */

export const sunFragment = /* glsl */ `
  uniform sampler2D uMap;
  uniform float uTime;
  uniform float uIntensity;
  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vWorldPos;
  varying vec3 vObjPos;
  ${NOISE}
  void main() {
    vec3 p = normalize(vObjPos);
    // large convection cells drift slowly, granulation boils faster on top
    float cells = fbm(p * 5.0 + vec3(0.0, uTime * 0.012, 0.0));
    float gran = fbm(p * 34.0 + cells * 2.2 + vec3(uTime * 0.05));
    vec3 tex = texture2D(uMap, vUv).rgb;

    float mu = clamp(dot(normalize(vNormalW), normalize(cameraPosition - vWorldPos)), 0.0, 1.0);
    // quadratic limb darkening, coefficients close to the visible solar profile
    float limb = 1.0 - 0.47 * (1.0 - mu) - 0.23 * (1.0 - mu) * (1.0 - mu);
    vec3 limbTint = mix(vec3(1.0, 0.42, 0.12), vec3(1.0, 0.9, 0.72), pow(mu, 0.35));

    float detail = mix(0.72, 1.22, gran) * mix(0.85, 1.12, cells);
    vec3 col = (tex * 0.8 + vec3(0.55, 0.32, 0.12)) * detail * limb * limbTint * uIntensity;
    gl_FragColor = vec4(col, 1.0);
    ${OUTPUT}
  }
`;

/* ------------------------------------------------------------------ */
/* Corona billboard                                                     */
/* ------------------------------------------------------------------ */

export const coronaVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const coronaFragment = /* glsl */ `
  uniform float uTime;
  uniform float uRatio;   // sun radius / billboard half-size
  uniform float uIntensity;
  varying vec2 vUv;
  ${NOISE}
  void main() {
    vec2 q = vUv * 2.0 - 1.0;
    float r = length(q);
    float rs = r / uRatio;            // distance in sun radii
    float a = atan(q.y, q.x);
    float d = max(rs - 1.0, 0.0);
    // streamers: angular noise stretched radially, slowly evolving
    float n = fbm(vec3(cos(a) * 2.6, sin(a) * 2.6, d * 0.9 - uTime * 0.025));
    float streak = smoothstep(0.35, 0.85, n);
    float inner = exp(-d * 10.0);
    float outer = exp(-d * 2.4) * (0.15 + 0.9 * streak);
    float halo = exp(-d * 1.1) * 0.08;
    float edge = 1.0 - smoothstep(0.6, 1.0, r);
    vec3 col = vec3(1.0, 0.66, 0.34) * (inner * 1.4 + outer + halo) * edge * uIntensity;
    gl_FragColor = vec4(col, 1.0);
    ${OUTPUT}
  }
`;

/* ------------------------------------------------------------------ */
/* Generic rocky / gas planet                                           */
/* ------------------------------------------------------------------ */

const RING_SHADOW = /* glsl */ `
  uniform float uHasRing;
  uniform vec3 uRingNormal;
  uniform vec3 uCenter;
  uniform float uRingInner;
  uniform float uRingOuter;
  uniform sampler2D uRingMap;
  float ringShadow(vec3 p, vec3 L) {
    if (uHasRing < 0.5) return 1.0;
    float denom = dot(L, uRingNormal);
    if (abs(denom) < 1e-4) return 1.0;
    float t = dot(uCenter - p, uRingNormal) / denom;
    if (t <= 0.0) return 1.0;
    float rr = length(p + L * t - uCenter);
    float x = (rr - uRingInner) / (uRingOuter - uRingInner);
    if (x < 0.0 || x > 1.0) return 1.0;
    float alpha = texture2D(uRingMap, vec2(x, 0.5)).a;
    return 1.0 - alpha * 0.85;
  }
`;

export const planetFragment = /* glsl */ `
  uniform sampler2D uMap;
  uniform vec3 uSunPos;
  uniform vec3 uSunColor;
  uniform float uAmbient;
  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vWorldPos;
  ${RING_SHADOW}
  void main() {
    vec3 N = normalize(vNormalW);
    vec3 L = normalize(uSunPos - vWorldPos);
    float ndl = dot(N, L);
    // Lambert with a slightly softened terminator
    float diff = clamp((ndl + 0.03) / 1.03, 0.0, 1.0);
    vec3 albedo = texture2D(uMap, vUv).rgb;
    float shadow = ringShadow(vWorldPos, L);
    vec3 col = albedo * (uSunColor * diff * shadow + uAmbient);
    gl_FragColor = vec4(col, 1.0);
    ${OUTPUT}
  }
`;

/* ------------------------------------------------------------------ */
/* Earth: day/night, city lights, ocean glint, cloud shadows            */
/* ------------------------------------------------------------------ */

export const earthFragment = /* glsl */ `
  uniform sampler2D uDay;
  uniform sampler2D uNight;
  uniform sampler2D uClouds;
  uniform vec3 uSunPos;
  uniform vec3 uSunColor;
  uniform vec3 uAtmoColor;
  uniform float uCloudOffset;
  uniform float uAmbient;
  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vWorldPos;
  void main() {
    vec3 N = normalize(vNormalW);
    vec3 L = normalize(uSunPos - vWorldPos);
    vec3 V = normalize(cameraPosition - vWorldPos);
    float ndl = dot(N, L);
    float ndv = clamp(dot(N, V), 0.0, 1.0);

    vec3 day = texture2D(uDay, vUv).rgb;
    float cloud = texture2D(uClouds, vUv + vec2(uCloudOffset, 0.0)).r;

    // oceans are the only strongly blue-dominant regions of the day map
    float water = smoothstep(0.015, 0.06, day.b - max(day.r, day.g));

    float diff = clamp((ndl + 0.03) / 1.03, 0.0, 1.0);
    float cloudShadow = 1.0 - 0.55 * cloud;
    vec3 col = day * uSunColor * diff * cloudShadow;

    // sun glint on open water (Blinn-Phong lobe + Schlick fresnel)
    vec3 H = normalize(L + V);
    float spec = pow(max(dot(N, H), 0.0), 90.0);
    float fres = 0.02 + 0.98 * pow(1.0 - ndv, 5.0);
    col += uSunColor * spec * water * (1.0 - cloud) * step(0.0, ndl) * (0.6 + 2.0 * fres);

    // city lights fade in past the terminator, dimmed under clouds
    float nightMask = 1.0 - smoothstep(-0.18, 0.06, ndl);
    vec3 lights = texture2D(uNight, vUv).rgb * vec3(1.0, 0.82, 0.55);
    col += lights * nightMask * (1.0 - 0.75 * cloud) * 1.6;

    // thin blue limb from the atmosphere seen against the surface
    float rim = pow(1.0 - ndv, 3.0);
    float lit = smoothstep(-0.25, 0.4, ndl);
    col = mix(col, uAtmoColor * uSunColor * lit, rim * 0.55 * lit);
    col += day * uAmbient;
    gl_FragColor = vec4(col, 1.0);
    ${OUTPUT}
  }
`;

export const cloudFragment = /* glsl */ `
  uniform sampler2D uClouds;
  uniform vec3 uSunPos;
  uniform vec3 uSunColor;
  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vWorldPos;
  void main() {
    vec3 N = normalize(vNormalW);
    vec3 L = normalize(uSunPos - vWorldPos);
    float ndl = dot(N, L);
    float c = texture2D(uClouds, vUv).r;
    float alpha = smoothstep(0.12, 0.85, c) * 0.92;
    float diff = clamp((ndl + 0.08) / 1.08, 0.0, 1.0);
    // warm sunset tint on clouds near the terminator
    vec3 tint = mix(vec3(1.0, 0.5, 0.3), vec3(1.0), smoothstep(0.0, 0.35, ndl));
    vec3 col = tint * uSunColor * diff * 0.92 + vec3(0.004);
    gl_FragColor = vec4(col, alpha);
    ${OUTPUT}
  }
`;

/* ------------------------------------------------------------------ */
/* Atmosphere shell: single-scattering ray march (8 steps)              */
/* ------------------------------------------------------------------ */

export const atmosphereVertex = /* glsl */ `
  varying vec3 vWorldPos;
  void main() {
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldPos = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

export const atmosphereFragment = /* glsl */ `
  uniform vec3 uCenter;
  uniform float uPlanetR;
  uniform float uAtmoR;
  uniform vec3 uSunPos;
  uniform vec3 uSunColor;
  uniform vec3 uColor;
  uniform float uDensity;
  varying vec3 vWorldPos;
  ${RAY_SPHERE}
  void main() {
    vec3 ro = cameraPosition - uCenter;
    vec3 rd = normalize(vWorldPos - cameraPosition);
    vec2 ta = raySphere(ro, rd, uAtmoR);
    if (ta.x > ta.y) discard;
    float t0 = max(ta.x, 0.0);
    float t1 = ta.y;
    vec2 tp = raySphere(ro, rd, uPlanetR);
    if (tp.x < tp.y && tp.x > 0.0) t1 = min(t1, tp.x);
    if (t1 <= t0) discard;

    vec3 L = normalize(uSunPos - uCenter);
    float thick = uAtmoR - uPlanetR;
    float ds = (t1 - t0) / 8.0;
    float depth = 0.0;
    vec3 inscatter = vec3(0.0);
    for (int i = 0; i < 8; i++) {
      vec3 p = ro + rd * (t0 + (float(i) + 0.5) * ds);
      float r = length(p);
      float h = clamp((r - uPlanetR) / thick, 0.0, 1.0);
      float dens = exp(-h * 4.0) * (1.0 - h);
      depth += dens * ds / thick;
      float mu = dot(p / r, L);
      float sunVis = smoothstep(-0.22, 0.18, mu);
      // light reaching low, grazing samples is reddened
      vec3 sunTint = mix(vec3(1.0, 0.45, 0.25), vec3(1.0), smoothstep(-0.05, 0.4, mu));
      inscatter += dens * sunVis * sunTint * exp(-depth * 0.35) * ds / thick;
    }
    float cosT = dot(rd, L);
    float rayleigh = 0.75 * (1.0 + cosT * cosT);
    float g = 0.72;
    float mie = (1.0 - g * g) / pow(1.0 + g * g - 2.0 * g * cosT, 1.5) * 0.08;
    vec3 col = inscatter * uDensity * (uColor * rayleigh + vec3(mie)) * uSunColor * 0.22;
    gl_FragColor = vec4(col, 1.0);
    ${OUTPUT}
  }
`;

/* ------------------------------------------------------------------ */
/* Planetary ring                                                       */
/* ------------------------------------------------------------------ */

export const ringVertex = /* glsl */ `
  uniform float uInner;
  uniform float uOuter;
  varying float vRadial;
  varying vec3 vWorldPos;
  varying vec3 vNormalW;
  void main() {
    vRadial = (length(position.xy) - uInner) / (uOuter - uInner);
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldPos = wp.xyz;
    vNormalW = normalize(mat3(modelMatrix) * vec3(0.0, 0.0, 1.0));
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

export const ringFragment = /* glsl */ `
  uniform sampler2D uMap;
  uniform vec3 uSunPos;
  uniform vec3 uSunColor;
  uniform vec3 uCenter;
  uniform float uPlanetR;
  varying float vRadial;
  varying vec3 vWorldPos;
  varying vec3 vNormalW;
  void main() {
    vec4 tex = texture2D(uMap, vec2(clamp(vRadial, 0.0, 1.0), 0.5));
    if (tex.a < 0.01) discard;
    vec3 N = vNormalW;
    vec3 L = normalize(uSunPos - vWorldPos);
    vec3 V = normalize(cameraPosition - vWorldPos);
    float nl = dot(N, L);
    float nv = dot(N, V);
    float lit;
    if (nl * nv > 0.0) {
      // viewing the sunlit face: diffuse reflection off ice particles
      lit = 0.35 + 0.65 * abs(nl);
    } else {
      // viewing the unlit face: light diffusing through sparse regions
      float forward = pow(max(dot(-V, L), 0.0), 6.0);
      lit = (1.0 - tex.a) * 0.9 + 0.12 + forward * 0.8;
    }
    // planet shadow on the rings
    vec3 toC = uCenter - vWorldPos;
    float along = dot(toC, L);
    float dist = length(toC - L * along);
    float shadow = along > 0.0 ? smoothstep(uPlanetR * 0.97, uPlanetR * 1.03, dist) : 1.0;
    vec3 col = tex.rgb * uSunColor * lit * (0.08 + 0.92 * shadow);
    gl_FragColor = vec4(col, tex.a * 0.95);
    ${OUTPUT}
  }
`;

/* ------------------------------------------------------------------ */
/* Star points                                                          */
/* ------------------------------------------------------------------ */

export const starVertex = /* glsl */ `
  attribute float aSize;
  attribute vec3 aColor;
  uniform float uPixelRatio;
  varying vec3 vColor;
  void main() {
    vColor = aColor;
    gl_PointSize = aSize * uPixelRatio;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const starFragment = /* glsl */ `
  varying vec3 vColor;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    a *= a;
    gl_FragColor = vec4(vColor * a, 1.0);
    ${OUTPUT}
  }
`;

/* ------------------------------------------------------------------ */
/* Asteroid belt: Keplerian motion evaluated on the GPU                 */
/* ------------------------------------------------------------------ */

export const beltVertex = /* glsl */ `
  attribute vec4 aOrbit;   // a (AU), e, inclination (rad), node (rad)
  attribute vec3 aPhase;   // arg. perihelion (rad), mean anomaly at J2000 (rad), size
  uniform float uDays;
  uniform float uPixelRatio;
  uniform vec3 uSunPos;
  varying float vBright;
  // must match scaleDistance() in scale.ts
  float compress(float rAU) { return 20.0 + 45.0 * pow(rAU, 0.62); }
  void main() {
    float a = aOrbit.x, e = aOrbit.y, inc = aOrbit.z, node = aOrbit.w;
    float w = aPhase.x;
    float n = 0.01720209895 / (a * sqrt(a)); // rad/day (Gaussian constant)
    float M = mod(aPhase.y + n * uDays, 6.2831853);
    float E = M + e * sin(M);
    for (int i = 0; i < 3; i++) E = E - (E - e * sin(E) - M) / (1.0 - e * cos(E));
    float xp = a * (cos(E) - e);
    float yp = a * sqrt(1.0 - e * e) * sin(E);
    float cw = cos(w), sw = sin(w), cO = cos(node), sO = sin(node), cI = cos(inc), sI = sin(inc);
    vec3 ecl = vec3(
      (cw * cO - sw * sO * cI) * xp + (-sw * cO - cw * sO * cI) * yp,
      (cw * sO + sw * cO * cI) * xp + (-sw * sO + cw * cO * cI) * yp,
      sw * sI * xp + cw * sI * yp
    );
    float r = length(ecl);
    vec3 world = vec3(ecl.x, ecl.z, -ecl.y) / r * compress(r);
    vec4 mv = modelViewMatrix * vec4(world, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = clamp(aPhase.z * 260.0 / -mv.z, 0.6, 3.0) * uPixelRatio;
    vBright = 0.5 + 0.5 * aPhase.z;
  }
`;

export const beltFragment = /* glsl */ `
  varying float vBright;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    vec3 col = vec3(0.55, 0.5, 0.45) * vBright * 0.55;
    gl_FragColor = vec4(col, 1.0);
    ${OUTPUT}
  }
`;

/* ------------------------------------------------------------------ */
/* Orbit path with a fading trail behind the planet                     */
/* ------------------------------------------------------------------ */

export const orbitVertex = /* glsl */ `
  attribute float aM;
  varying float vM;
  void main() {
    vM = aM;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const orbitFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uM;        // planet's current mean anomaly, degrees
  uniform float uOpacity;
  uniform float uHighlight;
  varying float vM;
  void main() {
    float t = fract((uM - vM) / 360.0 + 1.0);
    float trail = pow(1.0 - t, 3.0);
    float a = uOpacity * (0.16 + 0.84 * trail) * (1.0 + uHighlight);
    gl_FragColor = vec4(uColor * a, 1.0);
    ${OUTPUT}
  }
`;
