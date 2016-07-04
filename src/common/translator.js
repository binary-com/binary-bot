var i18n = require('./i18n');
var tools = require('./tools');
var storageManager = require('./storageManager');

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
			zh_tw: require('./translations/zh_tw'),
			de: require('./translations/de'),
			id: require('./translations/id'),
			zh_cn: require('./translations/zh_cn'),
			it: require('./translations/it'),
			vi: require('./translations/vi'),
			ar: require('./translations/ar'),
			pl: require('./translations/pl'),
			ru: require('./translations/ru'),
			pt: require('./translations/pt'),
			es: require('./translations/es'),
			fr: require('./translations/fr'),
			en: require('./translations/en')
		}
	},
	getLanguage: {
		value: function getLanguage() {
			var queryStr = tools.parseQueryString();
			var lang;
			if (queryStr.hasOwnProperty('l') && queryStr.l !== '' && 
				this._supportedLanguages.hasOwnProperty(queryStr.l) ) {
				lang = queryStr.l;
				storageManager.set('lang', queryStr.l);
			} else if (storageManager.get('lang')) {
				lang = storageManager.get('lang');
			} else {
				storageManager.set('lang', lang = 'en');
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