import PropTypes from "prop-types";
import React from "react";
import { TrackJS } from "trackjs";
import initialize from '../../blockly-worksace';
import SidebarToggle from "../SidebarToggle";
import { parseQueryString } from "../../../../../common/utils/tools";
import api, { addTokenIfValid, AppConstants, queryToObjectArray } from "../../../../../common/appId";
import { getTokenList, set as setStorage, get as getStorage } from "../../../../../common/utils/storageManager";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateActiveAccount, updateActiveToken, updateIsLooged } from "../../store/client-slice";
import { isLoggedIn } from "../../utils";


const BlockLyWorkspace = ({ blockly }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    loginCheck().then(() => {
      initializeBlockly();
    })
  }, []);


  const loginCheck = async () => {
    return new Promise(resolve => {
      const queryStr = parseQueryString();
      const tokenObjectList = queryToObjectArray(queryStr);

      if (!getTokenList().length) {
        if (tokenObjectList.length) {
          addTokenIfValid(tokenObjectList[0].token, tokenObjectList).then(() => {
            const accounts = getTokenList();
            if (accounts.length) {
              setStorage(AppConstants.STORAGE_ACTIVE_TOKEN, accounts[0].token);
              dispatch(updateActiveToken(accounts[0].token));
              dispatch(updateActiveAccount(accounts[0].loginInfo));
            }
            dispatch(updateIsLooged(isLoggedIn()));
            navigate('/', { replace: true });
            api.send({ balance: 1, account: 'all' });
            resolve();
          });
        }
        const active_account = getStorage("active_loginid") || "";
        let token_list = [];
        if (getStorage("client.accounts")?.length) {
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


  const initializeBlockly = () => {
    initialize(blockly)
      .then(() => {
        $(".show-on-load").show();
        $(".barspinner").hide();
        window.dispatchEvent(new Event("resize"));
        TrackJS.configure({
          userId: document.getElementById("active-account-name")?.value,
        });
      })
  }

  /* TODO: [Implement should_reload_workspace for account switching]
  React.useEffect(() => {

  }, []);
  */

  return (
    <div id="bot-blockly">
      {/* Blockly workspace will be injected here */}
      <div id="blocklyArea">
        <div id="blocklyDiv" style={{ position: 'absolute' }}></div>
        <SidebarToggle />
      </div>
    </div>
  );
};

BlockLyWorkspace.propTypes = {
  blockly: PropTypes.object.isRequired,
};

export default BlockLyWorkspace;
