import { planetData } from '@/lib/planetData';

const ContentPanel = () => {
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
          background: 'linear-gradient(to right, transparent, rgba(5,5,8,0.9) 20%)',
        }}
      >
        <div className="grid w-full items-center" style={{ maxWidth: '360px' }}>
          {planetData.map((planet, index) => (
            <div
              key={planet.name}
              className={`planet-info col-start-1 row-start-1 w-full ${
                index === 0 ? 'active' : 'inactive'
              }`}
            >
              {/* Label */}
              <p
                className="text-xs font-medium tracking-[0.08em] uppercase mb-3"
                style={{ color: '#8A8AA0', fontFamily: 'Inter, sans-serif' }}
              >
                {planet.label}
              </p>

              {/* Planet Name */}
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

              {/* Description */}
              <p
                className="leading-relaxed mb-8"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  color: '#F0F0F5',
                  lineHeight: 1.7,
                  fontSize: 'clamp(13px, 1.1vw, 16px)',
                }}
              >
                {planet.description}
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                {planet.stats.map((stat) => (
                  <div key={stat.label} className="mb-2">
                    <p
                      className="font-medium tracking-[0.08em] uppercase mb-1"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        color: '#8A8AA0',
                        fontSize: 'clamp(11px, 0.9vw, 13px)',
                      }}
                    >
                      {stat.label}
                    </p>
                    <p
                      className="font-semibold"
                      style={{
                        fontFamily: 'Space Grotesk, sans-serif',
                        color: '#F0F0F5',
                        fontSize: 'clamp(14px, 1.2vw, 18px)',
                      }}
                    >
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Scroll hint for first planet */}
              {index === 0 && (
                <div className="mt-10 flex items-center gap-3">
                  <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1">
                    <div
                      className="w-1.5 h-3 bg-white/60 rounded-full animate-bounce"
                      style={{ animationDuration: '1.5s' }}
                    />
                  </div>
                  <p
                    className="text-sm"
                    style={{ color: '#8A8AA0', fontFamily: 'Inter, sans-serif' }}
                  >
                    Scroll to explore
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
          background: 'linear-gradient(to top, rgba(5,5,8,0.97) 60%, rgba(5,5,8,0.85) 85%, transparent)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        <div
          className="px-5 pt-5 pb-6"
        >
          {/* Drag handle indicator */}
          <div className="flex justify-center mb-4">
            <div
              className="rounded-full"
              style={{
                width: '36px',
                height: '4px',
                background: 'rgba(255,255,255,0.2)',
              }}
            />
          </div>

          {/* Grid wrapper for overlapping info cards */}
          <div className="grid w-full">
            {planetData.map((planet, index) => (
              <div
                key={`mobile-${planet.name}`}
                className={`planet-info col-start-1 row-start-1 w-full ${
                  index === 0 ? 'active' : 'inactive'
                }`}
              >
                <p
                  className="text-xs font-medium tracking-[0.08em] uppercase mb-2"
                  style={{ color: '#8A8AA0', fontFamily: 'Inter, sans-serif' }}
                >
                  {planet.label}
                </p>
                <h2
                  className="font-bold uppercase tracking-[0.02em] mb-3"
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
                <p
                  className="leading-relaxed mb-4"
                  style={{
                    color: '#F0F0F5',
                    lineHeight: 1.65,
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 'clamp(12px, 3.2vw, 14px)',
                  }}
                >
                  {planet.description}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {planet.stats.map((stat) => (
                    <div key={`mobile-${stat.label}`}>
                      <p
                        className="font-medium tracking-[0.08em] uppercase mb-1"
                        style={{
                          color: '#8A8AA0',
                          fontFamily: 'Inter, sans-serif',
                          fontSize: 'clamp(10px, 2.5vw, 11px)',
                        }}
                      >
                        {stat.label}
                      </p>
                      <p
                        className="font-semibold"
                        style={{
                          fontFamily: 'Space Grotesk, sans-serif',
                          color: '#F0F0F5',
                          fontSize: 'clamp(13px, 3.2vw, 15px)',
                        }}
                      >
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ContentPanel;
