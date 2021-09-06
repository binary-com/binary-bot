import React from "react";
import { translate } from "../../../../../common/utils/tools";
import AccountActions from "./components/account-actions.jsx";
import platforms from "../../platforms";
import PlatformDropdown from "./components/platform-dropdown.jsx";

const MenuLinks = () => (
    <div className="header__menu-item header__menu-links client_logged_in mobile-hide">
        <a className="url-reports-positions header__menu-links-item" href="">
            <span>
                <img className="header__icon-text reports-icon" src="image/deriv/ic-reports.svg" />
                {translate("Reports")}
            </span>
        </a>
        <a className="url-cashier-deposit header__menu-links-item" href="">
            <span>
                <img id="cashier_icon" className="header__icon-text" src="image/deriv/ic-cashier.svg"/>
                {translate("Cashier")}
            </span>
        </a>
    </div>
);

const AuthButtons = () => (
        <div className="header__btn">
            <button id="btn__login" className="btn btn--tertiary header__btn-login">Log in</button>
            <a 
                id="btn__signup" 
                className="btn btn--primary header__btn-signup" 
                target="_blank" 
                rel="noopener noreferrer" 
                href="https://deriv.com/signup/"
            >
                {translate("Sign up")}
            </a>
        </div>
);

const windowClickHandler = e => {
    const platform_list_element = document.getElementById("platform__list");
    const platform_switcher_element = document.getElementById("platform__switcher");

    e.target !== platform_list_element && platform_switcher_element.click();
}

const togglePlatformSwitcher = e => {
    const platform_dropdown_element = document.getElementById("platform__dropdown");
    const expand_icon = document.getElementById("platform__switcher-expand");

    e.stopPropagation();
    expand_icon.classList.toggle("open")
    platform_dropdown_element.classList.toggle("platform__dropdown--show");
    platform_dropdown_element.classList.contains("platform__dropdown--show") 
        ? window.addEventListener("click", windowClickHandler)
        : window.removeEventListener("click", windowClickHandler);

};

const Header = ({ isLogged, tokenList }) => {

    return (
        <div className="header">
            <div id="platform__dropdown" className="platform__dropdown">
                <PlatformDropdown platforms={platforms} />
            </div>
            <div id="deriv__header" className="header__menu-items">
                <div className="header__menu-left">
                    <div id="platform__switcher" className="header__menu-item platform__switcher mobile-hide" onClick={togglePlatformSwitcher}>
                        <img className="header__logo" src="image/deriv/brand/ic-brand-binarybot.svg" />
                        <div className="platform__switcher-header">LegacyBot</div>
                        <img id="platform__switcher-expand" className="header__icon header__expand" src="image/deriv/ic-chevron-down-bold.svg" />
                    </div>
                    {isLogged && <MenuLinks />}
                </div>
                <div className="header__menu-right">
                    {isLogged 
                        ? <AccountActions tokenList={tokenList} />
                        : <AuthButtons /> 
                    }
                </div>
            </div>
        </div>
    );
};

export default Header;
