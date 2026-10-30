import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "./LanguageContext";

export function useSEO({ key, title, description, canonicalPath, schema, image } = {}) {
  const { pathname } = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    let seoTitle = title;
    let seoDesc = description;

    if (key) {
      seoTitle = t(`seo.${key}.title`);
      seoDesc = t(`seo.${key}.desc`);
    }

    if (seoTitle) {
      document.title = seoTitle;
    }

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && seoDesc) {
      metaDesc.setAttribute("content", seoDesc);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle && seoTitle) {
      ogTitle.setAttribute("content", seoTitle);
    }

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc && seoDesc) {
      ogDesc.setAttribute("content", seoDesc);
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    const pageUrl = `https://redevise.com${canonicalPath || pathname}`;
    if (ogUrl) {
      ogUrl.setAttribute("content", pageUrl);
    }

    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage && image) {
      ogImage.setAttribute("content", image);
    }

    const twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (twitterImage && image) {
      twitterImage.setAttribute("content", image);
    }

    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute("href", pageUrl);
    }

    // Dynamic schema injection for single-page client transitions
    const scriptId = "redevise-dynamic-jsonld";
    let dynamicScript = document.getElementById(scriptId);

    if (schema) {
      if (!dynamicScript) {
        dynamicScript = document.createElement("script");
        dynamicScript.id = scriptId;
        dynamicScript.type = "application/ld+json";
        document.head.appendChild(dynamicScript);
      }
      dynamicScript.textContent = JSON.stringify(schema);
    } else if (dynamicScript) {
      dynamicScript.remove();
    }
  }, [key, title, description, canonicalPath, pathname, t, schema, image]);
}
