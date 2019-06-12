/* eslint-disable import/no-extraneous-dependencies */
import 'jquery-ui/ui/widgets/dialog';
import 'notifyjs-browser';
import View from './View';
import '../../common/binary-ui/dropdown';
import GTM from '../../common/gtm';

$.ajaxSetup({
    cache: false,
});

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
