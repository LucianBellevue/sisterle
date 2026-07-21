/** Convert Square Money.amount (bigint | number | string) to integer cents. */
export function moneyAmountToCents(
  amount: bigint | number | string | null | undefined,
): number {
  if (amount == null) return 0;
  if (typeof amount === "bigint") return Number(amount);
  if (typeof amount === "number") return Math.round(amount);
  const parsed = Number(amount);
  return Number.isFinite(parsed) ? Math.round(parsed) : 0;
}

export function formatMoney(cents: number, currency = "USD"): string {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(cents / 100);
  } catch {
    return `$${(cents / 100).toFixed(2)}`;
  }
}
