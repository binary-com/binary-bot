import 'babel-polyfill';
import { getTokenList } from 'binary-common-utils/lib/storageManager';
import { setDefaultAppId, oauthLogin } from '../common/appId';
import { load as loadLang } from '../common/lang';
import '../common/binary-ui/dropdown';
import endpoint from './endpoint';

if (endpoint()) return;
if (getTokenList().length) {
    window.location.pathname = `${window.location.pathname.replace(/\/+$/, '')}/bot.html`;
} else {
    loadLang();
    setDefaultAppId();
    oauthLogin(() => {
        $('.show-on-load').show();
        $('.barspinner').hide();
    });
}
