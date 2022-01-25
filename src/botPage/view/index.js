/* eslint-disable import/no-extraneous-dependencies */
import { TrackJS } from 'trackjs';
import 'jquery-ui/ui/widgets/dialog';
import 'notifyjs-browser';
import View from './View';
import { trackjs_config } from './trackJs_config';
import '../../common/binary-ui/dropdown';
import GTM from '../../common/gtm';
import { parseQueryString } from '../../common/utils/tools';
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

TrackJS.install(trackjs_config);

loginCheck().then(() => {
    const view = new View();

    view.initPromise.then(() => {
        $('.show-on-load').show();
        $('.barspinner').hide();

        window.dispatchEvent(new Event('resize'));
        GTM.init();
        TrackJS.configure({
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
