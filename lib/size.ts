export type SizeUnit = "KB" | "MB";

export const SIZE_UNITS: SizeUnit[] = ["KB", "MB"];

export const SIZE_PRESETS = [
  { label: "50 KB", bytes: 50 * 1024 },
  { label: "100 KB", bytes: 100 * 1024 },
  { label: "200 KB", bytes: 200 * 1024 },
  { label: "500 KB", bytes: 500 * 1024 },
  { label: "1 MB", bytes: 1024 * 1024 },
  { label: "2 MB", bytes: 2 * 1024 * 1024 },
] as const;

export function unitMultiplier(unit: SizeUnit): number {
  return unit === "MB" ? 1024 * 1024 : 1024;
}

/**
 * Parses a user-typed size (accepts "100", "99,5", "1.5") into bytes.
 * Returns null for empty, non-numeric, or non-positive values.
 */
export function parseSizeToBytes(value: string | number, unit: SizeUnit): number | null {
  const normalized = typeof value === "string" ? value.trim().replace(",", ".") : String(value);
  if (!normalized || !/^\d*\.?\d+$/.test(normalized)) return null;

  const numeric = Number(normalized);
  if (!Number.isFinite(numeric) || numeric <= 0) return null;

  const bytes = Math.round(numeric * unitMultiplier(unit));
  return bytes > 0 ? bytes : null;
}

export function formatBytes(bytes: number, locale: string = "id"): string {
  if (!Number.isFinite(bytes) || bytes < 0) return "—";
  if (bytes < 1024) {
    return `${new Intl.NumberFormat(locale).format(Math.round(bytes))} B`;
  }

  const kb = bytes / 1024;
  if (kb < 1024) {
    const digits = kb >= 100 ? 0 : kb >= 10 ? 1 : 2;
    return `${new Intl.NumberFormat(locale, {
      maximumFractionDigits: digits,
    }).format(kb)} KB`;
  }

  const mb = kb / 1024;
  const digits = mb >= 100 ? 0 : mb >= 10 ? 1 : 2;
  return `${new Intl.NumberFormat(locale, {
    maximumFractionDigits: digits,
  }).format(mb)} MB`;
}

export function savingsPercent(originalBytes: number, resultBytes: number): number {
  if (!Number.isFinite(originalBytes) || originalBytes <= 0) return 0;
  return Math.round(((originalBytes - resultBytes) / originalBytes) * 100);
}

export function formatTarget(bytes: number, locale: string = "id"): string {
  return formatBytes(bytes, locale);
}
