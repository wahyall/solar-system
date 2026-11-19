import { FastForward, Pause, Play, Rewind } from 'lucide-react';
import { REALTIME_SPEED, SPEEDS, simStore, useSim } from '@/lib/simStore';
import { formatDate, formatTime } from '@/lib/format';

const TimeControls = () => {
  const simTime = useSim((s) => s.simTime);
  const playing = useSim((s) => s.playing);
  const speedIndex = useSim((s) => s.speedIndex);
  const loaded = useSim((s) => s.loaded);
  const wallTime = useSim((s) => s.wallTime);

  const live = playing && speedIndex === REALTIME_SPEED && Math.abs(simTime - wallTime) < 120000;
  const speed = SPEEDS[speedIndex];
  const reversed = speed.days < 0;

  const step = (dir: -1 | 1) => {
    const next = Math.min(SPEEDS.length - 1, Math.max(0, speedIndex + dir));
    simStore.set({ speedIndex: next, playing: true });
  };

  return (
    <div
      className="time-controls glass"
      style={{ opacity: loaded ? 1 : 0 }}
      role="group"
      aria-label="Simulation time"
    >
      <div className="min-w-0">
        <p className="time-date" aria-live="off">
          {formatDate(simTime)}
          <span className="time-clock">{formatTime(simTime)}</span>
        </p>
        <p className="time-speed">
          <span className="time-clock-mobile">{formatTime(simTime)} · </span>
          {live ? (
            <span className="live-dot">Live</span>
          ) : (
            <>
              {playing ? speed.label : 'Paused'}
              {reversed && playing ? ' · rewinding' : ''}
            </>
          )}
        </p>
      </div>

      <div className="flex items-center gap-1">
        <button className="icon-btn" onClick={() => step(-1)} aria-label="Slower or reverse" disabled={speedIndex === 0}>
          <Rewind size={16} />
        </button>
        <button
          className="icon-btn icon-btn-primary"
          onClick={() => simStore.set({ playing: !playing })}
          aria-label={playing ? 'Pause' : 'Play'}
        >
          {playing ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <button
          className="icon-btn"
          onClick={() => step(1)}
          aria-label="Faster"
          disabled={speedIndex === SPEEDS.length - 1}
        >
          <FastForward size={16} />
        </button>
        <button
          className="text-btn"
          onClick={() => simStore.set({ jumpTo: Date.now(), speedIndex: REALTIME_SPEED, playing: true })}
          aria-label="Jump to the current date and time"
        >
          Now
        </button>
      </div>
    </div>
  );
};

export default TimeControls;
