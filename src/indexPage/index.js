'use strict';
import Translator from 'translator';
import i18n from 'i18n';
import appId from './appId';
import {asyncChain} from 'binary-common-utils/tools';
import jQuery from 'jquery';
window.jQuery = window.$ = jQuery;

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

