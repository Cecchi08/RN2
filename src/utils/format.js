export function formatNumber(value, digits = 3) {
  return Number.isFinite(value) ? value.toFixed(digits) : '—';
}
