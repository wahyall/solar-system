import { useSyncExternalStore } from 'react';
import type { BodyKey } from './orbits';

export type ViewMode = 'tour' | 'explore';
/** A body, or the whole-system overview. */
export type FocusKey = BodyKey | 'system';

/** Simulated days per real second. Index into SPEEDS. */
export const SPEEDS = [
  { label: '−1 year/s', days: -365.25 },
  { label: '−1 month/s', days: -30 },
  { label: '−1 week/s', days: -7 },
  { label: '−1 day/s', days: -1 },
  { label: '−1 hour/s', days: -1 / 24 },
  { label: 'Real time', days: 1 / 86400 },
  { label: '1 hour/s', days: 1 / 24 },
  { label: '1 day/s', days: 1 },
  { label: '1 week/s', days: 7 },
  { label: '1 month/s', days: 30 },
  { label: '1 year/s', days: 365.25 },
] as const;

export const REALTIME_SPEED = 5;
/** Start live: the scene shows the real configuration right now. */
export const DEFAULT_SPEED = REALTIME_SPEED;

export interface Readout {
  /** heliocentric distance, AU */
  sunAU: number;
  /** distance from Earth, AU (moon: km in earthKm) */
  earthAU: number;
  earthKm: number;
  /** light travel time from the Sun, seconds */
  lightSec: number;
}

export interface SimState {
  mode: ViewMode;
  /** focused body in explore mode */
  focus: FocusKey;
  /** tour: index of the active tour section */
  tourIndex: number;
  playing: boolean;
  speedIndex: number;
  /** current simulated time (ms since epoch), written by the engine ~10x/s */
  simTime: number;
  /** real clock at the moment simTime was written */
  wallTime: number;
  /** a request from UI to jump the clock; engine consumes it */
  jumpTo: number | null;
  readout: Readout | null;
  loaded: boolean;
  loadProgress: number;
  error: string | null;
  showLabels: boolean;
  showOrbits: boolean;
}

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

let state: SimState = {
  mode: 'tour',
  focus: 'sun',
  tourIndex: 0,
  playing: !prefersReducedMotion,
  speedIndex: DEFAULT_SPEED,
  simTime: Date.now(),
  wallTime: Date.now(),
  jumpTo: null,
  readout: null,
  loaded: false,
  loadProgress: 0,
  error: null,
  showLabels: true,
  showOrbits: true,
};

const listeners = new Set<() => void>();

export const simStore = {
  get: () => state,
  set: (patch: Partial<SimState>) => {
    state = { ...state, ...patch };
    listeners.forEach((l) => l());
  },
  subscribe: (l: () => void) => {
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  },
};

export function useSim<T>(selector: (s: SimState) => T): T {
  return useSyncExternalStore(
    simStore.subscribe,
    () => selector(state),
    () => selector(state),
  );
}
