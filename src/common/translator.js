import $ from 'jquery'
import { parseQueryString } from 'binary-common-utils/lib/tools'
import { set as setStorage, get as getStorage } from 'binary-common-utils/lib/storageManager'
import i18n from './_i18n'
import zhTw from './translations/zh_TW/i10n.json'
import de from './translations/de_DE/i10n.json'
import id from './translations/id_ID/i10n.json'
import zhCn from './translations/zh_CN/i10n.json'
import it from './translations/it_IT/i10n.json'
import vi from './translations/vi_VN/i10n.json'
import pl from './translations/pl_PL/i10n.json'
import ru from './translations/ru_RU/i10n.json'
import pt from './translations/pt_PT/i10n.json'
import es from './translations/es_ES/i10n.json'
import fr from './translations/fr_FR/i10n.json'
import en from './translations/en/i10n.json'
import ach from './translations/ach_UG/i10n.json'

const supportedLanguages = {
    zh_tw: zhTw,
    de,
    id,
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
};

const languageDisplayName = {
    de: 'Deutsch',
    en: 'English',
    es: 'Español',
    fr: 'Français',
    id: 'Indonesia',
    it: 'Italiano',
    pl: 'Polish',
    pt: 'Português',
    ru: 'Русский',
    vi: 'Vietnamese',
    zh_cn: '简体中文',
    zh_tw: '繁體中文',
};

export default class Translator {
    constructor() {
        $('.language').on('change_language', (event, value) => {
            document.location.search = `l=${value}`
        })
        $.each(languageDisplayName, (key, value) => { // populate language dropdown
            $('#select_language').append(`<li class=${key}>${value}</li>`);
        })
        const lang = this.getLanguage()
        $('.language').text(languageDisplayName[lang]);
        $(document.getElementsByClassName(lang)[0]).hide();
        if (lang === 'ach') {
            window._jipt = []
            window._jipt.push(['project', 'binary-bot'])
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `${document.location.protocol}//cdn.crowdin.com/jipt/jipt.js`
            $('body').append(script)
        }
        const resources = {}
        for (const slk of Object.keys(supportedLanguages)) {
            resources[slk] = {
                translation: supportedLanguages[slk],
            }
        }
        i18n.init({
            lng: lang,
            fallbackLng: 'en',
            ns: [
                'translation',
            ],
            defaultNS: [
                'translation',
            ],
            resources,
        })
    }
    getLanguage() {
        const queryStr = parseQueryString()
        let lang = 'en'
        if ('l' in queryStr && queryStr.l !== '' && queryStr.l in supportedLanguages) {
            lang = queryStr.l
            setStorage('lang', queryStr.l)
        } else if (typeof window !== 'undefined') {
            if (getStorage('lang')) {
                lang = getStorage('lang')
            } else {
                setStorage('lang', 'en')
            }
        }
        return lang
    }
    translateText(str) {
        return i18n._(str)
    }
    translateXml(xml) {
        return i18n.xml(xml)
    }
}
export const translator = new Translator()
