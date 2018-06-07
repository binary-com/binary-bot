import { parseQueryString } from 'binary-common-utils/lib/tools';
import { LiveApi } from 'binary-live-api';
import {
    addToken,
    removeToken,
    getTokenList,
    removeAllTokens,
    get as getStorage,
} from 'binary-common-utils/lib/storageManager';
import { getLanguage } from './lang';

const addAllTokens = tokenList => Promise.all(tokenList.map(token => addTokenIfValid(token)));

export const AppConstants = Object.freeze({
    STORAGE_ACTIVE_TOKEN: 'activeToken',
});

export const oauthLogin = (done = () => 0) => {
    const queryStr = parseQueryString();
    let tokenList = [];
    tokenList = Object.keys(queryStr)
        .map(r => (r.indexOf('token') === 0 ? queryStr[r] : null))
        .filter(r => r);
    if (tokenList.length) {
        $('#main').hide();
        addAllTokens(tokenList).then(() => {
            document.location = 'bot.html';
        });
    } else {
        done();
    }
};

export const getCustomEndpoint = () => ({
    url  : getStorage('config.server_url'),
    appId: getStorage('config.app_id'),
});

export const getDefaultEndpoint = () => ({
    url  : 'frontend.binaryws.com',
    appId: getStorage('config.default_app_id') || 1169,
});

export const getServerAddressFallback = () => getCustomEndpoint().url || getDefaultEndpoint().url;

export const getAppIdFallback = () => getCustomEndpoint().appId || getDefaultEndpoint().appId;

export const getWebSocketURL = () => `wss://${getServerAddressFallback()}/websockets/v3`;

export const generateWebSocketURL = serverUrl => `wss://${serverUrl}/websockets/v3`;

export const getOAuthURL = () =>
    `https://${getServerAddressFallback()}/oauth2/authorize?app_id=${getAppIdFallback()}&l=${getLanguage().toUpperCase()}`;

const options = {
    apiUrl   : getWebSocketURL(),
    websocket: typeof WebSocket === 'undefined' ? require('ws') : undefined, // eslint-disable-line global-require
    language : getStorage('lang') || 'en',
    appId    : getAppIdFallback(),
};

export const generateLiveApiInstance = () => new LiveApi(options);

export const generateTestLiveApiInstance = overrideOptions => new LiveApi(Object.assign({}, options, overrideOptions));

export async function addTokenIfValid(token) {
    const api = generateLiveApiInstance();
    try {
        const { authorize } = await api.authorize(token);
        const { landing_company_name: lcName } = authorize;
        const { landing_company_details: { has_reality_check: hasRealityCheck } } = await api.getLandingCompanyDetails(
            lcName
        );
        addToken(token, authorize, !!hasRealityCheck, ['iom', 'malta'].includes(lcName) && authorize.country === 'gb');
    } catch (e) {
        removeToken(token);
        throw e;
    }
    return api.disconnect();
}

export const logoutAllTokens = () =>
    new Promise(resolve => {
        const api = generateLiveApiInstance();
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
                api.logOut().then(logout, logout);
            }, logout);
        }
    });
