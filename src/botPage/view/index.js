/* eslint-disable import/no-extraneous-dependencies */
import { TrackJS } from "trackjs";
import "jquery-ui/ui/widgets/dialog";
import "notifyjs-browser";
import View from "./View";
import { trackjs_config } from "./trackJs_config";
import GTM from "../../common/gtm";
import { parseQueryString } from "../../common/utils/tools";
import endpoint from "../../indexPage/endpoint";
import { queryToObjectArray, addTokenIfValid, AppConstants } from "../../common/appId";
import { 
  getTokenList, 
  set as setStorage, 
  get as getStorage, 
  removeAllTokens, 
  convertForDerivStore, 
} from "../../common/utils/storageManager";

$.ajaxSetup({
  cache: false,
});

TrackJS.install(trackjs_config);

loginCheck().then(() => {
  const view = new View();

  view.initPromise.then(() => {
    $(".show-on-load").show();
    $(".barspinner").hide();

    window.dispatchEvent(new Event("resize"));
    GTM.init();
    TrackJS.configure({
      userId: document.getElementById("active-account-name")?.value,
    });
  });
});

function loginCheck() {
  return new Promise(resolve => {
    if (endpoint()) resolve();
    const queryStr = parseQueryString();
    const tokenObjectList = queryToObjectArray(queryStr);
    if (!Array.isArray(getTokenList())) {
      removeAllTokens();
    }
    if (!getTokenList().length) {
      if (tokenObjectList.length) {
        addTokenIfValid(tokenObjectList[0].token, tokenObjectList).then(() => {
          const accounts = getTokenList();
          if (accounts.length) {
            setStorage(AppConstants.STORAGE_ACTIVE_TOKEN, accounts[0].token);
          }
          window.location.replace(window.location.href.split("/?")[0]);
          resolve();
        });
      }
      const active_account = getStorage("active_loginid") || "";
      let token_list = [];
      if (getStorage("tokenList")) {
        token_list = JSON.parse(getStorage("tokenList"));
      }
      if (active_account && token_list.length) {
        const active_token = token_list.find(account => account.accountName === active_account).token;
        setStorage("activeToken", active_token);
        window.location.reload();
        resolve();
      }
      setStorage("tokenList", JSON.stringify(token_list));
      setStorage("client.accounts", JSON.stringify(convertForDerivStore(token_list)));
    }
    resolve();
  });
}
