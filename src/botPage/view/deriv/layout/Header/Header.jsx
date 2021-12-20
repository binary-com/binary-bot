import React from "react";
import { translate, isMobile, isDesktop } from "../../../../../common/utils/tools";
import AccountActions from "./components/account-actions.jsx";
import { platforms } from "../../config.js";
import PlatformDropdown from "./components/platform-dropdown.jsx";
import classNames from "classnames";
import { generateDerivLink } from "../../utils";

const MenuLinks = () => (
    <div className="header__menu-item header__menu-links client_logged_in">
        <a className="url-reports-positions header__menu-links-item" href={generateDerivLink("reports/positions")}>
            <span>
                <img className="header__icon-text reports-icon" src="image/deriv/ic-reports.svg" />
                {translate("Reports")}
            </span>
        </a>
        <a className="url-cashier-deposit header__menu-links-item" href={generateDerivLink("cashier/deposit")}>
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

const DrawerMenu = ({
    updateShowDrawerMenu,
    setIsPlatformSwitcherOpen,
    isPlatformSwitcherOpen,
    hideDropdown,
    platformDropdownRef,
    isLogged,
    })=>{
    const drawer_ref = React.useRef();

    React.useEffect(() => {
        function handleClickOutside(event) {
            if (drawer_ref.current && !drawer_ref.current.contains(event.target)) {
                updateShowDrawerMenu(false)
            }
        }
        window.addEventListener("click", handleClickOutside);
        

        return () => window.removeEventListener("click", handleClickOutside);
    })    
    return(
        <div className="header__drawer-wrapper">
            <div className="header__drawer" ref={drawer_ref}>
                <div className="header__drawer-top">
                    <img 
                        src="image/deriv/ic-close.svg" 
                        className="header__drawer-close"
                        onClick={()=>{updateShowDrawerMenu(false)}}
                        />
                        {translate('Menu')}
                </div>
                <div className="header__drawer-content">
                    <div 
                        id="platform__switcher" 
                        className="header__drawer__platform-switcher" 
                        onClick={() => setIsPlatformSwitcherOpen(!isPlatformSwitcherOpen)}
                    >
                        <img className="header__logo" src="image/deriv/brand/ic-brand-binarybot.svg" />
                        <div className="platform__switcher-header">Binary Bot</div>
                        <img 
                            id="platform__switcher-expand"
                            className={classNames("header__icon header__expand", {"open" : isPlatformSwitcherOpen})}
                            src="image/deriv/ic-chevron-down-bold.svg" 
                        />
                    </div>
                    {isPlatformSwitcherOpen && <PlatformDropdown platforms={platforms} hideDropdown={hideDropdown} ref={platformDropdownRef}/>}
                    {isLogged && <MenuLinks />} 
                </div>

            </div>
        </div>
    )
}

const Header = ({ clientInfo }) => {
    const [isPlatformSwitcherOpen, setIsPlatformSwitcherOpen] = React.useState(false);
    const [showDrawerMenu, updateShowDrawerMenu] = React.useState(false);
    const platformDropdownRef = React.useRef();
    const {isLogged} = clientInfo

    const hideDropdown = e => !platformDropdownRef.current.contains(e.target) && setIsPlatformSwitcherOpen(false);

    return (
        <div className="header">
            <div id="deriv__header" className="header__menu-items">
                {isDesktop() &&
                <div className="header__menu-left">
                    {isPlatformSwitcherOpen && <PlatformDropdown platforms={platforms} hideDropdown={hideDropdown} ref={platformDropdownRef}/>}
                    <div 
                        id="platform__switcher" 
                        className="header__menu-item platform__switcher" 
                        onClick={() => setIsPlatformSwitcherOpen(!isPlatformSwitcherOpen)}
                    >
                        <img className="header__logo" src="image/deriv/brand/ic-brand-binarybot.svg" />
                        <div className="platform__switcher-header">Binary Bot</div>
                        <img 
                            id="platform__switcher-expand"
                            className={classNames("header__icon header__expand", {"open" : isPlatformSwitcherOpen})}
                            src="image/deriv/ic-chevron-down-bold.svg"
                        />
                    </div>
                    {isLogged && <MenuLinks />}
                </div>
                }
                {isMobile() && (
                    <img 
                        className="btn__close header__hamburger" 
                        src="image/deriv/ic-hamburger.svg"
                        onClick= {()=>{updateShowDrawerMenu(true)}}
                    />
                )}
                <div className="header__menu-right">
                    {isLogged 
                        ? <AccountActions clientInfo={clientInfo} />
                        : <AuthButtons /> 
                    }
                </div>
            </div>
            {showDrawerMenu && 
                <DrawerMenu
                     updateShowDrawerMenu={updateShowDrawerMenu} 
                     setIsPlatformSwitcherOpen={setIsPlatformSwitcherOpen}
                     isPlatformSwitcherOpen= {isPlatformSwitcherOpen}
                     hideDropdown= {hideDropdown}
                     platformDropdownRef={platformDropdownRef}
                     isLogged={isLogged}
                     />}
        </div>
    );
};

export default Header;
