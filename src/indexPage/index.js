import React from 'react';
import { render } from 'react-dom';
import endpoint from './endpoint';
import Logo from './react-components/logo.jsx';
import Footer from './react-components/footer.jsx';
import { oauthLogin } from '../common/appId';
import { isEuCountry, showHideEuElements } from '../common/footer-checks';
import GTM from '../common/gtm';
import { load as loadLang, showBanner } from '../common/lang';
import { moveToDeriv } from '../common/utils/utility';
import { get as getStorage, set as setStorage, remove, getTokenList } from '../common/utils/storageManager';
import { createUrl, isBinaryDomain, parseQueryString, serialize } from '../common/utils/tools';
import '../common/binary-ui/dropdown';
import BotLanding from './react-components/bot-landing';
import BinaryLanding from './react-components/binary-landing';

const today = new Date().getTime();
// eslint-disable-next-line one-var
const oneMilliSec = 1000;
const sevenDays = 7;
const oneMinute = 60;
const oneDay = 24;

export const elements = ['#notification-banner', '#main', '#footer', '#header', '#topbar'];
// eslint-disable-next-line one-var
export const bannerToken = getStorage('setDueDateForBanner');

// eslint-disable-next-line arrow-body-style
export const expirationDate = () => {
    return today + oneMilliSec * oneMinute * oneMinute * oneDay * sevenDays;
};

export const calcSetTimeoutValueBanner = expirationDate() - new Date().getTime();

// eslint-disable-next-line import/no-mutable-exports
export let timerForBanner;

const checkifBotRunning = () => {
    if (document.getElementById('runButton').style.display === 'none') {
        return true;
    }
    return false;
};
let Component, dynamicRoutePathanme;
export const getComponent = () => {
    if (window.location.pathname === '/movetoderiv.html') {
        Component = <BinaryLanding />;
        dynamicRoutePathanme = 'movetoderiv';
    } else {
        Component = <BotLanding />;
        dynamicRoutePathanme = 'bot-landing';
    }
    return {
        Component,
        dynamicRoutePathanme,
    };
};
export const setTimeOutBanner = route => {
    let bannerDisplayed;
    const qs = parseQueryString();
    // eslint-disable-next-line consistent-return
    timerForBanner = setTimeout(() => {
        if (
            (route === 'index' && !!bannerDisplayed === false) ||
            (route === 'views' && checkifBotRunning() === false)
        ) {
            const getDefaultPath = window.location.href.replace(/\/bot(\.html)?/, serialize(qs));
            window.location.replace(getDefaultPath);
            renderBanner();
        } else if (
            (route === 'index' && !!bannerDisplayed === true) ||
            (route === 'views' && checkifBotRunning() === true)
        ) {
            remove('setDueDateForBanner');
            setStorage('setDueDateForBanner', expirationDate());
            return false;
        }
    }, calcSetTimeoutValueBanner);
};

export const renderBanner = () => {
    if (window.location.pathname.indexOf('/bot') === -1 || window.location.pathname === '/movetoderiv.html') {
        getComponent();
        render(Component, document.getElementById(dynamicRoutePathanme));
        if (dynamicRoutePathanme === 'bot-landing') {
            setStorage('setDueDateForBanner', expirationDate());
        }
        elements.map(elem => document.querySelector(elem).classList.add('hidden'));
        document.getElementById(dynamicRoutePathanme).classList.remove('hidden');
        document.getElementById('bot-main').classList.remove('hidden');
        document.getElementById('topbar').classList.remove('hidden');
        $('.barspinner').hide();
    }
};

// eslint-disable-next-line consistent-return
const renderElements = () => {
    // eslint-disable-next-line one-var, no-unused-vars
    getComponent();
    setTimeOutBanner('index');
    $('.barspinner').show();

    if (!bannerToken) {
        if (window.location.pathname.indexOf('/bot') === -1) {
            renderBanner();
        }
    } else {
        if (today > bannerToken) {
            remove('setDueDateForBanner');
            renderBanner();
            return false;
        }
        if (window.location.pathname.indexOf('/bot') === -1) {
            render(isBinaryDomain && <Logo />, document.getElementById('binary-logo'));
            render(<Footer />, document.getElementById('footer'));
            isEuCountry().then(isEu => showHideEuElements(isEu));
            showBanner();
            $('#shop-url').attr(
                'href',
                createUrl({ subdomain: 'shop', path: 'collections/strategies', isNonBotPage: true })
            );
            elements.map(elem => document.querySelector(elem).classList.remove('hidden'));
            document.getElementById(dynamicRoutePathanme).classList.add('hidden');
        }
        document.getElementById('bot-main').classList.remove('hidden');
        setTimeout(() => {
            $('.barspinner').hide();
        }, 2000);
    }
};

const loginCheck = () => {
    if (endpoint()) return;
    moveToDeriv();
    if (window.location.pathname.indexOf('/bot') === -1) {
        loadLang();
    }
    $('.show-on-load').show();
    if (bannerToken && window.location.pathname !== '/movetoderiv.html') {
        if (getTokenList().length) {
            if (!window.location.pathname.includes('/bot')) {
                window.location.pathname = `${window.location.pathname.replace(/\/+$/, '')}/bot.html`;
            }
            document.getElementById('bot-main').classList.remove('hidden');
        } else {
            oauthLogin(() => {
                $('.barspinner').hide();
                renderElements();
                GTM.init();
            });
        }
    } else {
        setTimeout(() => {
            renderBanner();
        }, 0);
    }
};

loginCheck();

if (!isBinaryDomain) {
    document.getElementsByClassName('half-width bottom-image puzzle-logo')[0].remove();
    document.getElementsByClassName('dbot-banner__separator')[0].remove();
    document.getElementsByClassName('half-width top-image')[0].remove();
}
