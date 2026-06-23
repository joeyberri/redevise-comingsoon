import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { translations } from "../constants/translations";
import { detectCurrency, formatPrice } from "./currency";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [locale, setLocaleState] = useState(() => {
    return localStorage.getItem("locale") || "en";
  });

  const [currency, setCurrencyState] = useState(() => {
    return localStorage.getItem("currency") || detectCurrency();
  });

  const setLocale = useCallback((newLocale) => {
    if (newLocale === "en" || newLocale === "es") {
      setLocaleState(newLocale);
      localStorage.setItem("locale", newLocale);
    }
  }, []);

  const setCurrency = useCallback((newCurrency) => {
    if (newCurrency === "USD" || newCurrency === "GHS") {
      setCurrencyState(newCurrency);
      localStorage.setItem("currency", newCurrency);
    }
  }, []);

  const formatPriceLocal = useCallback((amountUSD) => {
    return formatPrice(amountUSD, currency);
  }, [currency]);

  const t = useCallback((key, params = {}) => {
    const keys = key.split(".");
    let value = translations[locale];

    for (const k of keys) {
      if (value && value[k] !== undefined) {
        value = value[k];
      } else {
        // Fallback to English
        let fallbackValue = translations["en"];
        for (const fk of keys) {
          if (fallbackValue && fallbackValue[fk] !== undefined) {
            fallbackValue = fallbackValue[fk];
          } else {
            fallbackValue = null;
            break;
          }
        }
        value = fallbackValue || key;
        break;
      }
    }

    if (typeof value === "string") {
      let result = value;
      for (const [paramKey, paramVal] of Object.entries(params)) {
        result = result.replace(new RegExp(`{{${paramKey}}}`, "g"), String(paramVal));
      }
      return result;
    }

    return value;
  }, [locale]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, currency, setCurrency, formatPrice: formatPriceLocal, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

