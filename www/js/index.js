/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var translator = __webpack_require__(1); // must be on top
	var i18n = __webpack_require__(3);
	var $ = __webpack_require__(2);
	translator.Translator(function(){
		$('[data-i18n-text]').each(function(){
			$(this).text(i18n._($(this).attr('data-i18n-text')));
		});
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(2);
	var i18n = __webpack_require__(3);
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

	// to include script tag in html without warning
	$.ajaxPrefilter(function( options, originalOptions, jqXHR ) {
		options.async = true;
	});

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
	script.src = 'node_modules/blockly/msg/js/' + blocklyLang + '.js';
	$('body').append(script);

	module.exports = {
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


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = i18next;

/***/ }
/******/ ]);