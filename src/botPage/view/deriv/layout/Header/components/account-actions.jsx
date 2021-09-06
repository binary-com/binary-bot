import React from "react";
import { translate } from "../../../../../../common/utils/tools";

const AccountActions = ({ tokenList }) => {
    const { balance, currency, is_virtual } = tokenList[0].loginInfo;
    const toggleAccountSwitcher = () => {
        document.getElementById("header__acc-expand").classList.toggle("open");
    };

    return (
        <React.Fragment>
            <div id="header__notification" className="header__notification header__menu-item">
                <div id="header__notiifcation-icon-container" className="header__notification-icon-container">
                    <img id="header__notification-icon" className="header__notification-icon header__icon-button" src="image/deriv/ic-bell.svg" />
                    <div id="header__notification-count" className="header__notification-count"></div>
                </div>
                <div id="header__notification-container" className="header__notification-container">
                    <div className="header__notification-header">
                        <span>{translate("Notifications")}</span>
                        <img id="header__notification-close" className="btn__close mobile-show" src="image/deriv/ic-close.svg" />
                    </div>
                    <div id="header__notification-content" className="header__notification-content">
                        <div id="header__notification-empty" className="header__notification-empty">
                            <img id="header__notification-empty-img" src="image/deriv/ic-box.svg" />
                            <div className="header__notification-empty-text">{translate("No notifications")}</div>
                            <div className="header__notification-empty-desc">{translate("You have yet to receive any notifications")}</div>
                        </div>
                    </div>
                </div>
            </div>
            <a className="url-account-details header__account header__menu-item mobile-hide" href="">
                <img className="header__icon-button" id="header__account-settings" src="image/deriv/ic-user-outline.svg" />
            </a>
            <div className="header__divider mobile-hide"></div>
            <div className="header__acc-info" onClick={toggleAccountSwitcher}>
                <img 
                    id="header__acc-icon" 
                    className="header__acc-icon" 
                    src={`image/deriv/currency/ic-currency-${is_virtual ? "virtual" : currency.toLowerCase()}.svg`} 
                />
                <div id="header__acc-balance" className="header__acc-balance">
                    {balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    <span className="symbols">&nbsp;{currency}</span>
                </div>
                <img id="toggleHeaderButton" className="header__icon header__expand" src="image/deriv/ic-chevron-down-bold.svg" />
            </div>
            <a className="url-cashier-deposit btn btn--primary header__deposit mobile-hide" href="">{translate("Deposit")}</a>
        </React.Fragment>
    )
};

export default AccountActions;
