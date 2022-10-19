import React, { useEffect } from 'react';
import Preview from './Preview'
import { useTranslation } from 'react-i18next'
import '../../i8n.js';
export default function (props) {
    const { t, i18n } = useTranslation();
    const locale = props.locale;
    useEffect(() => {
        if (locale) {
            i18n.changeLanguage(locale);
            window.t = t;
        }
    }, [locale])
    window.t = t;
    return <Preview {...props} />;
}