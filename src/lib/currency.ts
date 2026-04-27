// Simple display helper for USD with INR equivalent.
// Rate is an approximation for display only.
export const USD_TO_INR = 83;

export function usdToInr(usd: number): number {
  return Math.round(usd * USD_TO_INR);
}

export function formatInr(usd: number): string {
  return `₹${usdToInr(usd).toLocaleString("en-IN")}`;
}

/** Formats as "$120 / ₹9,960" */
export function formatUsdInr(usd: number): string {
  return `$${usd.toLocaleString("en-US")} / ${formatInr(usd)}`;
}
