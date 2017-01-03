import 'babel-polyfill'
import $ from 'jquery'
import { setAppId, oauthLogin } from '../common/appId'
import { load as loadLang } from '../common/lang'

window.$ = $ // eslint-disable-line no-undef
loadLang()
setAppId()
oauthLogin(() => $('.barspinner').hide())
