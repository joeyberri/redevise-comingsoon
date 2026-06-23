export const CURRENCIES = {
  USD: { symbol: "$", rate: 1, discount: 1, locale: "en-US" },
  GHS: { symbol: "GH₵", rate: 15, discount: 0.6, locale: "en-GH" },
};

export function detectCurrency() {
  if (typeof window === "undefined" || !window.navigator) return "USD";
  const lang = window.navigator.language || "";
  if (lang.toLowerCase().includes("gh")) return "GHS";
  return "USD";
}

export function formatPrice(amountUSD, currencyCode = "USD") {
  const config = CURRENCIES[currencyCode] || CURRENCIES.USD;
  // Convert and round to the nearest 100 for clean pricing
  const converted = Math.round((amountUSD * config.rate * config.discount) / 100) * 100;
  return `${config.symbol}${converted.toLocaleString(config.locale)}`;
}
