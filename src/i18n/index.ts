import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import ar from "./locales/ar.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },

    fallbackLng: "en",
    supportedLngs: ["en", "ar"],

    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "oliva-language",
    },

    interpolation: {
      escapeValue: false,
    },
  });

let arabicFontRequested = false;

const loadArabicFont = () => {
  if (arabicFontRequested) return;
  arabicFontRequested = true;
  import("@fontsource-variable/noto-sans-arabic/index.css").catch(() => {
    arabicFontRequested = false; // allow a retry on the next language change
  });
};

const applyLanguage = (language: string) => {
  const isArabic = language.startsWith("ar");

  document.documentElement.lang = isArabic ? "ar" : "en";
  document.documentElement.dir = isArabic ? "rtl" : "ltr";

  if (isArabic) loadArabicFont();
};

i18n.on("languageChanged", applyLanguage);
applyLanguage(i18n.resolvedLanguage ?? i18n.language);

export default i18n;
