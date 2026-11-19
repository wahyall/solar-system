import logoUrl from '../../brand/logo/heliora-horizontal-small-dark.svg';
import { planetData } from '@/lib/planetData';
import { simStore, useSim, type ViewMode } from '@/lib/simStore';

const MODES: { id: ViewMode; label: string }[] = [
  { id: 'tour', label: 'Tour' },
  { id: 'explore', label: 'Explore' },
];

const NavBar = () => {
  const mode = useSim((s) => s.mode);
  const loaded = useSim((s) => s.loaded);

  const setMode = (next: ViewMode) => {
    if (next === mode) return;
    const st = simStore.get();
    simStore.set(
      next === 'explore' ? { mode: next, focus: planetData[st.tourIndex].key } : { mode: next },
    );
  };

  return (
    <nav
      id="nav-bar"
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-4 px-4 md:px-10 py-4 md:py-5"
      style={{
        opacity: loaded ? 1 : 0,
        transition: 'opacity 0.8s ease',
        background: 'linear-gradient(to bottom, rgba(5,5,8,0.7), transparent)',
        pointerEvents: 'none',
      }}
    >
      <a href="/" aria-label="Heliora home" style={{ pointerEvents: 'auto' }} className="shrink-0">
        <img src={logoUrl} alt="Heliora" className="h-7 md:h-8 w-auto" />
      </a>

      <div className="flex items-center gap-4 md:gap-6" style={{ pointerEvents: 'auto' }}>
        {mode === 'tour' && (
          <div className="hidden sm:flex items-center gap-3" aria-hidden="true">
            <span className="text-[11px] font-medium uppercase tracking-[0.08em]" style={{ color: '#8A8AA0' }}>
              Journey
            </span>
            <div className="relative h-0.5 w-[96px] md:w-[120px] rounded-full overflow-hidden" style={{ background: 'rgba(240,240,245,0.2)' }}>
              <div
                className="absolute inset-y-0 left-0 rounded-full progress-bar"
                style={{ width: '100%', background: 'linear-gradient(to right, #FF6B35, #45B7D1)' }}
              />
            </div>
          </div>
        )}

        <div role="tablist" aria-label="View mode" className="glass flex rounded-full p-1">
          {MODES.map((m) => (
            <button
              key={m.id}
              role="tab"
              aria-selected={mode === m.id}
              onClick={() => setMode(m.id)}
              className="mode-tab"
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
