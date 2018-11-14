import RenderHTML from 'react-render-html';
import { translate as i18nTranslate } from '../../common/i18n';
import { getLanguage } from '../../common/lang';
import AppIdMap from '../../common/appIdResolver';

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

export const isProduction = () => document.location.hostname.replace(/^www./, '') in AppIdMap;

export const createUrl = (path, lang = getLanguage(), addLanguage = true, addHtmlExtension = true) => {
    const pathBit = path ? `/${path}${addHtmlExtension ? '.html' : ''}` : '';
    const languageBit = addLanguage && lang ? `/${lang}` : '';

    if (isProduction()) {
        return document.location.hostname + languageBit + pathBit;
    }
    return `https://www.binary.com${languageBit}${pathBit}`;
};

export const translate = input => {
    if (Array.isArray(input) && input.length > 0) {
        const stringToBeTranslated = input[0].replace(/\[_([0-9])\]/g, '%$1');
        let translatedString = i18nTranslate(stringToBeTranslated);

        input.slice(1).forEach((replacement, index) => {
            const regex = new RegExp(`%${index + 1}`, 'g');
            translatedString = translatedString.replace(regex, replacement);
        });
        return RenderHTML(translatedString);
    }
    return i18nTranslate(input);
};
