import SolarSystem from '@/components/SolarSystem';
import ContentPanel from '@/components/ContentPanel';
import NavBar from '@/components/NavBar';
import { MAX_SCROLL } from '@/lib/planetData';

function App() {
  return (
    <div className="relative w-full overflow-x-hidden">
      {/* Loading Screen */}
      <div
        id="loading-screen"
        className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
        style={{ backgroundColor: '#050508' }}
      >
        <div className="relative">
          <div
            className="w-16 h-16 rounded-full border-2 border-transparent animate-spin"
            style={{
              borderTopColor: '#FF6B35',
              borderRightColor: '#4ECDC4',
              animationDuration: '1s',
            }}
          />
        </div>
        <p
          className="mt-6 text-sm font-medium uppercase tracking-[0.12em]"
          style={{
            fontFamily: 'Space Grotesk, sans-serif',
            color: '#8A8AA0',
            fontSize: '14px',
          }}
        >
          Loading Solar System...
        </p>
      </div>

      {/* Fixed 3D Canvas */}
      <SolarSystem />

      {/* Fixed Navigation */}
      <NavBar />

      {/* Fixed Content Panel */}
      <ContentPanel />

      {/* Scroll Spacer */}
      <div
        style={{
          height: `${MAX_SCROLL}px`,
          position: 'relative',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}

export default App;
