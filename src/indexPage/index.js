'use strict';
import 'babel-polyfill';
import { translator } from '../common/translator';
import { setAppId, oauthLogin } from '../common/appId';
import { asyncChain } from 'binary-common-utils/lib/tools';
import $ from 'jquery';

window.$ = $;
setAppId();
asyncChain()
  .pipe(function checkOauthLogin(done) {
    oauthLogin(done);
  })
  .pipe(function translate(done) {
    $('[data-i18n-text]')
      .each(function() {
        $(this)
          .text(translator.translateText($(this)
            .attr('data-i18n-text')));
      });
    $('.spinning').hide();
  })
  .exec();
