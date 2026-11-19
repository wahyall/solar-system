const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const pad = (n: number) => String(n).padStart(2, '0');

export const formatDate = (ms: number) => {
  const d = new Date(ms);
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
};

export const formatTime = (ms: number) => {
  const d = new Date(ms);
  return `${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())} UTC`;
};

export const formatAU = (au: number) => (au < 0.01 ? au.toFixed(5) : au < 10 ? au.toFixed(3) : au.toFixed(2));

export const formatKm = (km: number) => {
  if (km >= 1e9) return `${(km / 1e9).toFixed(2)} billion km`;
  if (km >= 1e6) return `${(km / 1e6).toFixed(1)} million km`;
  return `${Math.round(km).toLocaleString('en-US')} km`;
};

export const formatLight = (sec: number) => {
  if (sec < 60) return `${sec.toFixed(1)} s`;
  if (sec < 3600) return `${(sec / 60).toFixed(1)} min`;
  return `${(sec / 3600).toFixed(2)} h`;
};
