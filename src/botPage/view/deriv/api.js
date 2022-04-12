import DerivAPIBasic from "@deriv/deriv-api/dist/DerivAPIBasic";
import AppIdMap from "../../../common/appIdResolver";
import { supportedLanguages } from "../../../common/i18n";
import { setCookieLanguage } from "../../../common/utils/cookieManager";

function getStorage(label) {
  return window.localStorage.getItem(label);
}

function setStorage(label, data) {
  window.localStorage.setItem(label, data);
}

export const parseQueryString = () => {
  if (typeof window === 'undefined') {
    return {};
  }
  const str = window.location.search;
  const objURL = {};
  str.replace(new RegExp('([^?=&]+)(=([^&]*))?', 'g'), (a0, a1, a2, a3) => {
    objURL[a1] = a3;
  });
  return objURL;
};

export const getLanguage = () => {
  const queryLang = parseQueryString().l;
  const lang = queryLang in supportedLanguages ? queryLang : getStorage('lang') || 'en';
  setStorage('lang', lang);
  setCookieLanguage(lang);
  return lang;
};

const isRealAccount = () => {
  const accountList = JSON.parse(getStorage("tokenList") || "{}");
  const activeToken = getStorage("activeToken") || [];
  let activeAccount = null;
  let isReal = false;
  try {
    activeAccount = accountList.filter(account => account.token === activeToken);
    isReal = !activeAccount[0].accountName.startsWith("VRT");
  } catch (e) { } // eslint-disable-line no-empty
  return isReal;
};

const hostName = document.location.hostname;

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

export const getCustomEndpoint = () => ({
  url: getStorage("config.server_url"),
  appId: getStorage("config.app_id"),
});

export const getDefaultEndpoint = () => ({
  url: isRealAccount() ? "green.binaryws.com" : "blue.binaryws.com",
  appId: getStorage("config.default_app_id") || getDomainAppId(),
});

export const getServerAddressFallback = () => getCustomEndpoint().url || getDefaultEndpoint().url;
export const getWebSocketURL = () => `wss://${getServerAddressFallback()}`;

export const getAppIdFallback = () => getCustomEndpoint().appId || getDefaultEndpoint().appId;

const socket_url = `wss://${getServerAddressFallback()}/websockets/v3?app_id=${getAppIdFallback()}&l=${getLanguage().toUpperCase()}`;

// TODO: If network goes of then we should destroy the current api instance
// and once the network is back we need to create a new api instance.
const api = new DerivAPIBasic({
  connection: new WebSocket(socket_url),
});

export default api;
