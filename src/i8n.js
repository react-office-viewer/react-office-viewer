import i18n from "i18next";
import enUsTrans from "./locales/en-US";
import zhCnTrans from "./locales/zh-CN";
import {
    initReactI18next,
} from 'react-i18next';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: enUsTrans,
            },
            zh: {
                translation: zhCnTrans,
            },
        },
        lng: 'zh',
        //默认语言
        // fallbackLng: "zh",
        debug: false,
        interpolation: {
            escapeValue: false,
        },
    })
export default i18n;