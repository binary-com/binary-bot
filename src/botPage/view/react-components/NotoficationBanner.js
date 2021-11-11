import React from 'react';
import { translate } from '../../../common/i18n';
import { isEuCountry, isUKCountry } from '../../../common/footer-checks';
import { getTokenList } from '../../../common/utils/storageManager';

const NotificationBanner = ({ api }) => {
    const [showBanner, setShowBanner] = React.useState(false);

    React.useEffect(() => {
        isEuCountry(api).then(isEu => {
            if (isEu) {
                setShowBanner(true);
            }
        });
        isUKCountry(api).then(isUk => {
            if (isUk) {
                setShowBanner(true);
            }
        });
        if (getTokenList().length && localStorage.getItem('landingCompany') === 'maltainvest') {
            setShowBanner(true);
        }
    }, []);

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
