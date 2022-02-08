import React from "react";
import { useSelector } from "react-redux";
import { translate } from "../../../../../../common/utils/tools";
import { observer as globalObserver } from "../../../../../../common/utils/observer";
import { currencyNameMap } from "../../../config";
import { generateDerivLink } from "../../../utils";
import { getTokenList } from "../../../../../../common/utils/storageManager";
import Modal from "../../../components/modal";
import AccountSwitchModal from "./account-switch-modal.jsx";

const TabContent = ({ tab, isActive, setIsAccDropdownOpen }) => {
  const [isAccordionOpen, setIsAccordionOpen] = React.useState(true);
  const [account_switch_modal, updateAccountSwitchModal] = React.useState(false);
  const [selected_token,updateSelectedToken] = React.useState('')
  const {is_bot_running} = useSelector(state=>state.ui);
  const { accounts } = useSelector((state) => state.client);
  const item_ref = React.useRef([]);
  const isReal = tab === "real";
  const token_list = getTokenList();

  return (
    <div className={`account__switcher-tabs-content ${isActive ? "" : "hide"}`}>
      <div className="account__switcher-accordion">
        <h3
          className="ui-accordion-header ui-state-default"
          onClick={() => setIsAccordionOpen(!isAccordionOpen)}
        >
          <div className="account__switcher-accordion-header-text">
            <span>
              {translate(isReal ? "Deriv Accounts" : "Demo Accounts")}
            </span>
            <img
              className={`header__expand ${isAccordionOpen ? "open" : ""}`}
              src="image/deriv/ic-chevron-down.svg"
            />
          </div>
        </h3>
        <div
          className={`account__switcher-list ${isAccordionOpen ? "open" : ""}`}
        >
          {accounts && Object.keys(accounts).map((acc, index) => {
            const account = accounts[acc]
            return (
              isReal !== Boolean(account.demo_account) && (
                <div
                  className={`account__switcher-acc ${
                    index === 0 ? "account__switcher-acc--active" : ""
                  }`}
                  key={acc}
                  onClick={() => {
                    const account_token = token_list.find(token=> token.accountName === acc)
                    if(account_token?.token){
                      updateSelectedToken(account_token.token);
                      updateAccountSwitchModal(true);
                    }
                  }}
                  ref={(el) => (item_ref.current[index] = el)}
                >
                  <input type="hidden" name="account_name" value={acc} />
                  <img
                    src={`image/deriv/currency/ic-currency-${
                      acc.demo_account
                        ? "virtual"
                        : account.currency?.toLowerCase()
                    }.svg`}
                  />
                  <span>
                    {acc.demo_account
                      ? translate("Demo")
                      : currencyNameMap[account.currency]?.name ||
                        account.currency}
                    <div className="account__switcher-loginid">
                      {acc}
                    </div>
                  </span>
                  <span className="account__switcher-balance">
                    {account?.balance?.toLocaleString(undefined, {
                      minimumFractionDigits:
                        currencyNameMap[account.currency]
                          ?.fractional_digits ?? 2,
                    })}
                    <span className="symbols">
                      &nbsp;
                      {account?.currency === "UST"
                        ? "USDT"
                        : account?.currency}
                    </span>
                  </span>
                </div>
              )
            );
          })}
          {isReal && (
            <a
              href={generateDerivLink("redirect", "action=add_account")}
              rel="noopener noreferrer"
              className="account__switcher-add"
            >
              <img
                className="account__switcher-add-icon"
                src="image/deriv/ic-add-circle.svg"
              />
              <span className="account__switcher-add-text">
                {translate("Add Deriv account")}
              </span>
            </a>
          )}
        </div>
      </div>
      {account_switch_modal &&(
            <Modal
                title={translate('Are you sure?')}
                class_name="account-switcher"
                onClose={()=>{updateAccountSwitchModal(false)}}
            >
                <AccountSwitchModal 
                  is_bot_running={is_bot_running} 
                  onClose={()=>updateAccountSwitchModal(false)}
                  onAccept ={()=>globalObserver.emit("ui.switch_account", selected_token)}
                />
                
            </Modal>   
        )}
    </div>
  );
};

export default TabContent;
