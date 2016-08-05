'use strict';
import 'babel-polyfill';
import Translator from 'translator';
import appId from 'appId';
import {asyncChain} from 'binary-common-utils/tools';
import $ from 'jquery';

window.$ = $;
appId.setAppId();
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

