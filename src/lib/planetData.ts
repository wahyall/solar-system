import type { BodyKey } from './orbits';

export interface AtmosphereSpec {
  /** shell radius as a multiple of the body radius */
  scale: number;
  /** scattering tint (linear RGB, roughly a Rayleigh/Mie blend) */
  color: [number, number, number];
  /** overall density multiplier */
  density: number;
}

export interface BodyInfo {
  key: BodyKey;
  name: string;
  label: string;
  /** display radius in scene units (not to scale with distance) */
  radius: number;
  textureUrl: string;
  description: string;
  stats: { label: string; value: string }[];
  displayColor: string;
  trailColor: number;
  /** sidereal rotation period in hours; negative = retrograde about IAU north */
  rotationHours: number;
  /** IAU north pole, J2000 equatorial right ascension / declination, degrees */
  poleRA: number;
  poleDec: number;
  atmosphere?: AtmosphereSpec;
  hasRing?: boolean;
  ringTextureUrl?: string;
  /** ring inner/outer radius as multiples of the body radius */
  ringInner?: number;
  ringOuter?: number;
  hasClouds?: boolean;
  cloudTextureUrl?: string;
  nightTextureUrl?: string;
}

export interface TourStop extends BodyInfo {
  scrollStart: number;
  scrollEnd: number;
}

const sun: BodyInfo = {
  key: 'sun',
  name: 'Sun',
  label: 'STAR · TYPE G2V',
  radius: 8,
  textureUrl: '/textures/2k_sun.jpg',
  displayColor: '#FF6B35',
  trailColor: 0xff6b35,
  rotationHours: 609.12,
  poleRA: 286.13,
  poleDec: 63.87,
  description:
    'The Sun is the star at the center of our Solar System. It is a nearly perfect sphere of hot plasma, heated to incandescence by nuclear fusion reactions in its core. The Sun radiates this energy mainly as light, ultraviolet, and infrared radiation, and is the most important source of energy for life on Earth.',
  stats: [
    { label: 'DIAMETER', value: '1.39 million km' },
    { label: 'MASS', value: '1.989 × 10³⁰ kg' },
    { label: 'SURFACE TEMP', value: '5,500°C' },
    { label: 'AGE', value: '4.6 billion years' },
  ],
};

const mercury: BodyInfo = {
  key: 'mercury',
  name: 'Mercury',
  label: 'PLANET · TERRESTRIAL',
  radius: 0.9,
  textureUrl: '/textures/2k_mercury.jpg',
  displayColor: '#C4C4C4',
  trailColor: 0xc4c4c4,
  rotationHours: 1407.6,
  poleRA: 281.01,
  poleDec: 61.42,
  description:
    "Mercury is the smallest planet in the Solar System and the closest to the Sun. Its orbit around the Sun takes 87.97 Earth days, the shortest of all the Sun's planets. Mercury has no natural satellites and no substantial atmosphere.",
  stats: [
    { label: 'DIAMETER', value: '4,879 km' },
    { label: 'DISTANCE FROM SUN', value: '57.9 million km' },
    { label: 'ORBITAL PERIOD', value: '88 days' },
    { label: 'SURFACE TEMP', value: '-180 to 430°C' },
  ],
};

const venus: BodyInfo = {
  key: 'venus',
  name: 'Venus',
  label: 'PLANET · TERRESTRIAL',
  radius: 1.9,
  textureUrl: '/textures/2k_venus_surface.jpg',
  displayColor: '#E8DCC8',
  trailColor: 0xe8dcc8,
  rotationHours: -5832.5,
  poleRA: 272.76,
  poleDec: 67.16,
  atmosphere: { scale: 1.07, color: [1.0, 0.78, 0.45], density: 2.2 },
  description:
    'Venus is the second planet from the Sun. It has a dense atmosphere consisting mainly of carbon dioxide, which creates a runaway greenhouse effect making it the hottest planet in the Solar System. Venus rotates in the opposite direction of most planets.',
  stats: [
    { label: 'DIAMETER', value: '12,104 km' },
    { label: 'DISTANCE FROM SUN', value: '108.2 million km' },
    { label: 'ORBITAL PERIOD', value: '225 days' },
    { label: 'SURFACE TEMP', value: '462°C average' },
  ],
};

const earth: BodyInfo = {
  key: 'earth',
  name: 'Earth',
  label: 'PLANET · TERRESTRIAL',
  radius: 2,
  textureUrl: '/textures/2k_earth_daymap.jpg',
  displayColor: '#4ECDC4',
  trailColor: 0x4ecdc4,
  rotationHours: 23.9345,
  poleRA: 0,
  poleDec: 90,
  hasClouds: true,
  cloudTextureUrl: '/textures/2k_earth_clouds.jpg',
  nightTextureUrl: '/textures/2k_earth_nightmap.jpg',
  atmosphere: { scale: 1.045, color: [0.28, 0.55, 1.0], density: 1.2 },
  description:
    "Earth is the third planet from the Sun and the only astronomical object known to harbor life. About 71% of Earth's surface is made up of the ocean, dwarfing Earth's polar ice, lakes, and rivers. Earth's atmosphere protects life by absorbing solar radiation.",
  stats: [
    { label: 'DIAMETER', value: '12,742 km' },
    { label: 'DISTANCE FROM SUN', value: '149.6 million km' },
    { label: 'ORBITAL PERIOD', value: '365.25 days' },
    { label: 'SURFACE TEMP', value: '15°C average' },
  ],
};

export const moonData: BodyInfo = {
  key: 'moon',
  name: 'Moon',
  label: 'NATURAL SATELLITE · EARTH',
  radius: 0.55,
  textureUrl: '/textures/2k_moon.jpg',
  displayColor: '#D8D8D0',
  trailColor: 0xd8d8d0,
  rotationHours: 655.72, // tidally locked; orientation is set to face Earth
  poleRA: 269.99,
  poleDec: 66.54,
  description:
    "The Moon is Earth's only natural satellite. It is tidally locked, so the same hemisphere always faces Earth. Its gravity drives the ocean tides, and its phases come from the changing angle between the Sun, Earth and Moon.",
  stats: [
    { label: 'DIAMETER', value: '3,474 km' },
    { label: 'DISTANCE FROM EARTH', value: '384,400 km avg' },
    { label: 'ORBITAL PERIOD', value: '27.3 days' },
    { label: 'SURFACE TEMP', value: '-173 to 127°C' },
  ],
};

const mars: BodyInfo = {
  key: 'mars',
  name: 'Mars',
  label: 'PLANET · TERRESTRIAL',
  radius: 1.25,
  textureUrl: '/textures/2k_mars.jpg',
  displayColor: '#FF6B35',
  trailColor: 0xff6b35,
  rotationHours: 24.6229,
  poleRA: 317.68,
  poleDec: 52.89,
  atmosphere: { scale: 1.03, color: [1.0, 0.62, 0.4], density: 0.55 },
  description:
    "Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System. It is often referred to as the 'Red Planet' due to the iron oxide prevalent on its surface. Mars has two natural satellites, Phobos and Deimos.",
  stats: [
    { label: 'DIAMETER', value: '6,779 km' },
    { label: 'DISTANCE FROM SUN', value: '227.9 million km' },
    { label: 'ORBITAL PERIOD', value: '687 days' },
    { label: 'SURFACE TEMP', value: '-63°C average' },
  ],
};

const jupiter: BodyInfo = {
  key: 'jupiter',
  name: 'Jupiter',
  label: 'PLANET · GAS GIANT',
  radius: 6,
  textureUrl: '/textures/2k_jupiter.jpg',
  displayColor: '#D4A574',
  trailColor: 0xd4a574,
  rotationHours: 9.925,
  poleRA: 268.06,
  poleDec: 64.5,
  atmosphere: { scale: 1.025, color: [0.95, 0.82, 0.62], density: 0.6 },
  description:
    "Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass more than two and a half times that of all the other planets combined. Jupiter's Great Red Spot is a giant storm that has lasted hundreds of years.",
  stats: [
    { label: 'DIAMETER', value: '139,820 km' },
    { label: 'DISTANCE FROM SUN', value: '778.5 million km' },
    { label: 'ORBITAL PERIOD', value: '11.86 years' },
    { label: 'MOONS', value: '95 known' },
  ],
};

const saturn: BodyInfo = {
  key: 'saturn',
  name: 'Saturn',
  label: 'PLANET · GAS GIANT',
  radius: 5,
  textureUrl: '/textures/2k_saturn.jpg',
  displayColor: '#F0E68C',
  trailColor: 0xf0e68c,
  rotationHours: 10.656,
  poleRA: 40.59,
  poleDec: 83.54,
  hasRing: true,
  ringTextureUrl: '/textures/2k_saturn_ring_alpha.png',
  ringInner: 1.24,
  ringOuter: 2.27,
  atmosphere: { scale: 1.025, color: [0.98, 0.88, 0.62], density: 0.55 },
  description:
    "Saturn is the sixth planet from the Sun and the second-largest in the Solar System. It is a gas giant with an average radius of about nine and a half times that of Earth. Saturn's famous ring system is made up of billions of particles of ice and rock.",
  stats: [
    { label: 'DIAMETER', value: '116,460 km' },
    { label: 'DISTANCE FROM SUN', value: '1.43 billion km' },
    { label: 'ORBITAL PERIOD', value: '29.45 years' },
    { label: 'RING DIAMETER', value: '282,000 km' },
  ],
};

const uranus: BodyInfo = {
  key: 'uranus',
  name: 'Uranus',
  label: 'PLANET · ICE GIANT',
  radius: 3.2,
  textureUrl: '/textures/2k_uranus.jpg',
  displayColor: '#87CEEB',
  trailColor: 0x87ceeb,
  rotationHours: -17.24,
  poleRA: 257.31,
  poleDec: -15.18,
  atmosphere: { scale: 1.035, color: [0.55, 0.88, 0.95], density: 0.8 },
  description:
    'Uranus is the seventh planet from the Sun. It has the third-largest planetary radius and fourth-largest planetary mass in the Solar System. Uranus has a unique rotation — it rotates on its side with an axial tilt of 98 degrees.',
  stats: [
    { label: 'DIAMETER', value: '50,724 km' },
    { label: 'DISTANCE FROM SUN', value: '2.87 billion km' },
    { label: 'ORBITAL PERIOD', value: '84 years' },
    { label: 'AXIAL TILT', value: '97.8 degrees' },
  ],
};

const neptune: BodyInfo = {
  key: 'neptune',
  name: 'Neptune',
  label: 'PLANET · ICE GIANT',
  radius: 3.1,
  textureUrl: '/textures/2k_neptune.jpg',
  displayColor: '#4169E1',
  trailColor: 0x4169e1,
  rotationHours: 16.11,
  poleRA: 299.36,
  poleDec: 43.46,
  atmosphere: { scale: 1.035, color: [0.35, 0.55, 1.0], density: 0.85 },
  description:
    "Neptune is the eighth and farthest-known Solar planet from the Sun. It is the fourth-largest planet in the Solar System by diameter, the third-most-massive planet, and the densest giant planet. Neptune's winds are the fastest in the Solar System, reaching 2,100 km/h.",
  stats: [
    { label: 'DIAMETER', value: '49,244 km' },
    { label: 'DISTANCE FROM SUN', value: '4.5 billion km' },
    { label: 'ORBITAL PERIOD', value: '164.8 years' },
    { label: 'WIND SPEED', value: 'up to 2,100 km/h' },
  ],
};

const tourBodies = [sun, mercury, venus, earth, mars, jupiter, saturn, uranus, neptune];
const tourLengths = [1000, 1000, 1000, 1000, 1000, 1250, 1250, 1250, 1250];

let cursor = 0;
/** Scroll-driven guided tour, in order from the Sun outwards. */
export const planetData: TourStop[] = tourBodies.map((body, i) => {
  const stop = { ...body, scrollStart: cursor, scrollEnd: cursor + tourLengths[i] };
  cursor += tourLengths[i];
  return stop;
});

export const MAX_SCROLL = cursor;

/** Every body that can be focused in explore mode, in display order. */
export const allBodies: BodyInfo[] = [sun, mercury, venus, earth, moonData, mars, jupiter, saturn, uranus, neptune];

export const bodyByKey = Object.fromEntries(allBodies.map((b) => [b.key, b])) as Record<BodyKey, BodyInfo>;
