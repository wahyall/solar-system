import SolarSystem from '@/components/SolarSystem';
import ContentPanel from '@/components/ContentPanel';
import ExplorePanel from '@/components/ExplorePanel';
import NavBar from '@/components/NavBar';
import TimeControls from '@/components/TimeControls';
import Credits from '@/components/Credits';
import { MAX_SCROLL } from '@/lib/planetData';
import { useSim } from '@/lib/simStore';
import symbolUrl from '../brand/logo/heliora-symbol-small-dark.svg';

const LoadingScreen = () => {
  const loaded = useSim((s) => s.loaded);
  const progress = useSim((s) => s.loadProgress);
  const error = useSim((s) => s.error);

  return (
    <div
      id="loading-screen"
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center px-6 text-center"
      style={{
        backgroundColor: '#050508',
        opacity: loaded && !error ? 0 : 1,
        pointerEvents: loaded && !error ? 'none' : 'auto',
        transition: 'opacity 0.9s ease',
      }}
      role="status"
      aria-live="polite"
    >
      {error ? (
        <p className="max-w-sm text-sm" style={{ color: '#F0F0F5' }}>
          {error}
        </p>
      ) : (
        <>
          <img src={symbolUrl} alt="" className="w-16 h-16 motion-safe:animate-pulse" />
          <p
            className="mt-6 font-medium uppercase tracking-[0.12em]"
            style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#8A8AA0', fontSize: '14px' }}
          >
            Loading Heliora · {Math.round(progress * 100)}%
          </p>
        </>
      )}
    </div>
  );
};

function App() {
  const mode = useSim((s) => s.mode);

  return (
    <div className="relative w-full overflow-x-hidden">
      <h1 className="sr-only">Heliora: a live 3D solar system showing where every planet is right now</h1>
      <LoadingScreen />
      <SolarSystem />
      <NavBar />
      <ContentPanel />
      {mode === 'explore' && <ExplorePanel />}

      <div className="hud-bottom-left">
        <TimeControls />
        <Credits className="hidden md:block" />
      </div>

      {/* Scroll spacer that drives the guided tour */}
      <div style={{ height: `calc(${MAX_SCROLL}px + 100vh)`, position: 'relative', zIndex: 0, pointerEvents: 'none' }} />
    </div>
  );
}

export default App;
