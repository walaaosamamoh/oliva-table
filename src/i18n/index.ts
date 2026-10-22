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

const updateDocumentDirection = (language: string) => {
  const isArabic = language.startsWith("ar");

  document.documentElement.lang = isArabic ? "ar" : "en";
  document.documentElement.dir = isArabic ? "rtl" : "ltr";
};

// Set direction when the language changes.
i18n.on("languageChanged", updateDocumentDirection);

// Set direction on initial load.
const initialLanguage = i18n.resolvedLanguage ?? i18n.language;
updateDocumentDirection(initialLanguage);

export default i18n;
