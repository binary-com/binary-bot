import React from "react";
import { translate } from "../../../../../../common/utils/tools";

const TabContent = ({ tab, tokenList, isActive}) => {    
    const [isAccordionOpen, setIsAccordionOpen] = React.useState(true);
    const isReal = tab === "real";

    return (
        <div className={`account__switcher-tabs-content ${isActive ? "" : "hide"}`} >
            <div className="account__switcher-accordion">
                <h3 className="ui-accordion-header ui-state-default" onClick={() => setIsAccordionOpen(!isAccordionOpen)}>
                    <div className="account__switcher-accordion-header-text">
                        <span>{translate(isReal ? "Deriv Accounts" : "Demo Accounts")}</span>
                        <img className={`header__expand ${isAccordionOpen ? "open" : ""}`} src="image/deriv/ic-chevron-down.svg" />
                    </div>
                </h3>
                <div className={`account__switcher-list ${isAccordionOpen ? "open" : ""}`}>
                    {tokenList.map((acc, index) => isReal !== Boolean(acc.loginInfo.is_virtual) && (
                            <div 
                                key={acc.accountName} 
                                className={`account__switcher-acc ${index === 0 ? "account__switcher-acc--active" : ""}`}
                                value={acc.token}
                            >
                                <img 
                                    src={`image/deriv/currency/ic-currency-${
                                        acc.loginInfo.is_virtual ? "virtual" : acc.loginInfo.currency.toLowerCase()
                                    }.svg`} 
                                />
                                <span>
                                    {acc.loginInfo.is_virtual ? translate("Demo") : acc.loginInfo.currency}
                                    <div className="account__switcher-loginid">{acc.loginInfo.loginid}</div>
                                </span>
                                <span className="account__switcher-balance">
                                    {acc.loginInfo.balance?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                    <span className="symbols">&nbsp;{acc.loginInfo.currency}</span>
                                </span>
                            </div>
                        )
                    )}
                    {isReal && (
                        <a rel="noopener noreferrer" className="account__switcher-add">
                            <img className="account__switcher-add-icon" src="image/deriv/ic-add-circle.svg" />
                            <span className="account__switcher-add-text">{translate("Add Deriv account")}</span>
                        </a>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TabContent;
