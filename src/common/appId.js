import {
  addToken,
  removeToken,
  getTokenList,
  removeAllTokens,
  set as setStorage,
  syncWithDerivApp,
} from "../common/utils/storageManager";
import { parseQueryString } from "../common/utils/tools";
import { getLanguage } from "./lang";
import AppIdMap from "./appIdResolver";
import GTM from "./gtm";
import { getRelatedDeriveOrigin, updateTokenList } from '../botPage/view/deriv/utils';
import api from "../botPage/view/deriv/api";

function getStorage(label) {
  return localStorage.getItem(label);
}

export const AppConstants = Object.freeze({
  STORAGE_ACTIVE_TOKEN: "activeToken",
});

const hostName = document.location.hostname;

export const queryToObjectArray = queryStr => {
  const tokens = [];

  Object.keys(queryStr).forEach(o => {
    if (!/\d$/.test(o)) return;
    const splited_query = /^([a-zA-Z]*)([\d]*)?/.exec(o);
    let key = splited_query[1];
    const index = splited_query[2];
    key = key === 'acct' ? 'accountName' : key; // Make it consistent with storageManage naming
    if (index) {
      if (index <= tokens.length) {
        tokens[index - 1][key] = queryStr[o];
      } else {
        tokens.push({});
        tokens[index - 1][key] = queryStr[o];
      }
    }
  });
  return tokens;
};
    
export const oauthLogin = (done = () => 0) => {
    const queryStr = parseQueryString();
    const tokenObjectList = queryToObjectArray(queryStr);

  if (tokenObjectList.length) {
    $("#main").hide();
    addTokenIfValid(tokenObjectList[0].token, tokenObjectList).then(() => {
      const accounts = getTokenList();
      if (accounts.length) {
        setStorage(AppConstants.STORAGE_ACTIVE_TOKEN, accounts[0].token);
      }
      document.location = "bot.html";
    });
  } else {
    done();
  }
};

export const getCustomEndpoint = () => ({
  url: getStorage("config.server_url"),
  appId: getStorage("config.app_id"),
});

const isRealAccount = () => {
  const accountList = JSON.parse(getStorage("tokenList") || "{}");
  const activeToken = getStorage(AppConstants.STORAGE_ACTIVE_TOKEN) || [];
  let activeAccount = null;
  let isReal = false;
  try {
    activeAccount = accountList.filter(account => account.token === activeToken);
    isReal = !activeAccount[0].accountName.startsWith("VRT");
  } catch (e) {} // eslint-disable-line no-empty
  return isReal;
};

const getDomainAppId = () => {
  const hostname = hostName.replace(/^www./, "");

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
  url: isRealAccount() ? "green.binaryws.com" : "blue.binaryws.com",
  appId: getStorage("config.default_app_id") || getDomainAppId(),
});

const generateOAuthDomain = () => {
  const related_deriv_origin = getRelatedDeriveOrigin;
  const endpointUrl = getCustomEndpoint().url;

  if (endpointUrl) {
    return endpointUrl;
  }

  if (related_deriv_origin.is_offical) {
    return `oauth.deriv.${related_deriv_origin.extension}`;
  }
  
  return 'oauth.deriv.com';
};

export const getAppIdFallback = () => getCustomEndpoint().appId || getDefaultEndpoint().appId;

export const generateWebSocketURL = serverUrl => `wss://${serverUrl}`;

export const getOAuthURL = () =>
  `https://${generateOAuthDomain()}/oauth2/authorize?app_id=${getAppIdFallback()}&l=${getLanguage().toUpperCase()}`;

export async function addTokenIfValid(token, tokenObjectList) {
  try {
    const { authorize } = await api.authorize(token);
    const { landing_company_name: lcName } = authorize;
    const {
      landing_company_details: { has_reality_check: hasRealityCheck },
    } = await api.send({ landing_company_details: lcName });
    addToken(token, authorize, !!hasRealityCheck, ["iom", "malta"].includes(lcName) && authorize.country === "gb");

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
}

export const logoutAllTokens = () =>
  new Promise(resolve => {
    const tokenList = getTokenList();
    const logout = () => {
      removeAllTokens();
      resolve();
    };
    if (tokenList.length === 0) {
      logout();
    } else {
      api
        .authorize(tokenList?.[0].token)
        .then(() => {
          api.send({ logout: 1 }).finally(logout);
        })
        .catch(logout);
    }
  });

export const logoutAndReset = () =>
  new Promise((resolve) => {
    logoutAllTokens().then(() => {
      updateTokenList();
      setStorage(AppConstants.STORAGE_ACTIVE_TOKEN, "");
      setStorage('active_loginid', null)
      syncWithDerivApp();
      resolve();
    })
  })
