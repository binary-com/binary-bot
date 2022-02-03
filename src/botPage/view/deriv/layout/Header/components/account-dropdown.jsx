import React from "react";
import { translate } from "../../../../../../common/utils/tools";
import TabContent from "./tab-content.jsx";
import { observer as globalObserver } from '../../../../../../common/utils/observer';
import { currencyNameMap } from "../../../config";

const Separator = () => <div className="account__switcher-seperator"></div>;
const getTotalAssets = (clientInfo, is_virtual) => {
    let total = 0

    if (is_virtual) {
        const virtual_account = Object.values(clientInfo.balance.accounts).find(acc => acc.demo_account === 1 && acc.type === 'deriv')
        total = virtual_account?.balance || 0
    } else {
        total = clientInfo.balance.total.deriv.amount;
    }
    return total.toLocaleString(undefined, { minimumFractionDigits: currencyNameMap[total]?.fractional_digits ?? 2 })
}
const AccountDropdown = React.forwardRef(({ clientInfo, setIsAccDropdownOpen }, dropdownRef) => {
    const [activeTab, setActiveTab] = React.useState(clientInfo.tokenList[0].loginInfo.is_virtual === 0 ? "real" : "demo");
    let totalCurrency = 'USD'
    const container_ref = React.useRef();
    const total = getTotalAssets(clientInfo, activeTab === 'demo')
    if (activeTab === "demo") {
        totalCurrency = 'USD'

    } else {
        const currency = clientInfo.balance?.total[activeTab === "real" ? "deriv" : "deriv_demo"].currency
        totalCurrency = currency;
    }


    React.useEffect(() => {
        function handleClickOutside(event) {
            if (container_ref.current && !container_ref?.current?.contains(event.target)) {
                setIsAccDropdownOpen(false)
            }
        }
        window.addEventListener("click", handleClickOutside);

        
        return () => window.removeEventListener("click", handleClickOutside);
    })

    return (
        <div className="account__switcher-dropdown-wrapper show" ref={dropdownRef}>
            <div id="account__switcher-dropdown" className="account__switcher-dropdown" ref={container_ref}>

                <div className="account__switcher-container">
                    <ul className="account__switcher-tabs">
                        <li className={`account__switcher-tab ${activeTab === "real" ? "ui-tabs-active" : ""}`}
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
                        clientInfo={clientInfo}
                        isActive={activeTab === "real"}
                        setIsAccDropdownOpen={setIsAccDropdownOpen}
                    />
                    <TabContent
                        tab="demo"
                        clientInfo={clientInfo}
                        isActive={activeTab === "demo"}
                        setIsAccDropdownOpen={setIsAccDropdownOpen}
                    />
                </div>
                <Separator />
                <div className="account__switcher-total">
                    <div className="account__switcher-total-balance">
                        <span className="account__switcher-total-balance-text">{translate("Total assets")}</span>
                        <span className="account__switcher-total-balance-amount account__switcher-balance">
                            {total}
                            <span className="symbols">&nbsp;{totalCurrency}</span>
                        </span>
                    </div>
                    <div className="account__switcher-total-text">{translate("Total assets in your Deriv accounts")}</div>
                </div>
                <Separator />
                <div
                    id="deriv__logout-btn"
                    className="account__switcher-logout logout"
                    onClick={() => { globalObserver.emit('ui.logout') }}
                >
                    <span className="account__switcher-logout-text">{translate("Log out")}</span>
                    <img className="account__switcher-logout-icon logout-icon" src="image/deriv/ic-logout.svg" />
                </div>
            </div>
        </div>
    )
});

export default AccountDropdown;
