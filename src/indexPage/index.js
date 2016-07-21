'use strict';
var Translator = require('translator'); // must be on top
import i18n from 'i18n';
import appId from './appId';
var asyncChain= require('binary-common-utils/tools').asyncChain;
import $ from 'jquery';

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

