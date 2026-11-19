/**
 * Planet positions from JPL "Approximate Positions of the Planets"
 * (Standish & Williams), Table 1, valid 1800 AD – 2050 AD.
 * https://ssd.jpl.nasa.gov/planets/approx_pos.html
 *
 * Output is heliocentric, J2000 ecliptic, in AU.
 */

export type BodyKey =
  | 'sun'
  | 'mercury'
  | 'venus'
  | 'earth'
  | 'moon'
  | 'mars'
  | 'jupiter'
  | 'saturn'
  | 'uranus'
  | 'neptune';

export type PlanetKey = Exclude<BodyKey, 'sun' | 'moon'>;

// [a, e, I, L, longPeri, longNode] and their rates per Julian century.
type Elements = readonly [number, number, number, number, number, number];

const ELEMENTS: Record<PlanetKey, { base: Elements; rate: Elements }> = {
  mercury: {
    base: [0.38709927, 0.20563593, 7.00497902, 252.2503235, 77.45779628, 48.33076593],
    rate: [0.00000037, 0.00001906, -0.00594749, 149472.67411175, 0.16047689, -0.12534081],
  },
  venus: {
    base: [0.72333566, 0.00677672, 3.39467605, 181.9790995, 131.60246718, 76.67984255],
    rate: [0.0000039, -0.00004107, -0.0007889, 58517.81538729, 0.00268329, -0.27769418],
  },
  // Earth-Moon barycentre
  earth: {
    base: [1.00000261, 0.01671123, -0.00001531, 100.46457166, 102.93768193, 0],
    rate: [0.00000562, -0.00004392, -0.01294668, 35999.37244981, 0.32327364, 0],
  },
  mars: {
    base: [1.52371034, 0.0933941, 1.84969142, -4.55343205, -23.94362959, 49.55953891],
    rate: [0.00001847, 0.00007882, -0.00813131, 19140.30268499, 0.44441088, -0.29257343],
  },
  jupiter: {
    base: [5.202887, 0.04838624, 1.30439695, 34.39644051, 14.72847983, 100.47390909],
    rate: [-0.00011607, -0.00013253, -0.00183714, 3034.74612775, 0.21252668, 0.20469106],
  },
  saturn: {
    base: [9.53667594, 0.05386179, 2.48599187, 49.95424423, 92.59887831, 113.66242448],
    rate: [-0.0012506, -0.00050991, 0.00193609, 1222.49362201, -0.41897216, -0.28867794],
  },
  uranus: {
    base: [19.18916464, 0.04725744, 0.77263783, 313.23810451, 170.9542763, 74.01692503],
    rate: [-0.00196176, -0.00004397, -0.00242939, 428.48202785, 0.40805281, 0.04240589],
  },
  neptune: {
    base: [30.06992276, 0.00859048, 1.77004347, -55.12002969, 44.96476227, 131.78422574],
    rate: [0.00026291, 0.00005105, 0.00035372, 218.45945325, -0.32241464, -0.00508664],
  },
};

export const PLANET_KEYS: PlanetKey[] = [
  'mercury',
  'venus',
  'earth',
  'mars',
  'jupiter',
  'saturn',
  'uranus',
  'neptune',
];

/** Validity window of Table 1. */
export const MIN_DATE_MS = Date.UTC(1800, 0, 1);
export const MAX_DATE_MS = Date.UTC(2050, 11, 31);

const DEG = Math.PI / 180;
const J2000_JD = 2451545.0;
const MS_PER_DAY = 86400000;

export const julianDate = (ms: number) => ms / MS_PER_DAY + 2440587.5;
export const daysSinceJ2000 = (ms: number) => julianDate(ms) - J2000_JD;

export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

const wrap180 = (deg: number) => {
  let d = deg % 360;
  if (d > 180) d -= 360;
  if (d < -180) d += 360;
  return d;
};

/** Solve Kepler's equation M = E - e sin E (degrees in/out). */
const eccentricAnomaly = (Mdeg: number, e: number) => {
  const eStar = e / DEG;
  let E = Mdeg + eStar * Math.sin(Mdeg * DEG);
  for (let i = 0; i < 12; i++) {
    const dM = Mdeg - (E - eStar * Math.sin(E * DEG));
    const dE = dM / (1 - e * Math.cos(E * DEG));
    E += dE;
    if (Math.abs(dE) <= 1e-6) break;
  }
  return E;
};

export interface OrbitState {
  /** heliocentric ecliptic J2000 position, AU */
  position: Vec3;
  /** mean anomaly, degrees in [-180, 180] */
  meanAnomaly: number;
  /** current elements, degrees / AU */
  a: number;
  e: number;
  I: number;
  argPeri: number;
  node: number;
}

const elementsAt = (key: PlanetKey, T: number) => {
  const { base, rate } = ELEMENTS[key];
  const a = base[0] + rate[0] * T;
  const e = base[1] + rate[1] * T;
  const I = base[2] + rate[2] * T;
  const L = base[3] + rate[3] * T;
  const peri = base[4] + rate[4] * T;
  const node = base[5] + rate[5] * T;
  return { a, e, I, L, argPeri: peri - node, node, M: wrap180(L - peri) };
};

/** Position on the orbit defined by elements, for a given mean anomaly. */
export const positionFromElements = (
  a: number,
  e: number,
  Ideg: number,
  argPeriDeg: number,
  nodeDeg: number,
  Mdeg: number,
): Vec3 => {
  const E = eccentricAnomaly(Mdeg, e) * DEG;
  const xp = a * (Math.cos(E) - e);
  const yp = a * Math.sqrt(1 - e * e) * Math.sin(E);
  const w = argPeriDeg * DEG;
  const O = nodeDeg * DEG;
  const I = Ideg * DEG;
  const cw = Math.cos(w);
  const sw = Math.sin(w);
  const cO = Math.cos(O);
  const sO = Math.sin(O);
  const cI = Math.cos(I);
  const sI = Math.sin(I);
  return {
    x: (cw * cO - sw * sO * cI) * xp + (-sw * cO - cw * sO * cI) * yp,
    y: (cw * sO + sw * cO * cI) * xp + (-sw * sO + cw * cO * cI) * yp,
    z: sw * sI * xp + cw * sI * yp,
  };
};

export const planetState = (key: PlanetKey, ms: number): OrbitState => {
  const T = daysSinceJ2000(ms) / 36525;
  const el = elementsAt(key, T);
  return {
    position: positionFromElements(el.a, el.e, el.I, el.argPeri, el.node, el.M),
    meanAnomaly: el.M,
    a: el.a,
    e: el.e,
    I: el.I,
    argPeri: el.argPeri,
    node: el.node,
  };
};

/**
 * Low-precision geocentric Moon position (ecliptic of date ≈ J2000 here),
 * from the standard truncated lunar theory (mean elements + main terms).
 * Returns direction (unit vector) and distance in km.
 */
export const moonGeocentric = (ms: number) => {
  const d = daysSinceJ2000(ms);
  const L = 218.316 + 13.176396 * d; // mean longitude
  const M = 134.963 + 13.064993 * d; // mean anomaly
  const F = 93.272 + 13.22935 * d; // argument of latitude
  const lon = (L + 6.289 * Math.sin(M * DEG)) * DEG;
  const lat = 5.128 * Math.sin(F * DEG) * DEG;
  const distKm = 385001 - 20905 * Math.cos(M * DEG);
  return {
    dir: {
      x: Math.cos(lat) * Math.cos(lon),
      y: Math.cos(lat) * Math.sin(lon),
      z: Math.sin(lat),
    },
    distKm,
  };
};

/** Greenwich mean sidereal time, radians. */
export const gmstRadians = (ms: number) => {
  const deg = 280.46061837 + 360.98564736629 * daysSinceJ2000(ms);
  return (((deg % 360) + 360) % 360) * DEG;
};

/** Earth's mean obliquity at J2000, radians. */
export const EARTH_OBLIQUITY = 23.4393 * DEG;

export const AU_KM = 149597870.7;
export const LIGHT_SECONDS_PER_AU = 499.004784;

export const length = (v: Vec3) => Math.hypot(v.x, v.y, v.z);
