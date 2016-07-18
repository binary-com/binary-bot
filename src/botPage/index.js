var Bot = require('./bot');
var Translator = require('translator'); // must be on top
var i18n = require('i18n');
var asyncChain= require('binary-common-utils/tools').asyncChain;
var $ = require('jquery');
$.ajaxSetup({
	cache: false
});
window.$ = window.jQuery = $;
window.Backbone = require('backbone');
window._ = require('underscore');
require('notifyjs-browser');
require('tourist');

var translator = new Translator();
//translator.addBlocklyTranslation();
$('[data-i18n-text]')
	.each(function() {
			var contents = $(this).contents();
			if (contents.length > 0) {
					if (contents.get(0).nodeType == Node.TEXT_NODE) {
							$(this).text(translator.translateText($(this)
					.attr('data-i18n-text')))
					.append(contents.slice(1));
					}
			} else {
			$(this)
				.text(translator.translateText($(this)
					.attr('data-i18n-text')));
		}
	});
asyncChain()
	.pipe(function loadActiveSymbols(done){
		var botUtils = require('./utils/utils');
		Bot.globals = require('./globals/globals');
		botUtils.getActiveSymbols(function(activeSymbols){
			Bot.globals.activeSymbols = activeSymbols;
			done();
		});
	})
	.pipe(function runBot(done){
		window.Bot = new Bot();
		var view = require('./view'); // show the bot
		view.show(function(){
			done();
		});
	})
	.pipe(function hideSpinner(done){
		$('.spinning').hide();
	}).exec();
