import React from 'react';
import { render } from 'react-dom';
import { parseQueryString } from '../common/utils/tools';
import { set as setStorage, get as getStorage, remove } from '../common/utils/storageManager';
import { setCookieLanguage } from '../common/utils/cookieManager';
import { supportedLanguages, translate, init } from './i18n';
import { getClientsCountryByIP } from './utils/utility';
import BotLanding from '../indexPage/react-components/bot-landing';

const elements = ['#notification-banner', '#main', '#footer', '#header'];
export const getLanguage = () => {
    const queryLang = parseQueryString().l;
    const lang = queryLang in supportedLanguages ? queryLang : getStorage('lang') || 'en';
    setStorage('lang', lang);
    setCookieLanguage(lang);
    return lang;
};

const addUiLang = () => {
    $('[data-i18n-text]').each(function each() {
        const el = $(this);
        const contents = el.contents();
        el.text(translate($(this).attr('data-i18n-text'))).append(contents);
    });

    document.querySelectorAll('[data-i18n-title]').forEach(titleNode => {
        titleNode.setAttribute('title', translate(titleNode.getAttribute('data-i18n-title')));
    });
};

export const load = () => {
    if (typeof $ !== 'function') return; // Adding this check to skip unit test
    const lang = getLanguage();

    $('#select_language li:not(:first)').click(function click() {
        const newLang = $(this).attr('class');
        if (
            document.getElementById('bot-landing') !== null &&
            document.getElementById('bot-landing') !== undefined &&
            document.getElementById('bot-landing').classList.contains('hidden') === false
        ) {
            remove('setDueDateForBanner');
            render(<BotLanding />, document.getElementById('bot-landing'));
            elements.map(elem => document.querySelector(elem).classList.add('hidden'));
            document.getElementById('bot-landing').classList.remove('hidden');
            document.getElementById('bot-main').classList.remove('hidden');
            document.location.search = `l=${newLang}`;
            $('.barspinner').hide();
        } else {
            document.location.search = `l=${newLang}`;
        }
    });

    $('.language').text(
        $(`.${lang}`)
            .hide()
            .text()
    );

    $('.actual_flag').text(`${lang}`);
    $('.language_background_flag').addClass(`${lang}_flag_mtd`);

    if (lang === 'ach') {
        // eslint-disable-next-line no-underscore-dangle
        window._jipt = [['project', 'binary-bot']];
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `${document.location.protocol}//cdn.crowdin.com/jipt/jipt.js`;
        $('body').append(script);
    }

    init(lang);

    addUiLang();
};

export const showBanner = async () => {
    const location = await getClientsCountryByIP();

    if (getLanguage() === 'pt' || location === 'br') {
        document.querySelectorAll('.pt-show').forEach(el => {
            el.classList.remove('invisible');
        });
        // TODO: Whenever banners for all languages were added remove else part of the condition.
    } else {
        document.querySelectorAll('.any-show').forEach(el => {
            el.classList.remove('invisible');
        });
    }
};

export const getLanguageBase = url => {
    const lang = getLanguage();
    console.log(url + lang, 'language');
    return url + lang;
};
