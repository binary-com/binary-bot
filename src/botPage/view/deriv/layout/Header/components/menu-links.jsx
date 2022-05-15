import React from 'react';
import { generateDerivLink } from "../../../utils";
import { translate } from '../../../../../../common/utils/tools';

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
                <img id="cashier_icon" className="header__icon-text" src="image/deriv/ic-cashier.svg" />
                {translate("Cashier")}
            </span>
        </a>
    </div>
);

export default MenuLinks; 
