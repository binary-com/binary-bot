window.Bot = {};
var translator = require('translator'); // must be on top
var i18n = require('i18n');
var appId = require('appId');
var $ = require('jquery');
$.ajaxSetup({
	cache: false
});
window.$ = window.jQuery = $;
window.Backbone = require('backbone');
window._ = require('underscore');
require('notifyjs-browser');
require('tourist');

appId.removeTokenFromUrl();

translator.addBlocklyTranslation();
translator.Translator(function () {
	Bot.config = require('./globals/config');
	Bot.globals = require('./globals/globals');
	Bot.utils = require('./utils/utils');
	Bot.version = require('./globals/version');
	Bot.conditions = require('./trade/conditions');
	Bot.markets = require('./trade/markets');
	Bot.trade = require('./trade/trade');
	Bot.toggleDebug = require('./globals/globals')
		.toggleDebug;
	require('./view');
	$('[data-i18n-text]')
		.each(function () {
			i18n._('a');
			$(this)
				.text(
					i18n._($(this)
					.attr('data-i18n-text')));
		});
});
