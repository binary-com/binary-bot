import RenderHTML from 'react-render-html';
import { TrackJS } from 'trackjs';
import { translate as i18nTranslate } from '../../common/i18n';
import { getLanguage } from '../../common/lang';
import AppIdMap from '../../common/appIdResolver';

export const MAX_MOBILE_WIDTH = 813;

export const parseQueryString = () => {
    if (typeof window === 'undefined') {
        return {};
    }
    const str = window.location.search;
    const objURL = {};
    str.replace(new RegExp('([^?=&]+)(=([^&]*))?', 'g'), (a0, a1, a2, a3) => {
        objURL[a1] = a3;
    });
    return objURL;
};

export const getObjectValue = obj => obj[Object.keys(obj)[0]];

export const getUTCTime = date => {
    const dateObject = new Date(date);
    return `${`0${dateObject.getUTCHours()}`.slice(-2)}:${`0${dateObject.getUTCMinutes()}`.slice(
        -2
    )}:${`0${dateObject.getUTCSeconds()}`.slice(-2)}`;
};

export const durationToSecond = duration => {
    const parsedDuration = duration.match(/^([0-9]+)([stmhd])$/);
    if (!parsedDuration) {
        return 0;
    }
    const durationValue = parseFloat(parsedDuration[1]);
    const durationType = parsedDuration[2];
    if (durationType === 's') {
        return durationValue;
    }
    if (durationType === 't') {
        return durationValue * 2;
    }
    if (durationType === 'm') {
        return durationValue * 60;
    }
    if (durationType === 'h') {
        return durationValue * 60 * 60;
    }
    if (durationType === 'd') {
        return durationValue * 60 * 60 * 24;
    }
    return 0;
};

export const isProduction = () => document.location.hostname.replace(/^www./, '') in AppIdMap.production;

export const createUrl = options => {
    const getOption = property => Object.prototype.hasOwnProperty.call(options, property) && options[property];
    const language = getOption('addLanguage') ? `/${getLanguage()}` : '';
    const path = getOption('path') ? `/${getOption('path')}` : '';
    const htmlExtension = getOption('addHtmlExtension') ? '.html' : '';
    const subdomain = getOption('subdomain') ? `${getOption('subdomain')}.` : 'www.';
    if (isProduction()) {
        let domainExtension = `.${getExtension()}`;
        if (getOption('isNonBotPage')) {
            switch (document.location.hostname.replace(/^www./, '')) {
                case 'bot.binary.me':
                case 'binary.bot':
                    domainExtension = '.me';
                    break;
                default:
                    domainExtension = '.com';
                    break;
            }
        }
        return `${document.location.protocol}//${subdomain}binary${domainExtension}${language}${path}${htmlExtension}`;
    }
    return `https://${subdomain}binary.com${language}${path}${htmlExtension}`;
};

export const translate = (input, params = []) => {
    if (!params.length) return i18nTranslate(input);

    const stringToBeTranslated = input.replace(/\{\$({0-9])\}/gi, '%$1');
    let translatedString = i18nTranslate(stringToBeTranslated);

    params.forEach((replacement, index) => {
        if (translatedString && typeof translatedString === 'string') {
            translatedString = translatedString.replaceAll(`\{\$${index}\}`, replacement);
        }
    });

    return RenderHTML(translatedString);
};

export const getExtension = () => {
    const host = document.location.hostname;
    const extension = host.split('.').slice(-1)[0];
    return host !== extension ? extension : '';
};

export const showSpinnerInButton = $buttonElement => {
    $buttonElement
        .html(() => {
            const barspinner = $('<div class="barspinner white" />');
            Array.from(new Array(5)).forEach((x, i) => {
                const rect = $(`<div class="rect${i + 1}" />`);
                barspinner.append(rect);
            });
            return barspinner;
        })
        .prop('disabled', true);
};

export const removeSpinnerInButton = ($buttonElement, initialText) => {
    $buttonElement.html(() => initialText).prop('disabled', false);
};

export const isMobile = () => window.innerWidth <= MAX_MOBILE_WIDTH;

export const isDesktop = () => window.innerWidth > MAX_MOBILE_WIDTH;

export const loadExternalScript = (src, async = true, defer = true) =>
    new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = async;
        script.defer = defer;
        script.onerror = reject;

        function handleLoad() {
            const load_state = this.readyState;
            if (load_state && !/loaded|complete/.test(load_state)) return;

            script.onload = null;
            script.onreadystatechange = null;
            resolve();
        }

        script.onload = handleLoad;
        script.onreadystatechange = handleLoad;

        document.head.appendChild(script);
    });

export const errLogger = (err, msg) => {
    const err_str = JSON.stringify(err);
    const err_msg = `${msg} - Error: ${err_str}`;
    console.warn(err_msg);
    if (isProduction()) TrackJS.track(err_msg);
};
