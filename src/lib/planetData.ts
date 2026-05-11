export interface PlanetInfo {
  name: string;
  label: string;
  radius: number;
  position: [number, number, number];
  textureUrl: string;
  cameraZ: number;
  scrollStart: number;
  scrollEnd: number;
  emissive?: boolean;
  description: string;
  stats: { label: string; value: string }[];
  displayColor: string;
  trailColor: number;
  hasRing?: boolean;
  hasClouds?: boolean;
  cloudTextureUrl?: string;
  ringTextureUrl?: string;
  moons?: { radius: number; distance: number; textureUrl: string }[];
}

export const planetData: PlanetInfo[] = [
  {
    name: 'Sun',
    label: 'STAR · TYPE G2V',
    radius: 8,
    position: [0, 0, 0],
    textureUrl: '/textures/2k_sun.jpg',
    cameraZ: 20,
    scrollStart: 0,
    scrollEnd: 2000,
    emissive: true,
    displayColor: '#FF6B35',
    trailColor: 0xFF6B35,
    description:
      'The Sun is the star at the center of our Solar System. It is a nearly perfect sphere of hot plasma, heated to incandescence by nuclear fusion reactions in its core. The Sun radiates this energy mainly as light, ultraviolet, and infrared radiation, and is the most important source of energy for life on Earth.',
    stats: [
      { label: 'DIAMETER', value: '1.39 million km' },
      { label: 'MASS', value: '1.989 × 10³⁰ kg' },
      { label: 'SURFACE TEMP', value: '5,500°C' },
      { label: 'AGE', value: '4.6 billion years' },
    ],
  },
  {
    name: 'Mercury',
    label: 'PLANET · TERRESTRIAL',
    radius: 1.5,
    position: [0, 0, 40],
    textureUrl: '/textures/2k_mercury.jpg',
    cameraZ: 40,
    scrollStart: 2000,
    scrollEnd: 4000,
    displayColor: '#C4C4C4',
    trailColor: 0xc4c4c4,
    description:
      "Mercury is the smallest planet in the Solar System and the closest to the Sun. Its orbit around the Sun takes 87.97 Earth days, the shortest of all the Sun's planets. Mercury has no natural satellites and no substantial atmosphere.",
    stats: [
      { label: 'DIAMETER', value: '4,879 km' },
      { label: 'DISTANCE FROM SUN', value: '57.9 million km' },
      { label: 'ORBITAL PERIOD', value: '88 days' },
      { label: 'SURFACE TEMP', value: '-180 to 430°C' },
    ],
  },
  {
    name: 'Venus',
    label: 'PLANET · TERRESTRIAL',
    radius: 2.8,
    position: [0, 0, 60],
    textureUrl: '/textures/2k_venus_surface.jpg',
    cameraZ: 60,
    scrollStart: 4000,
    scrollEnd: 6000,
    displayColor: '#E8DCC8',
    trailColor: 0xe8dcc8,
    description:
      'Venus is the second planet from the Sun. It has a dense atmosphere consisting mainly of carbon dioxide, which creates a runaway greenhouse effect making it the hottest planet in the Solar System. Venus rotates in the opposite direction of most planets.',
    stats: [
      { label: 'DIAMETER', value: '12,104 km' },
      { label: 'DISTANCE FROM SUN', value: '108.2 million km' },
      { label: 'ORBITAL PERIOD', value: '225 days' },
      { label: 'SURFACE TEMP', value: '462°C average' },
    ],
  },
  {
    name: 'Earth',
    label: 'PLANET · TERRESTRIAL',
    radius: 3,
    position: [0, 0, 80],
    textureUrl: '/textures/2k_earth_daymap.jpg',
    cameraZ: 80,
    scrollStart: 6000,
    scrollEnd: 8000,
    displayColor: '#4ECDC4',
    trailColor: 0x4ecdc4,
    hasClouds: true,
    cloudTextureUrl: '/textures/2k_earth_clouds.jpg',
    description:
      "Earth is the third planet from the Sun and the only astronomical object known to harbor life. About 71% of Earth's surface is made up of the ocean, dwarfing Earth's polar ice, lakes, and rivers. Earth's atmosphere protects life by absorbing solar radiation.",
    stats: [
      { label: 'DIAMETER', value: '12,742 km' },
      { label: 'DISTANCE FROM SUN', value: '149.6 million km' },
      { label: 'ORBITAL PERIOD', value: '365.25 days' },
      { label: 'SURFACE TEMP', value: '15°C average' },
    ],
  },
  {
    name: 'Mars',
    label: 'PLANET · TERRESTRIAL',
    radius: 2.2,
    position: [0, 0, 100],
    textureUrl: '/textures/2k_mars.jpg',
    cameraZ: 100,
    scrollStart: 8000,
    scrollEnd: 10000,
    displayColor: '#FF6B35',
    trailColor: 0xff6b35,
    description:
      "Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System. It is often referred to as the 'Red Planet' due to the iron oxide prevalent on its surface. Mars has two natural satellites, Phobos and Deimos.",
    stats: [
      { label: 'DIAMETER', value: '6,779 km' },
      { label: 'DISTANCE FROM SUN', value: '227.9 million km' },
      { label: 'ORBITAL PERIOD', value: '687 days' },
      { label: 'SURFACE TEMP', value: '-63°C average' },
    ],
  },
  {
    name: 'Jupiter',
    label: 'PLANET · GAS GIANT',
    radius: 7,
    position: [0, 0, 130],
    textureUrl: '/textures/2k_jupiter.jpg',
    cameraZ: 130,
    scrollStart: 10000,
    scrollEnd: 12500,
    displayColor: '#D4A574',
    trailColor: 0xd4a574,
    description:
      "Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass more than two and a half times that of all the other planets combined. Jupiter's Great Red Spot is a giant storm that has lasted hundreds of years.",
    stats: [
      { label: 'DIAMETER', value: '139,820 km' },
      { label: 'DISTANCE FROM SUN', value: '778.5 million km' },
      { label: 'ORBITAL PERIOD', value: '11.86 years' },
      { label: 'MOONS', value: '95 known' },
    ],
  },
  {
    name: 'Saturn',
    label: 'PLANET · GAS GIANT',
    radius: 6,
    position: [0, 0, 160],
    textureUrl: '/textures/2k_saturn.jpg',
    cameraZ: 160,
    scrollStart: 12500,
    scrollEnd: 15000,
    displayColor: '#F0E68C',
    trailColor: 0xf0e68c,
    hasRing: true,
    ringTextureUrl: '/textures/2k_saturn_ring_alpha.png',
    description:
      "Saturn is the sixth planet from the Sun and the second-largest in the Solar System. It is a gas giant with an average radius of about nine and a half times that of Earth. Saturn's famous ring system is made up of billions of particles of ice and rock.",
    stats: [
      { label: 'DIAMETER', value: '116,460 km' },
      { label: 'DISTANCE FROM SUN', value: '1.43 billion km' },
      { label: 'ORBITAL PERIOD', value: '29.45 years' },
      { label: 'RING DIAMETER', value: '282,000 km' },
    ],
  },
  {
    name: 'Uranus',
    label: 'PLANET · ICE GIANT',
    radius: 4,
    position: [0, 0, 190],
    textureUrl: '/textures/2k_uranus.jpg',
    cameraZ: 190,
    scrollStart: 15000,
    scrollEnd: 17500,
    displayColor: '#87CEEB',
    trailColor: 0x87ceeb,
    description:
      'Uranus is the seventh planet from the Sun. It has the third-largest planetary radius and fourth-largest planetary mass in the Solar System. Uranus has a unique rotation — it rotates on its side with an axial tilt of 98 degrees.',
    stats: [
      { label: 'DIAMETER', value: '50,724 km' },
      { label: 'DISTANCE FROM SUN', value: '2.87 billion km' },
      { label: 'ORBITAL PERIOD', value: '84 years' },
      { label: 'AXIAL TILT', value: '97.8 degrees' },
    ],
  },
  {
    name: 'Neptune',
    label: 'PLANET · ICE GIANT',
    radius: 3.9,
    position: [0, 0, 220],
    textureUrl: '/textures/2k_neptune.jpg',
    cameraZ: 220,
    scrollStart: 17500,
    scrollEnd: 20000,
    displayColor: '#4169E1',
    trailColor: 0x4169e1,
    description:
      "Neptune is the eighth and farthest-known Solar planet from the Sun. It is the fourth-largest planet in the Solar System by diameter, the third-most-massive planet, and the densest giant planet. Neptune's winds are the fastest in the Solar System, reaching 2,100 km/h.",
    stats: [
      { label: 'DIAMETER', value: '49,244 km' },
      { label: 'DISTANCE FROM SUN', value: '4.5 billion km' },
      { label: 'ORBITAL PERIOD', value: '164.8 years' },
      { label: 'WIND SPEED', value: 'up to 2,100 km/h' },
    ],
  },
];

export const MAX_SCROLL = 20000;
