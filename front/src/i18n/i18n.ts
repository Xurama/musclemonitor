// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEn from "./en.json";
import translationFr from "./fr.json";

i18n
  .use(LanguageDetector) // Utiliser le détecteur de langue
  .use(initReactI18next) // Passer i18n à react-i18next
  .init({
    resources: {
      en: {
        translation: translationEn,
      },
      fr: {
        translation: translationFr,
      },
    },
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
