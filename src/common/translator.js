import { parseQueryString } from 'binary-common-utils/lib/tools';
import { set as setStorage, get as getStorage } from 'binary-common-utils/lib/storageManager';
import i18n from './_i18n';
import zhTw from './translations/zh_tw';
import de from './translations/de';
import id from './translations/id';
import zhCn from './translations/zh_cn';
import it from './translations/it';
import vi from './translations/vi';
import ar from './translations/ar';
import pl from './translations/pl';
import ru from './translations/ru';
import pt from './translations/pt';
import es from './translations/es';
import fr from './translations/fr';
import en from './translations/en';

const supportedLanguages = {
  zh_tw: zhTw,
  de,
  id,
  zh_cn: zhCn,
  it,
  vi,
  ar,
  pl,
  ru,
  pt,
  es,
  fr,
  en,
};
export default class Translator {
  constructor() {
    let lang = this.getLanguage();
    let resources = {};
    for (let slk of Object.keys(supportedLanguages)) {
      resources[slk] = {
        translation: supportedLanguages[slk],
      };
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
    });
  }
  getLanguage() {
    let queryStr = parseQueryString();
    let lang = 'en';
    if ('l' in queryStr && queryStr.l !== '' && queryStr.l in supportedLanguages) {
      lang = queryStr.l;
      setStorage('lang', queryStr.l);
    } else if (typeof window !== 'undefined') {
      if (getStorage('lang')) {
        lang = getStorage('lang');
      } else {
        setStorage('lang', 'en');
      }
    }
    return lang;
  }
  translateText(str) {
    return i18n._(str);
  }
  translateXml(xml) {
    return i18n.xml(xml);
  }
}
export const translator = new Translator();
