import React from 'react';
import { isEuCountry, isUKCountry } from '../../../common/footer-checks';
import { getTokenList, get as getStorage } from '../../../common/utils/storageManager';
import { AppConstants } from '../../../common/appId';
import { translate } from '../../../common/i18n';
import { showBanner } from '../../../common/lang';

const MovingBanner = ({ api }) => {
    const [showMovingBanner, setshowMovingBanner] = React.useState(false);
    const tokenList = getTokenList();

    React.useEffect(() => {
        checkForshowMovingBanner();
    }, []);

    const getActiveToken = activeToken => {
        const activeTokenObject = tokenList.filter(tokenObject => tokenObject.token === activeToken);
        return activeTokenObject.length ? activeTokenObject[0] : tokenList[0];
    };

    const checkForshowMovingBanner = () => {
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
                setshowMovingBanner(true);
                return;
            }
            if (
                (landingCompanyName.includes('malta') || landingCompanyName.includes('iom')) &&
                activeToken.loginInfo.landing_company_name === 'maltainvest'
            ) {
                setshowMovingBanner(true);
                return;
            }
        }
        showBanner();
    };

    const isEuUK = checkLoggedin => {
        isEuCountry(api, checkLoggedin).then(isEu => {
            if (isEu) {
                setshowMovingBanner(true);
                return;
            }
            isUKCountry(api, checkLoggedin).then(isUk => {
                if (isUk) {
                    setshowMovingBanner(true);
                    return;
                }
                showBanner();
            });
        });
    };

    return (
        showMovingBanner &&
        document
            .getElementsByClassName('dbot-banner')[0]
            .parentNode.removeChild(document.getElementsByClassName('dbot-banner')[0]) && (
            <div className="moving-banner">
                <div class="moving-banner__separator" />
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
