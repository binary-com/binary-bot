import { parseQueryString } from 'binary-common-utils/lib/tools';
import { LiveApi } from 'binary-live-api';
import {
    addToken,
    removeToken,
    getTokenList,
    removeAllTokens,
    get as getStorage,
    set as setStorage,
} from 'binary-common-utils/lib/storageManager';
import { getLanguage } from './lang';

export const setDefaultAppId = () => {
    const { appId } = getDefaultEndpoint();
    setStorage('config.default_app_id', appId);
    setStorage('config.app_id', getStorage('config.server_url') ? getStorage('config.app_id') || appId : appId);
};

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

export const getDomainName = () => getStorage('config.server_url') || getDefaultEndpoint().url;

export const getDefaultEndpoint = () => ({
    url  : 'frontend.binaryws.com',
    appId: getStorage('config.app_id') || getStorage('config.default_app_id') || 1169,
});

export const getWebSocketURL = () => `wss://${getDomainName()}/websockets/v3`;

export const getOAuthURL = () =>
    `https://${getDomainName()}/oauth2/authorize?app_id=${getDefaultEndpoint().appId}&l=${getLanguage().toUpperCase()}`;

const options = {
    apiUrl   : getWebSocketURL(),
    websocket: typeof WebSocket === 'undefined' ? require('ws') : undefined, // eslint-disable-line global-require
    language : getStorage('lang') || 'en',
    appId    : getDefaultEndpoint().appId,
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
