import DerivAPIBasic from '@deriv/deriv-api/dist/DerivAPIBasic';
import {
    addToken,
    removeToken,
    getTokenList,
    removeAllTokens,
    get as getStorage,
    set as setStorage,
} from '../common/utils/storageManager';
import { parseQueryString, isProduction, getExtension } from '../common/utils/tools';
import { getLanguage } from './lang';
import AppIdMap from './appIdResolver';
import GTM from './gtm';
import { getRelatedDeriveOrigin } from '../botPage/view/deriv/utils';

export const AppConstants = Object.freeze({
    STORAGE_ACTIVE_TOKEN: 'activeToken',
});

const hostName = document.location.hostname;

export const queryToObjectArray = queryStr => {
    const tokens = [];
    Object.keys(queryStr).forEach(o => {
        if (!/\d$/.test(o)) return;
        const index = parseInt(o.slice(-1));
        let key = o.slice(0, -1);
        key = key === 'acct' ? 'accountName' : key; // Make it consistent with storageManage naming
        if (index <= tokens.length) {
            tokens[index - 1][key] = queryStr[o];
        } else {
            tokens.push({});
            tokens[index - 1][key] = queryStr[o];
        }
    });
    return tokens;
};

export const oauthLogin = (done = () => 0) => {
    const queryStr = parseQueryString();

    const tokenObjectList = queryToObjectArray(queryStr);

    if (tokenObjectList.length) {
        $('#main').hide();
        addTokenIfValid(tokenObjectList[0].token, tokenObjectList).then(() => {
            const accounts = getTokenList();
            if (accounts.length) {
                setStorage(AppConstants.STORAGE_ACTIVE_TOKEN, accounts[0].token);
            }
            document.location = 'bot.html';
        });
    } else {
        done();
    }
};

export const getCustomEndpoint = () => ({
    url: getStorage('config.server_url'),
    appId: getStorage('config.app_id'),
});

const isRealAccount = () => {
    const accountList = JSON.parse(getStorage('tokenList') || '{}');
    const activeToken = getStorage(AppConstants.STORAGE_ACTIVE_TOKEN) || [];
    let activeAccount = null;
    let isReal = false;
    try {
        activeAccount = accountList.filter(account => account.token === activeToken);
        isReal = !activeAccount[0].accountName.startsWith('VRT');
    } catch (e) {} // eslint-disable-line no-empty
    return isReal;
};

const getDomainAppId = () => {
    const hostname = hostName.replace(/^www./, '');

    // eslint-disable-next-line no-nested-ternary
    return hostname in AppIdMap.production
        ? AppIdMap.production[hostname]
        : // eslint-disable-next-line no-nested-ternary
        hostname in AppIdMap.staging
            ? AppIdMap.staging[hostname]
            : hostname in AppIdMap.dev
                ? AppIdMap.dev[hostname]
                : 29864;
};

export const getDefaultEndpoint = () => ({
    url: isRealAccount() ? 'green.binaryws.com' : 'blue.binaryws.com',
    appId: getStorage('config.default_app_id') || getDomainAppId(),
});

const generateOAuthDomain = () => {
    const related_deriv_origin = getRelatedDeriveOrigin
    const endpointUrl = getCustomEndpoint().url;
    if (endpointUrl) {
        return endpointUrl;
    } 
    if(related_deriv_origin.is_offical){
        return `oauth.deriv.${related_deriv_origin.extension}`;
    }
    
    return 'oauth.deriv.com';
};

export const getServerAddressFallback = () => getCustomEndpoint().url || getDefaultEndpoint().url;

export const getAppIdFallback = () => getCustomEndpoint().appId || getDefaultEndpoint().appId;

export const getWebSocketURL = () => `wss://${getServerAddressFallback()}`;

export const generateWebSocketURL = serverUrl => `wss://${serverUrl}/websockets/v3`;

export const getOAuthURL = () =>
    `https://${generateOAuthDomain()}/oauth2/authorize?app_id=${getAppIdFallback()}&l=${getLanguage().toUpperCase()}`;

const options = {
    app_id: getAppIdFallback(),
    lang: getLanguage().toUpperCase(),
    endpoint: getWebSocketURL(),
};

export const generateDerivApiInstance = () => new DerivAPIBasic(options);

export const generateTestDerivApiInstance = overrideOptions =>
    new DerivAPIBasic(Object.assign({}, options, overrideOptions));

export async function addTokenIfValid(token, tokenObjectList) {
    const api = generateDerivApiInstance();
    try {
        const { authorize } = await api.authorize(token);
        const { landing_company_name: lcName } = authorize;
        const {
            landing_company_details: { has_reality_check: hasRealityCheck },
        } = await api.send({ landing_company_details: lcName });
        addToken(token, authorize, !!hasRealityCheck, ['iom', 'malta'].includes(lcName) && authorize.country === 'gb');

        const { account_list: accountList } = authorize;
        if (accountList.length > 1) {
            tokenObjectList.forEach(tokenObject => {
                if (tokenObject.token !== token) {
                    const account = accountList.filter(o => o.loginid === tokenObject.accountName);
                    if (account.length) {
                        addToken(tokenObject.token, account[0], false, false);
                    }
                }
            });
        }
    } catch (e) {
        removeToken(tokenObjectList[0].token);
        GTM.setVisitorId();
        throw e;
    }
    return api.disconnect();
}

export const logoutAllTokens = () =>
    new Promise(resolve => {
        const api = generateDerivApiInstance();
        const tokenList = getTokenList();
        const logout = () => {
            removeAllTokens();
            api.disconnect();
            resolve();
        };
        if (tokenList.length === 0) {
            logout();
        } else {
            api.authorize(tokenList[0].token).then(() => {
                api.send({ logout: 1 }).then(logout, logout);
                // api.logOut().then(logout, logout);
            }, logout);
        }
    });
