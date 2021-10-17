/* eslint-disable import/no-extraneous-dependencies */
import 'jquery-ui/ui/widgets/dialog';
import 'notifyjs-browser';
import View from './View';
import '../../common/binary-ui/dropdown';
import GTM from '../../common/gtm';
import { isProduction, parseQueryString } from '../../common/utils/tools';
import endpoint from '../../indexPage/endpoint';
import { queryToObjectArray, addTokenIfValid, AppConstants } from '../../common/appId';
import {
    getTokenList,
    isLoggedInDeriv,
    set as setStorage,
    get as getStorage,
    convertForBinaryStore,
} from '../../common/utils/storageManager';

$.ajaxSetup({
    cache: false,
});

// eslint-disable-next-line no-underscore-dangle
window._trackJs = {
    token: '346262e7ffef497d85874322fff3bbf8',
    application: 'binary-bot',
    enabled: isProduction(),
    console: {
        display: false,
    },
};

// Should stay below the window._trackJs config
require('trackjs');

loginCheck().then(() => {
    const view = new View();

    view.initPromise.then(() => {
        $('.show-on-load').show();
        $('.barspinner').hide();
        window.dispatchEvent(new Event('resize'));
        GTM.init();
        trackJs.configure({
            userId: $('.account-id')
                .first()
                .text(),
        });
    });
});

function loginCheck() {
    return new Promise(resolve => {
        if (endpoint()) resolve();
        const queryStr = parseQueryString();
        const tokenObjectList = queryToObjectArray(queryStr);
        if (!getTokenList().length) {
            if (tokenObjectList.length) {
                addTokenIfValid(tokenObjectList[0].token, tokenObjectList).then(() => {
                    const accounts = getTokenList();
                    if (accounts.length) {
                        setStorage(AppConstants.STORAGE_ACTIVE_TOKEN, accounts[0].token);
                    }
                    window.location.replace(window.location.href.split('/?')[0]);
                    resolve();
                });
            } else if (isLoggedInDeriv()) {
                const activeAccount = getStorage('active_loginid');
                const tokenList = convertForBinaryStore(JSON.parse(getStorage('client.accounts')));
                const activeToken = tokenList.find(account => account.accountName === activeAccount).token;

                setStorage('activeToken', activeToken);
                setStorage('tokenList', JSON.stringify(tokenList));

                window.location.reload();
                resolve();
            } else {
                resolve();
            }
        } else {
            resolve();
        }
    });
}
