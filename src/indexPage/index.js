import 'babel-polyfill';
import { getTokenList } from 'binary-common-utils/lib/storageManager';
import { setAppId, oauthLogin } from '../common/appId';
import { load as loadLang } from '../common/lang';
import '../common/binary-ui/dropdown';

if (getTokenList().length) {
    window.location.pathname = `${window.location.pathname.replace(/\/+$/, '')}/bot.html`;
} else {
    loadLang();
    setAppId();
    oauthLogin(() => {
        $('.show-on-load').show();
        $('.barspinner').hide();
    });
}
