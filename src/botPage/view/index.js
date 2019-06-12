/* eslint-disable import/no-extraneous-dependencies */
import 'jquery-ui/ui/widgets/dialog';
import 'notifyjs-browser';
import View from './View';
import '../../common/binary-ui/dropdown';
import GTM from '../../common/gtm';

$.ajaxSetup({
    cache: false,
});

// Should stay below the window._trackJs config
//require('trackjs');

const view = new View();

view.initPromise.then(() => {
    $('.show-on-load').show();
    $('.barspinner').hide();
    window.dispatchEvent(new Event('resize'));
    GTM.init();
    /*trackJs.configure({
        userId: $('.account-id')
            .first()
            .text(),
    });*/
});
