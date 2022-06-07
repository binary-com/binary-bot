import React from 'react';
import ReactDOM from 'react-dom';
import endpoint from './endpoint';
import Logo from './react-components/logo.jsx';
import Footer from './react-components/footer.jsx';
import { oauthLogin } from '../common/appId';
import { isEuCountry, showHideEuElements } from '../common/footer-checks';
import GTM from '../common/gtm';
import { load as loadLang, showBanner } from '../common/lang';
import { moveToDeriv } from '../common/utils/utility';
import { get as getStorage, set as setStorage, remove, getTokenList } from '../common/utils/storageManager';
import { createUrl } from '../common/utils/tools';
import '../common/binary-ui/dropdown';
import BotLanding from './react-components/bot-landing';
import ModalComponent from './react-components/bot-landing/ModalComponent.jsx';

const today = new Date().getTime();
// eslint-disable-next-line one-var
const twentyOneDays = 21,
    fiveMinutes = 300,
    oneMilliSec = 1000,
    oneMinute = 60,
    oneDay = 24;

const elementsPopup = ['.bot-landing-alert-draggable-dialog', '#bot-landing-alert-popup'];
const elements = ['#notification-banner', '#main', '#footer', '#header', '#topbar'];
// eslint-disable-next-line one-var
export const bannerToken = getStorage('setDueDateForBanner');
export const popupToken = getStorage('setPopupToken');

// eslint-disable-next-line arrow-body-style
export const expirationDate = () => {
    return today + oneMilliSec * oneMinute * oneMinute * oneDay * twentyOneDays;
};
// eslint-disable-next-line arrow-body-style
export const setPopupToken = () => {
    return expirationDate() - fiveMinutes;
};
export const calcSetTimeoutValue = setPopupToken() - new Date().getTime();
export const calcSetTimeoutValueBanner = expirationDate() - new Date().getTime();

// eslint-disable-next-line import/prefer-default-export
export const renderPopup = type => {
    ReactDOM.render(<ModalComponent />, document.getElementById('bot-landing-alert-popup'));
    // eslint-disable-next-line no-unused-vars
    // eslint-disable-next-line array-callback-return
    elementsPopup.map(elem => {
        if (type === 'open') {
            document.querySelector(elem).classList.add('open');
        } else {
            document.querySelector(elem).classList.remove('open');
        }
    });
};
let isRunning;
const checkifBotRunning = () => {
    if (document.getElementById('runButton').style.display === 'none') {
        isRunning = true;
    } else {
        isRunning = false;
    }
    return isRunning;
};
// eslint-disable-next-line import/no-mutable-exports
export const setTimeOutBanner = route => {
    let bannerDisplayed;
    if (route === 'index') {
        bannerDisplayed = document.getElementById('bot-landing').classList.contains('hidden');
    }
    // eslint-disable-next-line import/no-mutable-exports
    // eslint-disable-next-line consistent-return
    setTimeout(() => {
        checkifBotRunning();
        if ((route === 'index' && !bannerDisplayed) || (route === 'views' && !isRunning)) {
            const getqueryParameter = document.location.search;
            const getDefaultPath = window.location.href.replace('/bot.html', getqueryParameter);
            window.location.replace(getDefaultPath);
            renderBanner();
        } else if ((route === 'index' && bannerDisplayed) || (route === 'views' && isRunning)) {
            remove('setDueDateForBanner');
            setStorage('setDueDateForBanner', setPopupToken());
            return false;
        }
    }, calcSetTimeoutValueBanner);
};

export const setTimeOutPopup = route => {
    let bannerDisplayed;
    if (route === 'index') {
        bannerDisplayed = document.getElementById('bot-landing').classList.contains('hidden');
    }
    // render popup 5min before user see the page in 3 weeks
    // eslint-disable-next-line consistent-return
    setTimeout(() => {
        checkifBotRunning();
        if ((route === 'index' && !bannerDisplayed) || (route === 'views' && !isRunning)) {
            renderPopup('open');
        } else if ((route === 'index' && bannerDisplayed) || (route === 'views' && isRunning)) {
            remove('setPopupToken');
            setStorage('setPopupToken', setPopupToken());
            return false;
        }
    }, calcSetTimeoutValue);
};

const renderBanner = () => {
    ReactDOM.render(<ModalComponent />, document.getElementById('bot-landing-alert-popup'));
    ReactDOM.render(<BotLanding />, document.getElementById('bot-landing'));
    setStorage('setDueDateForBanner', expirationDate());
    setStorage('setPopupToken', setPopupToken());
    elements.map(elem => document.querySelector(elem).classList.add('hidden'));
    document.getElementById('bot-landing').classList.remove('hidden');
    document.getElementById('bot-main').classList.remove('hidden');
    $('.barspinner').hide();
};

// eslint-disable-next-line consistent-return
const renderElements = () => {
    setTimeOutPopup('index');
    setTimeOutBanner('index');
    $('.barspinner').show();
    if (!bannerToken) {
        if (window.location.href.indexOf('bot.html') === -1) {
            renderBanner();
        }
    } else {
        if (today > bannerToken) {
            remove('setDueDateForBanner');
            renderBanner();
            return false;
        }
        if (window.location.href.indexOf('bot.html') === -1) {
            ReactDOM.render(<Logo />, document.getElementById('binary-logo'));
            ReactDOM.render(<Footer />, document.getElementById('footer'));
            isEuCountry().then(isEu => showHideEuElements(isEu));
            showBanner();
            $('#shop-url').attr(
                'href',
                createUrl({ subdomain: 'shop', path: 'collections/strategies', isNonBotPage: true })
            );
            elements.map(elem => document.querySelector(elem).classList.remove('hidden'));
            document.getElementById('bot-landing').classList.add('hidden');
        }
        document.getElementById('bot-main').classList.remove('hidden');
        $('.barspinner').hide();
    }
};

const loginCheck = () => {
    if (endpoint()) return;
    moveToDeriv();
    loadLang();
    if (bannerToken) {
        if (getTokenList().length) {
            if (!window.location.pathname.includes('/bot.html')) {
                window.location.pathname = `${window.location.pathname.replace(/\/+$/, '')}/bot.html`;
            }
            document.getElementById('bot-main').classList.remove('hidden');
        } else {
            oauthLogin(() => {
                $('.show-on-load').show();
                $('.barspinner').hide();
                renderElements();
                GTM.init();
            });
        }
    } else {
        setTimeout(() => {
            renderBanner();
        }, 2000);
    }
};

loginCheck();
