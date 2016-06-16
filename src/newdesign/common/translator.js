var i18n = require('./i18n');
var utils = require('./utils');

module.exports = {
	_initialized: false,
	_supportedLanguages: {
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
	},
	_getLanguage: function _getLanguage() {
		var queryStr = utils.parseQueryString();
		if (queryStr.hasOwnProperty('l') && queryStr.l !== '' && 
			this._supportedLanguages.hasOwnProperty(queryStr.l) ) {
			window.lang = queryStr.l;
			localStorage.lang = queryStr.l;
		} else if (localStorage.lang) {
			window.lang = localStorage.lang;
		} else {
			window.lang = 'en';
		}
	},
	init: function init() {
		this._getLanguage();
		var resources = {};
		for (var lang in this._supportedLanguages) {
			resources[lang] = {
				translation: this._supportedLanguages[lang]
			};
		}
		i18n.init({
			lng: window.lang,
			fallbackLng: 'en',
			ns: [
				'translation'
			],
			defaultNS: [
				'translation'
			],
			resources: resources
		});
		this._initialized = true;
	},
	translateText: function translateText(str) {
		if ( !this._initialized ) {
			throw Error('Translator cannot be used before initialization');
		}
		return i18n._(str);
	},
	translateXml: function translateXml(xml) {
		if ( !this._initialized ) {
			throw Error('Translator cannot be used before initialization');
		}
		return i18n.xml(xml);
	},
};
