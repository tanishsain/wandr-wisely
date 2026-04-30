// Simple display helper for USD with INR equivalent.
// Rate is an approximation for display only.
export const USD_TO_INR = 83;

export function usdToInr(usd: number): number {
  return Math.round(usd * USD_TO_INR);
}

export function formatInr(usd: number): string {
  return `Rs.${usdToInr(usd).toLocaleString("en-IN")}`;
}

/** Formats as "Rs.9,960" */
export function formatUsdInr(usd: number): string {
  return formatInr(usd);
}
