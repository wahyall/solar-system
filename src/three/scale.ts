import * as THREE from 'three';
import type { Vec3 } from '@/lib/orbits';

/**
 * Real distances would make every planet sub-pixel, so radial distance from
 * the Sun is compressed with a power curve. Directions (and therefore the
 * real configuration of the planets for a given date) are preserved.
 * Keep in sync with compress() in the belt shader.
 */
export const scaleDistance = (rAU: number) => 20 + 45 * Math.pow(rAU, 0.62);

/** J2000 ecliptic (x, y, z) → Three.js world (x, z, -y): ecliptic north is +Y. */
export const eclToThree = (v: Vec3, out = new THREE.Vector3()) => out.set(v.x, v.z, -v.y);

/** Heliocentric ecliptic AU → compressed scene position. */
export const helioToScene = (v: Vec3, out = new THREE.Vector3()) => {
  const r = Math.hypot(v.x, v.y, v.z);
  if (r === 0) return out.set(0, 0, 0);
  const k = scaleDistance(r) / r;
  return out.set(v.x * k, v.z * k, -v.y * k);
};

const DEG = Math.PI / 180;
const OBLIQUITY = 23.4393 * DEG;

/** IAU pole (RA/Dec, J2000 equatorial, degrees) → unit vector in scene space. */
export const poleToScene = (raDeg: number, decDeg: number) => {
  const ra = raDeg * DEG;
  const dec = decDeg * DEG;
  const xe = Math.cos(dec) * Math.cos(ra);
  const ye = Math.cos(dec) * Math.sin(ra);
  const ze = Math.sin(dec);
  // equatorial → ecliptic: rotate about x by the obliquity
  const ecl = {
    x: xe,
    y: ye * Math.cos(OBLIQUITY) + ze * Math.sin(OBLIQUITY),
    z: -ye * Math.sin(OBLIQUITY) + ze * Math.cos(OBLIQUITY),
  };
  return eclToThree(ecl).normalize();
};
