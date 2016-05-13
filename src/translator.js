var $ = require('jquery');
var i18n = require('i18n');
var sha1 = require('sha1');
// handle language in localStorage and query string
var supportedLanguages = ['zh_tw', 'de', 'id', 'zh_cn', 'it', 'vi', 'ar', 'pl', 'ru', 'pt', 'es', 'fr', 'en'];
var parseQueryString = function parseQueryString() {
	var str = window.location.search;
	var objURL = {};
	str.replace(
		new RegExp( "([^?=&]+)(=([^&]*))?", "g" ),
		function( $0, $1, $2, $3 ){
			objURL[ $1 ] = $3;
		}
	);
	return objURL;
};
$('#language').change(function change(e){
	localStorage.lang = e.target.value;
	window.location.search = '?l=' + e.target.value;
});
var queryStr = parseQueryString();
if ( queryStr.hasOwnProperty('l') && queryStr.l !== '' && supportedLanguages.indexOf(queryStr.l) >= 0 ) {
	window.lang = queryStr.l;
	localStorage.lang = queryStr.l;
} else if (localStorage.lang){
	window.lang = localStorage.lang;
} else {
	window.lang = 'en';
}
$('#language').val(window.lang);
// end of handling language

// define the _ function for i18n
i18n._ = function _(str, opt){
	var key = sha1(str);
	var result = i18n.t(key);
	return (result === '') ? str : result;
};

// definition of the xml function for i18n
i18n.xml = function xml(dom){
	for ( var i in dom.children ) {
		if ( dom.children.hasOwnProperty(i) && !isNaN(+i) ) {
			var child = dom.children[i];
			var str = child.getAttribute('i18n-text');
			var key;
			var hasTranslation = false;
			if ( str === null ) {
				key = child.getAttribute('i18n');
				if ( key !== null ) {
					hasTranslation = true;
				}
			} else {
				key = sha1(str);
				hasTranslation = true;
			}
			var result = i18n.t(key);
			if ( hasTranslation ) {
				child.setAttribute('name', (result === '') ? str : result);
			}
			if ( child.children.length > 0 ) {
				i18n.xml(child);
			}
		}
	}
	return dom;
};

module.exports = {
	addBlocklyTranslation: function addBlocklyTranslation(){
		// to include script tag in html without warning
		$.ajaxPrefilter(function( options, originalOptions, jqXHR ) {
			options.async = true;
		});

		var script = document.createElement( 'script' );
		script.type = 'text/javascript';
		var blocklyLang;
		if ( lang === 'zh_tw' ) {
			blocklyLang = 'zh-hant';
		} else if ( lang === 'zh_cn' ) {
			blocklyLang = 'zh-hans';
		} else {
			blocklyLang = lang;
		}
		script.src = 'www/js/blockly/msg/js/' + blocklyLang + '.js';
		$('body').append(script);
	},
	Translator: function Translator(callback){
		// load the language file (this should not be called en)
		$.get('www/i18n/' + lang + '.json', function(translation) {
			var resources = {
				en: {
					translation: translation
				},
			};
			i18n.init({
				lng: 'en',
				fallbackLng: 'en',
				ns: [
					'translation'
				],
				defaultNS: [
					'translation'
				],
				resources: resources
			}, function() {
				callback();
			});
		});
	},
};
