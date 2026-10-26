// Presenta lecturas numéricas con precisión fija y valores seguros para datos ausentes.
export function formatNumber(value, digits = 3) {
  return Number.isFinite(value) ? value.toFixed(digits) : '—';
}
