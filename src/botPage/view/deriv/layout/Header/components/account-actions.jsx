import React from "react";
import { translate } from "../../../../../../common/utils/tools";
import Notifications from "./notifications.jsx";
import AccountDropdown from "./account-dropdown.jsx";
import { currencyNameMap } from "../../../config";
import { generateDerivLink } from "../../../utils";
import { useSelector } from "react-redux";

const AccountActions = () => {
    const { currency, is_virtual, balance, active_token, active_account_name } = useSelector(state=>state.client);
    const [is_acc_dropdown_open, setIsAccDropdownOpen] = React.useState(false);
    const dropdownRef = React.useRef();

    return (
        <React.Fragment>
            <Notifications />
            {/* [Todo] Needs to remove input after add client info to blockly */}
            <input type="hidden" id="active-token"value={active_token}/>
            <input type="hidden" id="active-account-name"value={active_account_name}/>
            <a className="url-account-details header__account header__menu-item mobile-hide" href={generateDerivLink('account')}>
                <img className="header__icon-button" id="header__account-settings" src="image/deriv/ic-user-outline.svg" />
            </a>
            <div className="header__divider mobile-hide"></div>
            <div 
                id="acc_switcher"
                className="header__menu-item header__menu-acc"
                onClick={() => setIsAccDropdownOpen(!is_acc_dropdown_open)}
            >
                <div className="header__acc-info">
                    <img 
                        id="header__acc-icon" 
                        className="header__acc-icon" 
                        src={`image/deriv/currency/ic-currency-${is_virtual ? "virtual" : currency.toLowerCase()}.svg`} 
                    />
                    <div id="header__acc-balance" className="header__acc-balance">
                        {balance.toLocaleString(undefined, { minimumFractionDigits: currencyNameMap[currency]?.fractional_digits ?? 2})}
                        <span className="symbols">&nbsp;{currency}</span>
                    </div>
                    <img 
                        className={`header__icon header__expand ${is_acc_dropdown_open ? "open" : ""}`}
                        src="image/deriv/ic-chevron-down-bold.svg" 
                    />
                </div>
            </div>
            {is_acc_dropdown_open && 
            <AccountDropdown 
                virtual = {is_virtual}
                ref={dropdownRef}
                setIsAccDropdownOpen = {setIsAccDropdownOpen}
            />}
            <a className="url-cashier-deposit btn btn--primary header__deposit mobile-hide" href="https://app.deriv.com/cashier/deposit">{translate("Deposit")}</a>
        </React.Fragment>
    )
};

export default AccountActions;
