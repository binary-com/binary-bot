import { getAppIdFallback } from './appId';
import AppIdMap from './appIdResolver';
import { getTokenList } from './utils/storageManager';

const GTM = (() => {
    const isGtmApplicable = () => Object.values(AppIdMap).includes(`${getAppIdFallback()}`);

    const init = () => {
        if (isGtmApplicable()) {
            const gtmTag =
                '(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({\'gtm.start\': new Date().getTime(),event:\'gtm.js\'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!=\'dataLayer\'?\'&l=\'+l:\'\';j.async=true;j.src= \'https://www.googletagmanager.com/gtm.js?id=\'+i+dl;f.parentNode.insertBefore(j,f); })(window,document,\'script\',\'dataLayer\',\'GTM-P97C2DZ\');';

            const script = document.createElement('script');
            script.innerHTML = gtmTag;
            document.body.appendChild(script);

            const interval = setInterval(() => {
                if (dataLayer) {
                    setVisitorId();
                    clearInterval(interval);
                }
            }, 500);
        }
    };

    const pushDataLayer = data => {
        if (isGtmApplicable() && dataLayer) {
            dataLayer.push({
                ...data,
            });
        }
    };

    const setVisitorId = () => {
        const tokenList = getTokenList();
        if (tokenList.length > 0) {
            pushDataLayer({ visitorId: tokenList[0].loginInfo.loginid });
        } else {
            pushDataLayer({ visitorId: undefined });
        }
    };

    return {
        init,
        pushDataLayer,
        setVisitorId,
    };
})();

export default GTM;
