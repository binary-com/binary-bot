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

export const getOAuthURL = () =>
    `https://${getServerAddressFallback()}/oauth2/authorize?app_id=${getAppIdFallback()}&l=${getLanguage().toUpperCase()}`;

const options = {
    apiUrl   : getWebSocketURL(),
    websocket: typeof WebSocket === 'undefined' ? require('ws') : undefined, // eslint-disable-line global-require
    language : getStorage('lang') || 'en',
    appId    : getAppIdFallback(),
};

export const generateLiveApiInstance = () => new LiveApi(options);

const addTokenIfValid = token =>
    new Promise((resolve, reject) => {
        const api = generateLiveApiInstance();
        api
            .authorize(token)
            .then(response => {
                const landingCompanyName = response.authorize.landing_company_name;
                api.getLandingCompanyDetails(landingCompanyName).then(r => {
                    addToken(
                        token,
                        response.authorize,
                        !!r.landing_company_details.has_reality_check,
                        ['iom', 'malta'].includes(landingCompanyName)
                    );
                    api.disconnect();
                    resolve(null);
                }, () => 0);
            })
            .catch(e => {
                removeToken(token);
                api.disconnect();
                reject(e);
            });
    });

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
