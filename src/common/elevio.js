import { generateLiveApiInstance } from './appId';
// import { getLanguage } from '../common/lang';
import { getTokenList } from './utils/storageManager';
import { translate } from '../common/i18n';

const Elevio = (() => {
    const init = () => {
        if (!window._elev) return; // eslint-disable-line no-underscore-dangle
        // eslint-disable-next-line no-underscore-dangle
        window._elev.on('load', elev => {
            // const availableElevLanguages = ['es', 'id', 'pt', 'ru'];
            // const currentLanguage = getLanguage().toLowerCase();
            // if (availableElevLanguages.indexOf(currentLanguage) !== -1) {
            //     window._elev.setLanguage(currentLanguage); // eslint-disable-line no-underscore-dangle
            // }
            window._elev.setSettings({
                page_url: document.location.hostname,
            });
            setUserInfo(elev);
            setTranslations(elev);
        });
    };

    const setUserInfo = elev => {
        const tokenList = getTokenList();
        if (tokenList.length) {
            const api = generateLiveApiInstance(); // Refactor when reducing WS connections
            const activeToken = tokenList[0];
            api.authorize(activeToken.token).then(() => {
                api.send({ get_settings: 1 }).then(response => {
                    const isVirtual = activeToken.loginInfo.is_virtual;
                    const userObject = {
                        email     : response.get_settings.email,
                        first_name: isVirtual ? 'Virtual' : response.get_settings.first_name,
                        last_name : isVirtual ? activeToken.loginInfo.loginid : response.get_settings.first_name,
                        user_hash : response.get_settings.user_hash,
                    };
                    elev.setUser(userObject);
                    api.disconnect();
                });
            });
        }
    };

    // Elevio has a window._elev.logoutUser() fn, but it doesn't work
    const logoutUser = () => {
        sessionStorage.removeItem('_elevaddon-6app');
        sessionStorage.removeItem('_elevaddon-6create');
    };

    const setTranslations = elev => {
        elev.setTranslations({
            modules: {
                support: {
                    thankyou: translate('Thank you, we\'ll get back to you within 24 hours'),
                },
            },
        });
    };

    return {
        init,
        logoutUser,
    };
})();

export default Elevio;
