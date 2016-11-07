import $ from 'jquery'
import { parseQueryString } from 'binary-common-utils/lib/tools'
import { set as setStorage, get as getStorage } from 'binary-common-utils/lib/storageManager'
import i18n from './_i18n'
import zhTw from './translations/zh-TW/i10n.json'
import de from './translations/de/i10n.json'
import id from './translations/id/i10n.json'
import zhCn from './translations/zh-CN/i10n.json'
import it from './translations/it/i10n.json'
import vi from './translations/vi/i10n.json'
import pl from './translations/pl/i10n.json'
import ru from './translations/ru/i10n.json'
import pt from './translations/pt-PT/i10n.json'
import es from './translations/es-ES/i10n.json'
import fr from './translations/fr/i10n.json'
import en from './translations/en/i10n.json'
import ach from './translations/ach/i10n.json'

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
}
export default class Translator {
  constructor() {
    const lang = this.getLanguage()
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
