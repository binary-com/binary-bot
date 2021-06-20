import sha1 from 'sha1';
import zhTw from './translations/zh_TW/i10n.json';
import zhCn from './translations/zh_CN/i10n.json';
import it from './translations/it_IT/i10n.json';
import vi from './translations/vi_VN/i10n.json';
import pl from './translations/pl_PL/i10n.json';
import ru from './translations/ru_RU/i10n.json';
import pt from './translations/pt_PT/i10n.json';
import es from './translations/es_ES/i10n.json';
import fr from './translations/fr_FR/i10n.json';
import en from './translations/en/i10n.json';
import ach from './translations/ach_UG/i10n.json';
import id from './translations/id_ID/i10n.json';

export const supportedLanguages = {
    zh_tw: zhTw,
    zh_cn: zhCn,
    it,
    vi,
    pl,
    ru,
    pt,
    es,
    fr,
    en,
    ach,
    id,
};

const fallbackLang = en;
let translation = {};

const t = key => (key in translation ? translation[key] : fallbackLang[key]);

export const init = lang => {
    translation = supportedLanguages[lang];
};

export const translate = str => (str && t(sha1(str))) || str;

export const translateLangToLang = (str, fromLang, toLang) => {
    if (supportedLanguages[fromLang]) {
        const hashIndex = Object.values(supportedLanguages[fromLang]).findIndex(translatedStr => str === translatedStr);
        if (hashIndex !== -1) {
            const hash = Object.keys(supportedLanguages[fromLang])[hashIndex];
            const translatedStr = supportedLanguages[toLang][hash];
            if (translatedStr) {
                return translatedStr;
            }
        }
    }
    return str;
};

export const xml = dom => {
    const categories = Array.from(dom.getElementsByTagName('category') || []);
    categories.forEach(child => {
        const text = child.getAttribute('i18n-text');
        if (text) {
            child.setAttribute('name', translate(text));
        }
        xml(child);
    });
    return dom;
};
