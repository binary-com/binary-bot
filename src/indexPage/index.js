import React from 'react';
import ReactDOM from 'react-dom';
import endpoint from './endpoint';
import Logo from './react-components/logo.jsx';
import Footer from './react-components/footer.jsx';
import { oauthLogin, generateLiveApiInstance } from '../common/appId';
import '../common/binary-ui/dropdown';
import { load as loadLang } from '../common/lang';
import { getTokenList } from '../common/utils/storageManager';
import { createUrl } from '../common/utils/tools';

const init = async () => {
    if (endpoint()) {
        return;
    }

    if (getTokenList().length) {
        window.location.pathname = `${window.location.pathname.replace(/\/+$/, '')}/bot.html`;
        return;
    }

    const api = generateLiveApiInstance();

    let isEurope = false;
    let isIndonesia = false;

    try {
        const {
            website_status: { clients_country: clientsCountry },
        } = await api.getWebsiteStatus();

        if (clientsCountry === 'id') {
            isIndonesia = true;
        } else {
            const {
                landing_company: { financial_company: financialCompany, gaming_company: gamingCompany },
            } = await api.getLandingCompany({ landing_company: clientsCountry });

            const financialShortcode = financialCompany ? financialCompany.shortcode : false;
            const gamingShortcode = gamingCompany ? gamingCompany.shortcode : false;

            if (financialShortcode || gamingShortcode) {
                const euShortcodeRegex = new RegExp('^(maltainvest|malta|iom)$');
                isEurope = euShortcodeRegex.test(financialShortcode) || euShortcodeRegex.test(gamingShortcode);
            } else {
                isEurope = /^mt$/.test(clientsCountry);
            }
        }
    } catch (e) {
        // Do nothing.
    }

    loadLang();
    oauthLogin(() => {
        $('.show-on-load').show();
        $('.barspinner').hide();
        renderElements(isEurope, isIndonesia);
    });
};

const renderElements = (isEurope, isIndonesia) => {
    ReactDOM.render(<Logo />, document.getElementById('binary-logo'));
    ReactDOM.render(<Footer isIndonesia={isIndonesia} />, document.getElementById('footer'));

    $('.eu-hide').attr('style', `display: ${isEurope ? 'none' : 'block'} !important`);
    $('.eu-show, .eu-only').attr('style', `display: ${isEurope ? 'block' : 'none'} !important`);

    $('#shop-url').attr(
        'href',
        createUrl({
            subdomain   : 'shop',
            path        : 'collections/strategies',
            isNonBotPage: true,
        })
    );
};

init();
