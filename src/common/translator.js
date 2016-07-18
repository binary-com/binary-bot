var $ = require('jquery');
var i18n = require('i18n');
var parseQueryString = require('binary-common-utils/tools').parseQueryString;
// handle language in localStorage and query string
var supportedLanguages = {
	zh_tw: require('json!../i18n/zh_tw.json'),
	de: require('json!../i18n/de.json'),
	id: require('json!../i18n/id.json'),
	zh_cn: require('json!../i18n/zh_cn.json'),
	it: require('json!../i18n/it.json'),
	vi: require('json!../i18n/vi.json'),
	ar: require('json!../i18n/ar.json'),
	pl: require('json!../i18n/pl.json'),
	ru: require('json!../i18n/ru.json'),
	pt: require('json!../i18n/pt.json'),
	es: require('json!../i18n/es.json'),
	fr: require('json!../i18n/fr.json'),
	en: require('json!../i18n/en.json')
};
$('#language')
	.change(function change(e) {
		localStorage.lang = e.target.value;
		window.location.search = '?l=' + e.target.value;
	});
var queryStr = parseQueryString();
if (queryStr.hasOwnProperty('l') && queryStr.l !== '' && supportedLanguages.hasOwnProperty(queryStr.l) ) {
	window.lang = queryStr.l;
	localStorage.lang = queryStr.l;
} else if (localStorage.lang) {
	window.lang = localStorage.lang;
} else {
	window.lang = 'en';
}
$('#language')
	.val(window.lang);
// end of handling language

module.exports = {
	addBlocklyTranslation: function addBlocklyTranslation() {
		// to include script tag in html without warning
		$.ajaxPrefilter(function (options, originalOptions, jqXHR) {
			options.async = true;
		});

		var script = document.createElement('script');
		script.type = 'text/javascript';
		var blocklyLang;
		if (lang === 'zh_tw') {
			blocklyLang = 'zh-hant';
		} else if (lang === 'zh_cn') {
			blocklyLang = 'zh-hans';
		} else {
			blocklyLang = lang;
		}
		script.src = 'js/blockly/msg/js/' + blocklyLang + '.js';
		$('body')
			.append(script);
	},
	Translator: function Translator(callback) {
		var resources = {};
		for (var lang in supportedLanguages) {
			resources[lang] = {
				translation: supportedLanguages[lang]
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
		}, function () {
			callback();
		});
	},
};
