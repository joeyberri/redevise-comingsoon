export const CURRENCIES = {
  USD: { symbol: "$", rate: 1, discount: 1, locale: "en-US" },
  GHS: { symbol: "GH₵", rate: 15, discount: 0.6, locale: "en-GH" },
  NGN: { symbol: "₦", rate: 1500, discount: 0.5, locale: "en-NG" },
};

export function detectCurrency() {
  if (typeof window === "undefined" || !window.navigator) return "USD";

  // 1. Timezone-based detection (most reliable for Accra and Lagos)
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    const lowerTz = tz.toLowerCase();
    if (lowerTz.includes("accra")) return "GHS";
    if (lowerTz.includes("lagos")) return "NGN";
  } catch {
    // Ignore resolvedOptions support issues
  }

  // 2. Language-based fallback check
  const languages = window.navigator.languages || [window.navigator.language || ""];
  for (const lang of languages) {
    const lowerLang = lang.toLowerCase();
    if (lowerLang.includes("-gh") || lowerLang === "gh") return "GHS";
    if (lowerLang.includes("-ng") || lowerLang === "ng") return "NGN";
  }

  return "USD";
}

export function formatPrice(amountUSD, currencyCode = "USD") {
  const config = CURRENCIES[currencyCode] || CURRENCIES.USD;
  // Convert and round to the nearest 100 for clean pricing
  const converted = Math.round((amountUSD * config.rate * config.discount) / 100) * 100;
  return `${config.symbol}${converted.toLocaleString(config.locale)}`;
}
