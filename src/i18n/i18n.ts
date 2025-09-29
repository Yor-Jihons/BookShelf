import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import ja from './locales/ja.json';

export const resources = {
    en: { translation: en },
    ja: { translation: ja },
};

export async function initI18n( locale: string ){
    const lang = locale.split('-')[0];
    await i18n
        .use(initReactI18next)
        .init({
            resources: resources,
            lng: Object.keys(resources).includes(lang) ? lang : 'en',
            fallbackLng: 'en',
            interpolation: {
                escapeValue: false,
            },
        });
    return i18n;
}
