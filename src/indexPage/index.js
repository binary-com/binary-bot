import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Footer from './react-components/footer.jsx';
import { oauthLogin } from '../common/appId';
import { load as loadLang, getLanguage } from '../common/lang';
import '../common/binary-ui/dropdown';
import endpoint from './endpoint';
import { isEuCountry, test as testToken } from '../common/footer-checks';
import { getTokenList } from '../common/utils/storageManager';

const loginCheck = () => {
    if (endpoint()) return;
    if (getTokenList().length) {
        window.location.pathname = `${window.location.pathname.replace(/\/+$/, '')}/bot.html`;
    } else {
        loadLang();
        oauthLogin(() => {
            $('.show-on-load').show();
            $('.barspinner').hide();
        });
    }
};

const showHideEuElements = isEu => {
    $('.eu-hide').attr('style', `display: ${isEu ? 'none' : 'block'} !important`);
    $('.eu-show').attr('style', `display: ${isEu ? 'block' : 'none'} !important`);
};

const showWarning = isEu => {
    const accounts = getTokenList();
    let shouldShowWarning = false;

    if (accounts.length) {
        shouldShowWarning = accounts[0].landing_company_name === 'maltainvest' || accounts[0].is_virtual;
    } else {
        shouldShowWarning = isEu;
    }

    $('.eu-only').attr('style', `display: ${shouldShowWarning ? 'block' : 'none'} !important`);
};

loginCheck();

window.onload = () => {
    ReactDOM.render(<Footer />, document.getElementById('footer'));

    isEuCountry().then(isEu => {
        showHideEuElements(isEu);
        showWarning(isEu);
    });
};
