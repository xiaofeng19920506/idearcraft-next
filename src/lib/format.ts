export function formatUsd(amount: number, locale?: string) {
  const loc = locale === "zh" ? "zh-CN" : "en-US";
  return new Intl.NumberFormat(loc, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}
