import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "./en/translation.json";
import translationRU from "./ru/translation.json";
import translationTK from "./tk/translation.json";
// store
import { storeKeys } from "@/shared/constants";
import { LocalStorage } from "@/shared/lib";
// types
import type { Language } from "@/entities/types";

const storage = LocalStorage.getInstance();

export const defaultNS = 'translation';
// the translations
export const resources = {
  ru: {
    translation: translationRU,
  },
  en: {
    translation: translationEN,
  },
  tk: {
    translation: translationTK,
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: storage.getItem(storeKeys.language) as Language || 'tk',
  fallbackLng: "tk",
  defaultNS,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;