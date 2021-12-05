import React from 'react';
import { getTokenList, get as getStorage } from '../../../common/utils/storageManager';
import { AppConstants } from '../../../common/appId';
import { translate } from '../../../common/i18n';
import { showBanner } from '../../../common/lang';
import { isEuCountry, isUKCountry } from '../../../common/utils/utility';

/* eslint-disable camelcase */
const MovingBanner = ({ api }) => {
    const [showMovingBanner, setshowMovingBanner] = React.useState(false);
    const tokenList = getTokenList();

    React.useEffect(() => {
        checkForshowMovingBanner().then(show => {
            if (show) {
                setshowMovingBanner(true);
                return;
            }
            showBanner();
        });
    }, []);

    const getActiveToken = activeToken => {
        const activeTokenObject = tokenList.filter(tokenObject => tokenObject.token === activeToken);
        return activeTokenObject.length ? activeTokenObject[0] : tokenList[0];
    };

    const checkForshowMovingBanner = async () => {
        const { website_status } = await api.send({ website_status: 1 });
        const { clients_country } = website_status;
        const residence = localStorage.getItem('residence');
        const landingCompanyName = tokenList.map(token => token.loginInfo.landing_company_name);
        const activeToken = getActiveToken(tokenList, getStorage(AppConstants.STORAGE_ACTIVE_TOKEN));

        if (!tokenList.length) {
            if (isEuCountry(clients_country) || isUKCountry(clients_country)) {
                return true;
            }
        }
        if (landingCompanyName.length === 1 && landingCompanyName.includes('virtual')) {
            if (isEuCountry(residence)) {
                // EU based on residence
                redirectToBinary();
            }
            if (isEuCountry(clients_country) || isUKCountry(clients_country)) {
                return true;
            }
        }
        if (landingCompanyName.includes('maltainvest')) {
            if (!isEuCountry(clients_country)) {
                // non EU based on ip
                redirectToBinary();
            }
            if (
                landingCompanyName.includes('virtual') &&
                (landingCompanyName.length === 2 ||
                    ((landingCompanyName.includes('malta') || landingCompanyName.includes('iom')) &&
                        activeToken.loginInfo.landing_company_name === 'maltainvest'))
            ) {
                return true;
            }
        }
        return false;
    };

    const redirectToBinary = () => {
        window.location.replace('https://binary.com/move-to-deriv');
    };

    return (
        showMovingBanner &&
        document
            .getElementsByClassName('dbot-banner')[0]
            .parentNode.removeChild(document.getElementsByClassName('dbot-banner')[0]) && (
            <div className="moving-banner">
                <div className="moving-banner__separator" />
                <img src={'image/moving-banner.svg'} />
                <p className="moving-banner__text">{translate('Binary.com is moving to Deriv')}</p>
                <a className="moving-banner__button" href="http://deriv.com/">
                    {translate('Trade on Deriv')}
                </a>
            </div>
        )
    );
};

export default MovingBanner;
