import React from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AccountSwitchModal from "./account-switch-modal.jsx";
import { translate } from "../../../../../../common/utils/tools";
import TabContent from "./tab-content.jsx";
import { currencyNameMap } from "../../../config";
import Modal from "../../../components/modal";
import { observer as globalObserver } from '../../../../../../common/utils/observer';
import { setShouldReloadWorkspace } from "../../../store/ui-slice.js";
import useLogout from "../../../../../../common/hooks/useLogout.js";

const Separator = () => <div className="account__switcher-seperator"></div>;
const getTotalDemo = (accounts) => {
  if (!accounts) return 0;
  const demo_account = Object.values(accounts).find(
    (acc) => acc.demo_account && acc.type === "deriv"
  );
  const total = demo_account?.balance || 0;
  return total.toLocaleString(undefined, {
    minimumFractionDigits: currencyNameMap[total]?.fractional_digits ?? 2,
  });
};

const AccountDropdown = React.forwardRef((props, dropdownRef) => {
  const { setIsAccDropdownOpen, virtual } = props;
  const [activeTab, setActiveTab] = React.useState(virtual ? "demo" : "real");
  const [show_logout_modal, updaetShowLogoutModal] = React.useState(false)
  const { total_deriv, accounts } = useSelector(state => state.client);
  const { is_bot_running, show_bot_unavailable_page } = useSelector(state => state.ui);
  const container_ref = React.useRef();
  const dispatch = useDispatch();
  const location = useLocation();
  const logout = useLogout();

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (
        container_ref.current &&
        !container_ref?.current?.contains(event.target)
      ) {
        setIsAccDropdownOpen(false);
      }
    }
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const onLogout = () => {
    if(location.pathname.includes('endpoint')) {
      logout();
    } else {
      globalObserver.emit('ui.logout');
    }
    dispatch(setShouldReloadWorkspace(true));
  }

  return (
    <div className="account__switcher-dropdown-wrapper show" ref={dropdownRef}>
      <div id="account__switcher-dropdown" className="account__switcher-dropdown" ref={container_ref}>

        <div className="account__switcher-container">
          <ul className="account__switcher-tabs">
            <li
              className={`account__switcher-tab ${activeTab === "real" ? "ui-tabs-active" : ""}`}
              onClick={() => setActiveTab("real")}
            >
              <a>{translate("Real")}</a>
            </li>
            <li
              className={`account__switcher-tab ${activeTab === "real" ? "" : "ui-tabs-active"}`}
              onClick={() => setActiveTab("demo")}
            >
              <a>{translate("Demo")}</a>
            </li>
          </ul>
          <TabContent
            tab="real"
            isActive={activeTab === "real"}
            setIsAccDropdownOpen={setIsAccDropdownOpen}
            accounts={accounts}
          />
          <TabContent
            tab="demo"
            isActive={activeTab === "demo"}
            setIsAccDropdownOpen={setIsAccDropdownOpen}
            accounts={accounts}
          />
        </div>
        <Separator />
        <div className="account__switcher-total">
          <div className="account__switcher-total-balance">
            <span className="account__switcher-total-balance-text">{translate("Total assets")}</span>
            <span className="account__switcher-total-balance-amount account__switcher-balance">
              {activeTab === "demo" ? getTotalDemo(accounts) : total_deriv.amount}
              <span className="symbols">&nbsp;{activeTab === "demo" ? "USD" : total_deriv.currency}</span>
            </span>
          </div>
          <Separator />
          <div
            id="deriv__logout-btn"
            className="account__switcher-logout logout"
            onClick={() => {
              if (show_bot_unavailable_page) onLogout()
              else updaetShowLogoutModal(true);
            }}
          >
            <span className="account__switcher-logout-text">{translate("Log out")}</span>
            <img className="account__switcher-logout-icon logout-icon" src="image/deriv/ic-logout.svg" />
          </div>
        </div>
      </div>
      {show_logout_modal && (
        <Modal
          title={translate('Are you sure?')}
          class_name="logout"
          onClose={() => updaetShowLogoutModal(false)}
        >
          <AccountSwitchModal
            is_bot_running={is_bot_running}
            onClose={() => updaetShowLogoutModal(false)}
            onAccept={onLogout}
          />

        </Modal>
      )}
    </div>
  )
})

export default AccountDropdown;
