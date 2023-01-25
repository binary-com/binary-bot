/* eslint-disable import/no-extraneous-dependencies */
import 'jquery-ui/ui/widgets/dialog';
import 'notifyjs-browser';
import View from './View';
import '../../common/binary-ui/dropdown';
import Elevio from '../../common/elevio';
import GTM from '../../common/gtm';
import { isBinaryDomain, isProduction } from '../../common/utils/tools';

$.ajaxSetup({
    cache: false,
});

// eslint-disable-next-line no-underscore-dangle
window._trackJs = {
    token      : process.env.TRACKJS_TOKEN,
    application: 'binary-bot',
    enabled    : isProduction(),
    console    : {
        display: false,
    },
};

// Should stay below the window._trackJs config
require('trackjs');

const view = new View();

view.initPromise.then(() => {
    $('.show-on-load').show();
    $('.barspinner').hide();
    window.dispatchEvent(new Event('resize'));
    Elevio.init();
    GTM.init();
    if (trackJs) {
        trackJs.configure({
            userId: $('.account-id')
                .first()
                .text(),
        });
    }
});

window.onload = () => {
    if (document.readyState === 'complete') {
        if (!isBinaryDomain) {
            document.getElementsByClassName('dbot-banner eu-hide')[0].remove();
            document.getElementById('logo').remove();
        }
    }
};
