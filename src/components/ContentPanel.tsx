import { planetData } from '@/lib/planetData';
import { useSim } from '@/lib/simStore';
import LiveReadout from './LiveReadout';
import Credits from './Credits';

/** Guided-tour copy, driven by the scroll position (tourIndex from the engine). */
const ContentPanel = () => {
  const tourIndex = useSim((s) => s.tourIndex);
  const mode = useSim((s) => s.mode);
  const visible = mode === 'tour';

  return (
    <>
      {/* Desktop panel */}
      <div
        id="content-panel"
        className="hidden md:flex fixed top-0 right-0 h-screen z-10 pointer-events-none items-center justify-end"
        style={{
          width: 'clamp(320px, 30vw, 420px)',
          maxWidth: '100vw',
          paddingRight: 'clamp(24px, 3vw, 40px)',
          background: 'linear-gradient(to right, transparent, rgba(5,5,8,0.88) 22%)',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }}
        aria-hidden={!visible}
      >
        <div className="grid w-full items-center" style={{ maxWidth: '360px' }}>
          {planetData.map((planet, index) => (
            <div
              key={planet.name}
              className={`planet-info col-start-1 row-start-1 w-full ${index === tourIndex ? 'active' : 'inactive'}`}
            >
              <p className="stat-label mb-3">{planet.label}</p>
              <h2
                className="font-bold uppercase tracking-[0.02em] mb-6"
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  color: planet.displayColor,
                  textShadow: `0 0 40px ${planet.displayColor}66`,
                  fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                  lineHeight: 1.1,
                }}
              >
                {planet.name}
              </h2>
              <p
                className="mb-6"
                style={{ color: '#F0F0F5', lineHeight: 1.7, fontSize: 'clamp(13px, 1.1vw, 16px)' }}
              >
                {planet.description}
              </p>

              {index === tourIndex && <LiveReadout bodyKey={planet.key} />}

              <div className="grid grid-cols-2 gap-4 mt-5 pt-5 border-t border-white/10">
                {planet.stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="stat-label">{stat.label}</p>
                    <p className="stat-value">{stat.value}</p>
                  </div>
                ))}
              </div>

              {index === 0 && (
                <div className="mt-8 flex items-center gap-3">
                  <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1">
                    <div className="w-1.5 h-3 bg-white/60 rounded-full animate-bounce" style={{ animationDuration: '1.5s' }} />
                  </div>
                  <p className="text-sm" style={{ color: '#8A8AA0' }}>
                    Scroll to travel outward, or switch to Explore
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile panel — bottom sheet */}
      <div
        id="content-panel-mobile"
        className="md:hidden fixed bottom-0 left-0 right-0 z-20 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(5,5,8,0.97) 62%, rgba(5,5,8,0.8) 85%, transparent)',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }}
        aria-hidden={!visible}
      >
        <div className="px-5 pt-8 pb-4">
          <div className="grid w-full">
            {planetData.map((planet, index) => (
              <div
                key={`mobile-${planet.name}`}
                className={`planet-info col-start-1 row-start-1 w-full ${index === tourIndex ? 'active' : 'inactive'}`}
              >
                <p className="stat-label mb-1">{planet.label}</p>
                <h2
                  className="font-bold uppercase tracking-[0.02em] mb-2"
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    color: planet.displayColor,
                    textShadow: `0 0 30px ${planet.displayColor}44`,
                    fontSize: 'clamp(1.5rem, 6vw, 2rem)',
                    lineHeight: 1.15,
                  }}
                >
                  {planet.name}
                </h2>
                <p className="mb-3 line-clamp-3" style={{ color: '#D8D8E0', lineHeight: 1.6, fontSize: 'clamp(12px, 3.4vw, 14px)' }}>
                  {planet.description}
                </p>
                {index === tourIndex && <LiveReadout bodyKey={planet.key} compact />}
              </div>
            ))}
          </div>
          <Credits className="mt-3" />
        </div>
      </div>
    </>
  );
};

export default ContentPanel;
