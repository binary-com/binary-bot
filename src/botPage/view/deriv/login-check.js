import { parseQueryString } from "../../../common/utils/tools";
import { queryToObjectArray, addTokenIfValid, AppConstants } from "../../../common/appId";
import { getTokenList, set as setStorage, get as getStorage } from "../../../common/utils/storageManager";

export default function loginCheck() {
  return new Promise(resolve => {
    const queryStr = parseQueryString();
    const tokenObjectList = queryToObjectArray(queryStr);
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
      if (getStorage("client.accounts")) {
        token_list = JSON.parse(getStorage("client.accounts"));
      }
      if (active_account && token_list.length) {
        const active_token = token_list.find(account => account.accountName === active_account).token;
        setStorage("activeToken", active_token);
        window.location.reload();
        resolve();
      }
      setStorage("tokenList", JSON.stringify(token_list));
    }
    resolve();
  });
}
