import { parseQueryString } from 'binary-common-utils/lib/tools';
import { addTokenIfValid } from 'binary-common-utils/lib/account';
import { set as setStorage } from 'binary-common-utils/lib/storageManager';

export const setAppId = () => {
    let appId = 0;
    if (document.location.port === '8080') {
        appId = 1168; // binary bot on localhost
    } else if (document.location.hostname.indexOf('github.io') >= 0) {
        appId = 1180; // binary bot github.io
    } else if (document.location.pathname.indexOf('/beta') >= 0) {
        appId = 1261; // binary bot beta
    } else if (document.location.pathname.indexOf('/translation') >= 0) {
        appId = 1412; // binary bot translation
    } else {
        appId = 1169; // binary bot
    }
    setStorage('appId', appId);
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
