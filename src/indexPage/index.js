import 'babel-polyfill'
import $ from 'jquery'
import { getTokenList } from 'binary-common-utils/lib/storageManager'
import { setAppId, oauthLogin } from '../common/appId'
import { load as loadLang } from '../common/lang'

if (getTokenList().length) {
  location.pathname = `${location.pathname.replace(/\/+$/, '')}/bot.html`
} else {
  window.$ = $ // eslint-disable-line no-undef
  loadLang()
  setAppId()
  oauthLogin(() => {
    $('.show-on-load').show()
    $('.barspinner').hide()
  })
}

