import React from 'react';
import { translate } from '../../../common/i18n';
import { isEuCountry, isUKCountry } from '../../../common/footer-checks';
import { getTokenList, get as getStorage } from '../../../common/utils/storageManager';
import { AppConstants } from '../../../common/appId';

const NotificationBanner = ({ api }) => {
    const [showBanner, setShowBanner] = React.useState(false);
    const tokenList = getTokenList();
    const landingCompanyName = [];

    React.useEffect(() => {
        checkForShowBanner(landingCompanyName);
    }, []);

    const getActiveToken = activeToken => {
        const activeTokenObject = tokenList.filter(tokenObject => tokenObject.token === activeToken);
        return activeTokenObject.length ? activeTokenObject[0] : tokenList[0];
    };

    const checkForShowBanner = () => {
        if (tokenList.length) {
            tokenList.map(token => landingCompanyName.push(token.loginInfo.landing_company_name));

            const activeToken = getActiveToken(tokenList, getStorage(AppConstants.STORAGE_ACTIVE_TOKEN));

            if (landingCompanyName.length === 1 && landingCompanyName.includes('virtual')) {
                isEuUK(false);
            }
            if (
                landingCompanyName.length === 2 &&
                landingCompanyName.includes('maltainvest') &&
                landingCompanyName.includes('virtual')
            ) {
                setShowBanner(true);
            }
            if (
                landingCompanyName.includes('maltainvest') &&
                landingCompanyName.includes('virtual') &&
                (landingCompanyName.includes('malta') || landingCompanyName.includes('iom'))
            ) {
                if (activeToken.loginInfo.landing_company_name === 'maltainvest') {
                    setShowBanner(true);
                }
            }
        } else {
            isEuUK(api, true);
        }
    };

    const isEuUK = checkLoggedin => {
        isEuCountry(api, checkLoggedin).then(isEu => {
            if (isEu) {
                setShowBanner(true);
            } else {
                isUKCountry(api, checkLoggedin).then(isUk => {
                    setShowBanner(isUk);
                });
            }
        });
    };

    return (
        showBanner && (
            <div className="notification-banner">
                <img src={'image/notification-banner-icon-left.svg'} />
                <div className="notification-banner__orange-hexagon"></div>
                <div className="notification-banner__content">
                    <p className="notification-banner__content_header">
                        {translate('Binary.com is moving to Deriv on 30 November')}
                    </p>
                    <p className="notification-banner__content_text">
                        {translate('Start using Deriv with your Binary.com email and password.')}
                    </p>
                </div>
                <a className="notification-banner__content_button" href="http://deriv.com/">
                    {translate('Trade on Deriv')}
                </a>
            </div>
        )
    );
};

export default NotificationBanner;
