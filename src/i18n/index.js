import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import id from './locales/id';
import en from './locales/en';

const storedLang = localStorage.getItem('language');
const initialLang = (storedLang && storedLang.toLowerCase() === 'en') ? 'en' : 'id';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      id: { translation: id },
      en: { translation: en },
    },
    lng: initialLang,
    fallbackLng: 'id',
    interpolation: {
      escapeValue: false,
    },
  });

i18n.on('languageChanged', (lng) => {
  const norm = lng.toLowerCase() === 'en' ? 'EN' : 'ID';
  localStorage.setItem('language', norm);
});

export default i18n;

