import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enTranslations from '@/locales/en.json';
import esTranslations from '@/locales/es.json';
import frTranslations from '@/locales/fr.json';
import deTranslations from '@/locales/de.json';
import ptTranslations from '@/locales/pt.json';
import itTranslations from '@/locales/it.json';
import ruTranslations from '@/locales/ru.json';
import zhTranslations from '@/locales/zh.json';
import jaTranslations from '@/locales/ja.json';
import arTranslations from '@/locales/ar.json';
import koTranslations from '@/locales/ko.json';
import hiTranslations from '@/locales/hi.json';
import nlTranslations from '@/locales/nl.json';
import plTranslations from '@/locales/pl.json';
import trTranslations from '@/locales/tr.json';

const resources = {
  en: { translation: enTranslations },
  es: { translation: esTranslations },
  fr: { translation: frTranslations },
  de: { translation: deTranslations },
  pt: { translation: ptTranslations },
  it: { translation: itTranslations },
  ru: { translation: ruTranslations },
  zh: { translation: zhTranslations },
  ja: { translation: jaTranslations },
  ar: { translation: arTranslations },
  ko: { translation: koTranslations },
  hi: { translation: hiTranslations },
  nl: { translation: nlTranslations },
  pl: { translation: plTranslations },
  tr: { translation: trTranslations },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;