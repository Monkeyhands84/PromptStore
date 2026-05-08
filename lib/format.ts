const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ["second", 60],
  ["minute", 60],
  ["hour", 24],
  ["day", 7],
  ["week", 4.345],
  ["month", 12],
  ["year", Number.POSITIVE_INFINITY],
];

const rtf = new Intl.RelativeTimeFormat("es", { numeric: "auto" });

export function formatRelativeTime(iso: string): string {
  const diffSec = Math.round((new Date(iso).getTime() - Date.now()) / 1000);
  let value = diffSec;
  for (const [unit, divisor] of UNITS) {
    if (Math.abs(value) < divisor) return rtf.format(value, unit);
    value = Math.round(value / divisor);
  }
  return rtf.format(value, "year");
}
