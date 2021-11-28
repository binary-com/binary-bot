import React from 'react';
import { translate } from '../../common/i18n';
import { getTokenList } from '../../common/utils/storageManager';
import { isEuCountry, isUKCountry } from '../../common/utils/utility';
import { generateLiveApiInstance } from '../../common/appId';

const NotificationBanner = () => {
    const [showBanner, setShowBanner] = React.useState(false);
    const tokenList = getTokenList();

    React.useEffect(() => {
        checkForShowBanner().then(show => {
            if(show){
                setShowBanner(true);
            }
        });
    }, []);

    const checkForShowBanner = async () => {
        const api = generateLiveApiInstance();
        const { website_status } = await api.send({ website_status: 1 });
        const { clients_country } = website_status;

        if (!tokenList.length) {
            if(isEuCountry(clients_country) || isUKCountry (clients_country)){
                return true;
            }
        }
        return false;
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
