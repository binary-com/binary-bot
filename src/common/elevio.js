import { generateLiveApiInstance } from './appId';
// import { getLanguage } from '../common/lang';
import { getTokenList } from './utils/storageManager';
import { translate } from '../common/i18n';
import { getLanguage } from './lang';

const Elevio = (() => {
    const elShellId = 'elevio-shell';
    let elShell;
    let elBtnLabel;
    const accountId = '5bbc2de0b7365';
    const elevioScript = `https://cdn.elev.io/sdk/bootloader/v4/elevio-bootloader.js?cid=${accountId}`;

    const init = () => {
        elShell = document.getElementById(elShellId);
        elBtnLabel = elShell.querySelector('span.text');
        elBtnLabel.innerText = translate('NEED HELP?');
        elShell.classList.remove('invisible');
        elShell.addEventListener('click', () => injectElevio(true));
    };

    const injectElevio = (isOpen = false) => {
        window._elev = {}; // eslint-disable-line no-underscore-dangle
        window._elev.account_id = accountId; // eslint-disable-line no-underscore-dangle

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = 1;
        script.src = elevioScript;
        script.id = 'loaded-elevio-script';
        document.body.appendChild(script);

        window._elev.q = []; // eslint-disable-line no-underscore-dangle
        window._elev.on = (z, y) => {
            // eslint-disable-line no-underscore-dangle
            window._elev.q.push([z, y]); // eslint-disable-line no-underscore-dangle
        };

        script.onload = () => loadElevio(isOpen);
    };

    const loadElevio = (isOpen = false) => {
        if (!window._elev) return; // eslint-disable-line no-underscore-dangle

        // eslint-disable-next-line no-underscore-dangle
        window._elev.on('widget:opened', () => {
            if (localStorage.getItem('seenWhatsBinaryBot')) {
                window._elev.open(); // eslint-disable-line no-underscore-dangle
            } else {
                localStorage.setItem('seenWhatsBinaryBot', true);
                window._elev.openArticle(90); // eslint-disable-line no-underscore-dangle
            }
        });

        // eslint-disable-next-line no-underscore-dangle
        window._elev.on('load', elev => {
            const availableLanguages = ['en', 'es', 'id', 'pt', 'ru'];
            const currentLanguage = getLanguage();
            if (availableLanguages.includes(currentLanguage)) {
                elev.setLanguage(currentLanguage);
            } else {
                elev.setLanguage('en');
            }

            elev.setSettings({
                disablePushState: true,
                page_url        : `${document.location.protocol}//${document.location.hostname}${document.location.pathname}`,
            });
            setUserInfo(elev);
            setTranslations(elev);

            if (isOpen) {
                elev.open();
            }
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
