window.Bot = {};
var translator = require('translator'); // must be on top
var i18n = require('i18n');
var appId = require('appId');
var commonUtils = require('utils');
var $ = require('jquery');
var storageManager = require('storageManager');
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
commonUtils.asyncChain()
	.pipe(function translate(done){
		translator.Translator(function () {
			$('[data-i18n-text]')
				.each(function() {
			    	var contents = $(this).contents();
			    	if (contents.length > 0) {
			        	if (contents.get(0).nodeType == Node.TEXT_NODE) {
			            	$(this).text(i18n._($(this)
								.attr('data-i18n-text')))
								.append(contents.slice(1));
			        	}
			    	} else {
						$(this)
							.text(i18n._($(this)
								.attr('data-i18n-text')));
					}
				});
				done();
		});
	})
	.pipe(function loadActiveSymbols(done){
		var botUtils = require('./utils/utils');
		Bot.globals = require('./globals/globals');
		botUtils.getActiveSymbols(function(activeSymbols){
			Bot.globals.activeSymbols = activeSymbols;
			done();
		});
	})
	.pipe(function runBot(done){
		Bot.config = require('./globals/config');
		Bot.utils = require('./utils/utils');
		Bot.version = require('./globals/version');
		Bot.markets = require('./trade/markets');
		Bot.conditions = require('./trade/conditions');
		Bot.trade = require('./trade/trade');
		Bot.toggleDebug = require('./globals/globals')
			.toggleDebug;
		var view = require('./view'); // show the bot
		view.show(function(){
			done();
		});
	})
	.pipe(function hideSpinner(done){
		window._trackJs = { 
			token: '346262e7ffef497d85874322fff3bbf8',
			application: 'binary-bot',
			enabled: window.location.hostname !== 'localhost',
			userId: storageManager.getToken($('#accountSelect').val()).account_name,
		};
		require('trackjs');
		$('.spinning').hide();
	}).exec();
