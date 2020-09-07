import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en_EN from './en/';
import es_ES from './es/';
import { getLang } from "./../../src/services/local-storage";

i18n
  .use(initReactI18next)
  // init i18next
  .init({
    lng: getLang() || "en",
    resources: {
      en:{
        translation: en_EN,
      },
      es: {
        translation: es_ES,
      }
    }
  });


export default i18n;