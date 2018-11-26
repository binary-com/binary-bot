import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Logo from './react-components/logo.jsx';
import Footer from './react-components/footer.jsx';
import { oauthLogin } from '../common/appId';
import { load as loadLang } from '../common/lang';
import '../common/binary-ui/dropdown';
import endpoint from './endpoint';
import isEuCountry from '../common/footer-checks';
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
    $('.eu-show, .eu-only').attr('style', `display: ${isEu ? 'block' : 'none'} !important`);
};

loginCheck();

window.onload = () => {
    ReactDOM.render(<Logo />, document.getElementById('binary-logo'));
    ReactDOM.render(<Footer />, document.getElementById('footer'));
    isEuCountry().then(isEu => {
        showHideEuElements(isEu);
    });
};
