const NavBar = () => {
  return (
    <nav
      id="nav-bar"
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-5"
      style={{
        opacity: 0,
        transition: 'opacity 0.8s ease',
        background: 'linear-gradient(to bottom, rgba(5,5,8,0.5), transparent)',
      }}
    >
      {/* Wordmark */}
      <div
        className="text-sm font-semibold uppercase tracking-[0.12em]"
        style={{
          fontFamily: 'Space Grotesk, sans-serif',
          color: '#F0F0F5',
          fontSize: '16px',
        }}
      >
        SOLAR SYSTEM
      </div>

      {/* Progress Bar */}
      <div className="flex items-center gap-3">
        <span
          className="hidden md:block text-xs font-medium uppercase tracking-[0.08em]"
          style={{ color: '#8A8AA0', fontSize: '11px' }}
        >
          Journey
        </span>
        <div
          className="relative h-0.5 w-[120px] rounded-full overflow-hidden"
          style={{ background: 'rgba(240,240,245,0.2)' }}
        >
          <div
            className="absolute inset-y-0 left-0 rounded-full progress-bar"
            style={{
              width: '100%',
              background: 'linear-gradient(to right, #FF6B35, #45B7D1)',
            }}
          />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
