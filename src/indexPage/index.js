import 'babel-polyfill'
import $ from 'jquery'
import { translator } from '../common/translator'
import { setAppId, oauthLogin } from '../common/appId'

window.$ = $ // eslint-disable-line no-undef
setAppId()
oauthLogin(() => {
  $('[data-i18n-text]')
    .each(function jqueryEach() {
      $(this)
        .text(translator.translateText($(this)
          .attr('data-i18n-text')))
    })
  $('.barspinner').hide()
})
