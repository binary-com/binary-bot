import { getRelatedDeriveOrigin } from "../../botPage/view/deriv/utils";

let store = {};
let hasReadystateListener = false;

if (typeof localStorage !== "undefined") {
  store = localStorage;
}

export const getTokenList = () => {
  store.tokenList = !("tokenList" in store) ? "[]" : store.tokenList;
  try {
    return JSON.parse(store.tokenList);
  } catch (e) {
    store.tokenList = "[]";
    return [];
  }
};

export const setTokenList = (tokenList = []) => {
  store.tokenList = JSON.stringify(tokenList);
};

const findAccount = (accountName = "") => getTokenList().findIndex(tokenInfo => tokenInfo.accountName === accountName);

export const findToken = (token = "") => getTokenList().findIndex(tokenInfo => tokenInfo.token === token);

export const addToken = (token = "", loginInfo, hasRealityCheck = false, hasTradeLimitation = false) => {
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
  set("active_loginid", null);
  set("tokenList", "[]");
  set("client.accounts", "[]");
  syncWithDerivApp();
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

export const syncWithDerivApp = () => {
  const iframe = document.getElementById("localstorage-sync");
  const origin = getRelatedDeriveOrigin();
  
  const postMessages = () => {
    iframe.contentWindow.postMessage(
      {
        key: "client.accounts",
        value: get("client.accounts"),
      },
      origin
    );
    iframe.contentWindow.postMessage(
      {
        key: "active_loginid",
        value: get("active_loginid"),
      },
      origin
    );
  };

  if (iframe) {
    if (document.readyState === "complete") {
      postMessages();
      return;
    }
    if (!hasReadystateListener) {
      hasReadystateListener = true;
      document.addEventListener("readystatechange", () => {
        postMessages();
      });
    }
  }
};

export const getActiveAccount = () => {
  const client_accounts_storage = get("tokenList");
  if (client_accounts_storage?.length) {
    const active_account = get("active_loginid");
    const client_accounts_info = JSON.parse(client_accounts_storage);
    if (Array.isArray(client_accounts_info)) {
      const active_account_info = client_accounts_info?.find(account => account.accountName === active_account);
      if (active_account_info?.loginInfo) {
        return active_account_info.loginInfo;
      }
      return {};
    }
    return {};
  }
  return {};
};



export const convertForBinaryStore = clientAccounts => {
  const tokenList = [];
  const accountNames = Object.keys(clientAccounts);
  const accountList = [];

  accountNames.forEach(account => {
      const accountListItem = {};

      accountListItem.account_type = clientAccounts[account].account_type;
      accountListItem.currency = clientAccounts[account].currency;
      accountListItem.is_disabled = clientAccounts[account].is_disabled;
      accountListItem.is_virtual = clientAccounts[account].is_virtual;
      accountListItem.landing_company_name = clientAccounts[account].landing_company_name;
      accountListItem.loginid = account;
      accountListItem.trading = clientAccounts[account].trading;

      accountList.push(accountListItem);
  });

  accountNames.forEach((account, index) => {
      const accountInfo = {};
      const loginInfo = {};

      if (index === 0) {
          loginInfo.accountList = accountList;
          loginInfo.balance = clientAccounts[account].balance;
          loginInfo.email = clientAccounts[account].email;
      } else {
          loginInfo.account_type = clientAccounts[account].account_type;
          loginInfo.is_disabled = clientAccounts[account].is_disabled;
      }

      loginInfo.currency = clientAccounts[account].currency;
      loginInfo.is_virtual = clientAccounts[account].is_virtual;
      loginInfo.landing_company_name = clientAccounts[account].landing_company_name;
      loginInfo.loginid = account;
      loginInfo.trading = clientAccounts[account].trading;

      accountInfo.accountName = account;
      accountInfo.token = clientAccounts[account].token;
      accountInfo.loginInfo = loginInfo;
      accountInfo.hasRealityCheck = false; // using false as default - needs clarification
      accountInfo.hasTradeLimitation = false; // using false as default - needs clarification

      tokenList.push(accountInfo);
  });

  return tokenList;
};

export const convertForDerivStore = tokenList => {
  const clientAccounts = {};
  const accountList = tokenList[0]?.loginInfo.accountList ? 'accountList' : 'account_list';
  tokenList.forEach((account, index) => {
      const accId = account.accountName;

      clientAccounts[accId] = {};
      clientAccounts[accId].account_type = tokenList[0].loginInfo[accountList].find(
          acc => acc.loginid === accId
      ).account_type;
      clientAccounts[accId].currency = account.loginInfo.currency;
      clientAccounts[accId].is_disabled = tokenList[0].loginInfo[accountList].find(
          acc => acc.loginid === accId
      ).is_disabled;
      clientAccounts[accId].is_virtual = account.loginInfo.is_virtual;
      clientAccounts[accId].landing_company_shortcode = account.loginInfo.landing_company_name; // how shortcode is different from name?
      clientAccounts[accId].trading = account.loginInfo.trading;
      clientAccounts[accId].token = account.token;
      clientAccounts[accId].excluded_until = ''; // self-exclusion wont work at this stage; needs to be copied form deriv-app
      clientAccounts[accId].landing_company_name = account.landing_company_name;

      if (index === 0) {
          clientAccounts[accId].email = account.loginInfo.email;
          clientAccounts[accId].session_start = 0; // using zero as default, will be overwriten at deriv.app load
          clientAccounts[accId].balance = account.loginInfo.balance;
          clientAccounts[accId].accepted_bch = 0; // no clue what this is
      }
  });

  return clientAccounts;
};