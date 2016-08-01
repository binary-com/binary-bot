'use strict';
import i18n from './_i18n';
import tools from 'binary-common-utils/tools';
import storageManager from 'binary-common-utils/storageManager';
import zh_tw from './translations/zh_tw';
import de from './translations/de';
import id from './translations/id';
import zh_cn from './translations/zh_cn';
import it from './translations/it';
import vi from './translations/vi';
import ar from './translations/ar';
import pl from './translations/pl';
import ru from './translations/ru';
import pt from './translations/pt';
import es from './translations/es';
import fr from './translations/fr';
import en from './translations/en';

var Translator = function Translator() {
	if ( Translator.instance ) {
		return Translator.instance;
	}
	Translator.instance = this;
	var lang = this.getLanguage();
	var resources = {};
	for (var i in this._supportedLanguages) {
		resources[i] = {
			translation: this._supportedLanguages[i]
		};
	}
	i18n.init({
		lng: lang,
		fallbackLng: 'en',
		ns: [
			'translation'
		],
		defaultNS: [
			'translation'
		],
		resources: resources
	});
};

Translator.prototype = Object.create(null, {
	_supportedLanguages: {
		value: {
			zh_tw: zh_tw,
			de: de,
			id: id,
			zh_cn: zh_cn,
			it: it,
			vi: vi,
			ar: ar,
			pl: pl,
			ru: ru,
			pt: pt,
			es: es,
			fr: fr,
			en: en
		}
	},
	getLanguage: {
		value: function getLanguage() {
			var queryStr = tools.parseQueryString();
			var lang = 'en';
			if (queryStr.hasOwnProperty('l') && queryStr.l !== '' && 
				this._supportedLanguages.hasOwnProperty(queryStr.l) ) {
				lang = queryStr.l;
				storageManager.set('lang', queryStr.l);
			} else if (typeof window !== 'undefined'){
				if (storageManager.get('lang')) {
					lang = storageManager.get('lang');
				} else {
					storageManager.set('lang', 'en');
				}
			}
			return lang;
		}
	},
	translateText: {
		value: function translateText(str) {
			return i18n._(str);
		}
	},
	translateXml: {
		value: function translateXml(xml) {
			return i18n.xml(xml);
		}
	},
});

module.exports = Translator;
