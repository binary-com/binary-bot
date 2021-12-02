import React from 'react';
import { translate } from '../../common/i18n';
import { isEuCountry, isUKCountry } from '../../common/footer-checks';
import { getTokenList, get as getStorage } from '../../common/utils/storageManager';
import { AppConstants } from '../../common/appId';

const NotificationBanner = ({ api }) => {
    const [showBanner, setShowBanner] = React.useState(false);
    const tokenList = getTokenList();

    React.useEffect(() => {
        checkForShowBanner();
    }, []);

    const getActiveToken = activeToken => {
        const activeTokenObject = tokenList.filter(tokenObject => tokenObject.token === activeToken);
        return activeTokenObject.length ? activeTokenObject[0] : tokenList[0];
    };

    const checkForShowBanner = () => {
        if (!tokenList.length) {
            isEuUK(api, true);
            return;
        }
        const landingCompanyName = tokenList.map(token => token.loginInfo.landing_company_name);
        const activeToken = getActiveToken(tokenList, getStorage(AppConstants.STORAGE_ACTIVE_TOKEN));

        if (landingCompanyName.length === 1 && landingCompanyName.includes('virtual')) {
            isEuUK(false);
            return;
        }
        if (landingCompanyName.includes('maltainvest') && landingCompanyName.includes('virtual')) {
            if (landingCompanyName.length === 2) {
                setShowBanner(true);
                return;
            }
            if (
                (landingCompanyName.includes('malta') || landingCompanyName.includes('iom')) &&
                activeToken.loginInfo.landing_company_name === 'maltainvest'
            ) {
                setShowBanner(true);
            }
        }
    };

    const isEuUK = checkLoggedin => {
        isEuCountry(api, checkLoggedin).then(isEu => {
            if (isEu) {
                setShowBanner(true);
                return;
            }
            isUKCountry(api, checkLoggedin).then(isUk => {
                setShowBanner(isUk);
            });
        });
    };

    return (
        showBanner && (
            <div className="notification-banner notification-banner-welcome">
                <img src={'image/notification-banner-icon-left.svg'} />
                <div className="notification-banner__orange-hexagon"></div>
                <div className="notification-banner__content">
                    <p className="notification-banner__content_header">
                        {translate('Binary.com is moving to Deriv')}
                    </p>
                    <p className="notification-banner__content_text">
                        {translate('Start using Deriv with your Binary.com email and password.')}
                    </p>
                </div>
                <a
                    className="notification-banner__content_button notification-banner__content_button-welcome"
                    href="http://deriv.com/"
                >
                    {translate('Trade on Deriv')}
                </a>
            </div>
        )
    );
};

export default NotificationBanner;
