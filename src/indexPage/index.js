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

const today = new Date().getTime();
const expirationDate = today + 1000 * 60 * 60 * 24 * 21;
const elements = ['#notification-banner', '#main', '#footer', '#header', '#topbar'];

const renderBanner = () => {
    ReactDOM.render(<BotLanding />, document.getElementById('bot-landing'));
    setStorage('setDueDateForBanner', expirationDate);
    for (let i = 0; i < elements.length; i++) {
        document.querySelector(elements[i]).classList.add('hidden');
    }
    document.getElementById('bot-landing').classList.remove('hidden');
    document.getElementById('bot-main').classList.remove('hidden');
    $('.barspinner').hide();
};

const renderElements = () => {
    $('.barspinner').show();
    const temp = getStorage('setDueDateForBanner');
    if (!temp) {
        renderBanner();
    } else {
        if (today > getStorage('setDueDateForBanner')) {
            remove('setDueDateForBanner');
        }
        ReactDOM.render(<Logo />, document.getElementById('binary-logo'));
        ReactDOM.render(<Footer />, document.getElementById('footer'));
        isEuCountry().then(isEu => showHideEuElements(isEu));
        showBanner();
        $('#shop-url').attr(
            'href',
            createUrl({ subdomain: 'shop', path: 'collections/strategies', isNonBotPage: true })
        );
        for (let i = 0; i < elements.length; i++) {
            document.querySelector(elements[i]).classList.add('hidden');
        }
        document.getElementById('bot-landing').classList.add('hidden');
        $('.barspinner').hide();
    }
};

const loginCheck = () => {
    if (endpoint()) return;
    moveToDeriv();
    const temp = getStorage('setDueDateForBanner');
    if (temp) {
        if (getTokenList().length) {
            window.location.pathname = `${window.location.pathname.replace(/\/+$/, '')}/bot.html`;
            document.getElementById('bot-main').classList.remove('hidden');
        } else {
            loadLang();
            oauthLogin(() => {
                $('.show-on-load').show();
                $('.barspinner').hide();
                renderElements();
                GTM.init();
            });
        }
    } else {
        renderBanner();
    }
};

loginCheck();
