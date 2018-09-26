import 'babel-polyfill';
import { getTokenList } from '../common/utils/storageManager';
import { oauthLogin } from '../common/appId';
import { load as loadLang } from '../common/lang';
import '../common/binary-ui/dropdown';
import endpoint from './endpoint';

const loginCheck = () => {
    if (endpoint()) return;
    if (getTokenList().length) {
        window.location.pathname = `${window.location.pathname.replace(/\/+$/, '')}/bot.html`;
    } else {
        loadLang();
        oauthLogin(() => {
            $('.show-on-load').show();
            $('.barspinner').hide();
        });
    }
};

loginCheck();
