import { useState } from 'react';
import { Eye, EyeOff, Orbit } from 'lucide-react';
import { allBodies, bodyByKey } from '@/lib/planetData';
import { simStore, useSim } from '@/lib/simStore';
import LiveReadout from './LiveReadout';
import Credits from './Credits';

const BodyList = ({ variant }: { variant: 'column' | 'row' }) => {
  const focus = useSim((s) => s.focus);
  return (
    <ul className={variant === 'column' ? 'body-list' : 'body-row'} aria-label="Bodies">
      {allBodies.map((b) => (
        <li key={b.key}>
          <button
            className="body-btn"
            aria-pressed={focus === b.key}
            onClick={() => simStore.set({ focus: b.key })}
          >
            <span className="body-dot" style={{ background: b.displayColor }} aria-hidden="true" />
            {b.name}
          </button>
        </li>
      ))}
    </ul>
  );
};

const Toggles = ({ stacked = false }: { stacked?: boolean }) => {
  const showLabels = useSim((s) => s.showLabels);
  const showOrbits = useSim((s) => s.showOrbits);
  return (
    <div className={stacked ? 'toggle-stack' : 'flex flex-wrap gap-1'}>
      <button className="text-btn" aria-pressed={showLabels} onClick={() => simStore.set({ showLabels: !showLabels })}>
        {showLabels ? <Eye size={14} /> : <EyeOff size={14} />} Labels
      </button>
      <button className="text-btn" aria-pressed={showOrbits} onClick={() => simStore.set({ showOrbits: !showOrbits })}>
        <Orbit size={14} /> Orbits
      </button>
    </div>
  );
};

const ExplorePanel = () => {
  const focus = useSim((s) => s.focus);
  const [expanded, setExpanded] = useState(false);
  const body = focus === 'system' ? null : bodyByKey[focus];

  return (
    <>
      {/* Desktop: body list on the left */}
      <aside className="hidden md:flex fixed left-10 top-24 z-30 flex-col gap-3 glass rounded-2xl p-3" style={{ width: 196 }}>
        <button className="body-btn" aria-pressed={focus === 'system'} onClick={() => simStore.set({ focus: 'system' })}>
          <Orbit size={14} aria-hidden="true" /> Whole system
        </button>
        <BodyList variant="column" />
        <div className="border-t border-white/10 pt-2">
          <Toggles stacked />
        </div>
      </aside>

      {/* Desktop: info card on the right */}
      <section
        className="hidden md:block fixed right-10 top-24 z-30 glass rounded-2xl p-6"
        style={{ width: 'clamp(300px, 26vw, 360px)' }}
        aria-live="polite"
      >
        {body ? (
          <>
            <p className="stat-label mb-2">{body.label}</p>
            <h2 className="explore-title" style={{ color: body.displayColor }}>
              {body.name}
            </h2>
            <p className="explore-copy">{body.description}</p>
            <LiveReadout bodyKey={body.key} />
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 mt-5 pt-5 border-t border-white/10">
              {body.stats.map((s) => (
                <div key={s.label}>
                  <p className="stat-label">{s.label}</p>
                  <p className="stat-value">{s.value}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <p className="stat-label mb-2">OVERVIEW</p>
            <h2 className="explore-title">Whole system</h2>
            <p className="explore-copy">
              Every planet is placed where it really is on the date shown, using JPL orbital elements. Distances from the Sun are
              compressed so the outer planets fit on screen; directions are true. Drag to orbit, scroll or pinch to zoom, and
              pick a body to fly to it.
            </p>
          </>
        )}
      </section>

      {/* Mobile: chips + compact card at the bottom */}
      <section className="md:hidden fixed left-0 right-0 bottom-0 z-30 explore-sheet" aria-live="polite">
        <div className="px-4 pb-2 overflow-x-auto no-scrollbar">
          <div className="flex gap-2 w-max">
            <button className="body-btn chip" aria-pressed={focus === 'system'} onClick={() => simStore.set({ focus: 'system' })}>
              <Orbit size={14} aria-hidden="true" /> System
            </button>
            <BodyList variant="row" />
          </div>
        </div>
        {body && (
          <div className="glass mx-3 mb-3 rounded-2xl p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="stat-label">{body.label}</p>
                <h2 className="explore-title explore-title-sm" style={{ color: body.displayColor }}>
                  {body.name}
                </h2>
              </div>
              <button className="text-btn shrink-0" onClick={() => setExpanded((v) => !v)} aria-expanded={expanded}>
                {expanded ? 'Less' : 'More'}
              </button>
            </div>
            <LiveReadout bodyKey={body.key} compact />
            {expanded && (
              <>
                <p className="explore-copy mt-3 mb-0">{body.description}</p>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  {body.stats.map((s) => (
                    <div key={s.label}>
                      <p className="stat-label">{s.label}</p>
                      <p className="stat-value">{s.value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-3">
                  <Toggles />
                </div>
              </>
            )}
          </div>
        )}
        <Credits className="px-4 pb-3" />
      </section>
    </>
  );
};

export default ExplorePanel;
