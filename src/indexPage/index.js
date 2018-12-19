import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Logo from './react-components/logo.jsx';
import Footer from './react-components/footer.jsx';
import { getTokenList } from '../common/utils/storageManager';
import { oauthLogin, getExtension } from '../common/appId';
import { isProduction } from '../common/utils/tools';
import { load as loadLang } from '../common/lang';
import '../common/binary-ui/dropdown';
import endpoint from './endpoint';
import isEuCountry from '../common/footer-checks';

const renderElements = () => {
    const showHideEuElements = isEu => {
        $('.eu-hide').attr('style', `display: ${isEu ? 'none' : 'block'} !important`);
        $('.eu-show, .eu-only').attr('style', `display: ${isEu ? 'block' : 'none'} !important`);
    };
    ReactDOM.render(<Logo />, document.getElementById('binary-logo'));
    ReactDOM.render(<Footer />, document.getElementById('footer'));
    isEuCountry().then(isEu => {
        showHideEuElements(isEu);
    });
    const domainExtension = getExtension();
    const shopUrl = `https://shop.binary.${
        isProduction() ? (domainExtension === 'bot' ? 'com' : domainExtension) : 'com'
    }/collections/strategies`;
    $('#shop-url').attr('href', shopUrl);
};

const loginCheck = () => {
    if (endpoint()) return;
    if (getTokenList().length) {
        window.location.pathname = `${window.location.pathname.replace(/\/+$/, '')}/bot.html`;
    } else {
        loadLang();
        oauthLogin(() => {
            $('.show-on-load').show();
            $('.barspinner').hide();
            renderElements();
        });
    }
};

loginCheck();
