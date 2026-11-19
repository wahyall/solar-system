/** Attribution required by the CC BY 4.0 texture licence, plus the data source. */
const Credits = ({ className = '' }: { className?: string }) => (
  <p className={`credits ${className}`}>
    Textures ©{' '}
    <a href="https://www.solarsystemscope.com/textures/" target="_blank" rel="noreferrer">
      Solar System Scope
    </a>
    ,{' '}
    <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer">
      CC BY 4.0
    </a>
    . Orbits:{' '}
    <a href="https://ssd.jpl.nasa.gov/planets/approx_pos.html" target="_blank" rel="noreferrer">
      NASA JPL
    </a>
    .
  </p>
);

export default Credits;
