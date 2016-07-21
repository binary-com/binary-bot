'use strict';
var Translator = require('translator'); // must be on top
var i18n = require('i18n');
var appId = require('./appId');
var asyncChain= require('binary-common-utils/tools').asyncChain;
var $ = require('jquery');

asyncChain()
.pipe(function checkOauthLogin(done){
	appId.oauthLogin(done);
})
.pipe(function translate(done){
	var translator = new Translator();
	$('[data-i18n-text]')
		.each(function () {
			$(this)
				.text(translator.translateText($(this)
					.attr('data-i18n-text')));
		});
	$('.spinning').hide();
})
.exec();

