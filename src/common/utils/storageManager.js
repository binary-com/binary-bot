let store = {};

if (typeof localStorage !== 'undefined') {
    store = localStorage;
}

export const getTokenList = () => {
    store.tokenList = !('tokenList' in store) ? '[]' : store.tokenList;
    try {
        return JSON.parse(store.tokenList);
    } catch (e) {
        store.tokenList = '[]';
        return [];
    }
};

export const setTokenList = (tokenList = []) => {
    store.tokenList = JSON.stringify(tokenList);
};

const findAccount = (accountName = '') => getTokenList().findIndex(tokenInfo => tokenInfo.accountName === accountName);

export const findToken = (token = '') => getTokenList().findIndex(tokenInfo => tokenInfo.token === token);

export const addToken = (token = '', loginInfo, hasRealityCheck = false, hasTradeLimitation = false) => {
    const { loginid: accountName } = loginInfo;
    const tokenList = getTokenList();
    const tokenIndex = findToken(token);
    const accountIndex = findAccount(accountName);
    if (tokenIndex < 0 && accountIndex < 0) {
        tokenList.push({
            accountName,
            token,
            loginInfo,
            hasRealityCheck,
            hasTradeLimitation,
        });
        setTokenList(tokenList);
    }
};

export const getToken = token => {
    const tokenList = getTokenList();
    const index = findToken(token);
    return index >= 0 ? tokenList[index] : {};
};

export const removeToken = token => {
    const index = findToken(token);
    if (index > -1) {
        const tokenList = getTokenList();
        tokenList.splice(index, 1);
        store.tokenList = tokenList;
    }
};

export const removeAllTokens = () => {
    delete store.tokenList;
};

export const isDone = varName => varName in store;

export const setDone = varName => {
    store[varName] = true;
};

export const set = (varName, value) => {
    store[varName] = value;
};

export const get = varName => store[varName];

export const remove = varName => delete store[varName];
