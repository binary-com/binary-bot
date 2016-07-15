window.Bot = {};
var translator = require('common/translator'); // must be on top
var commonUtils = require('utils');
var $ = require('jquery');
$.ajaxSetup({
	cache: false
});
window.$ = window.jQuery = $;
window.Backbone = require('backbone');
window._ = require('underscore');
require('notifyjs-browser');
require('tourist');


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
		var botUtils = require('./view/utils/utils');
		Bot.globals = require('./view/globals/globals');
		botUtils.getActiveSymbols(function(activeSymbols){
			Bot.globals.activeSymbols = activeSymbols;
			done();
		});
	})
	.pipe(function runBot(done){
		Bot.config = require('./view/globals/config');
		Bot.utils = require('./view/utils/utils');
		Bot.version = require('./view/globals/version');
		Bot.markets = require('./view/trade/markets');
		Bot.conditions = require('./view/trade/conditions');
		Bot.trade = require('./view/trade/trade');
		Bot.toggleDebug = require('./view/globals/globals')
			.toggleDebug;
		var view = require('./view/view'); // show the bot
		view.show(function(){
			done();
		});
	})
	.pipe(function hideSpinner(done){
		$('.spinning').hide();
	}).exec();
