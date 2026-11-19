import type { BodyKey } from '@/lib/orbits';
import { useSim } from '@/lib/simStore';
import { formatAU, formatKm, formatLight } from '@/lib/format';

/** Distances computed for the current simulated date (updates ~10x/s). */
const LiveReadout = ({ bodyKey, compact = false }: { bodyKey: BodyKey; compact?: boolean }) => {
  const r = useSim((s) => s.readout);
  if (!r) return null;

  const rows: { label: string; value: string }[] = [];
  if (bodyKey === 'sun') {
    rows.push({ label: 'From Earth', value: `${formatAU(r.earthAU)} AU` });
    rows.push({ label: 'Light to Earth', value: formatLight(r.earthAU * 499.004784) });
  } else if (bodyKey === 'moon') {
    rows.push({ label: 'From Earth', value: formatKm(r.earthKm) });
    rows.push({ label: 'Light to Earth', value: formatLight(r.earthKm / 299792.458) });
  } else {
    rows.push({ label: 'From Sun', value: `${formatAU(r.sunAU)} AU` });
    if (bodyKey !== 'earth') rows.push({ label: 'From Earth', value: `${formatAU(r.earthAU)} AU` });
    rows.push({ label: 'Sunlight takes', value: formatLight(r.lightSec) });
  }

  return (
    <div className={compact ? 'live-grid live-grid-compact' : 'live-grid'}>
      {rows.map((row) => (
        <div key={row.label}>
          <p className="stat-label">
            <span className="live-pip" aria-hidden="true" />
            {row.label}
          </p>
          <p className="stat-value tabular-nums">{row.value}</p>
        </div>
      ))}
    </div>
  );
};

export default LiveReadout;
