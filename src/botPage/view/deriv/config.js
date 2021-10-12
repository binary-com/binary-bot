import { translate } from '../../../common/utils//tools';

export const supportedLanguages = {
    en: 'English',
    fr: 'Français',
    id: 'Indonesia',
    pl: 'Polish',
    pt: 'Português',
    ru: 'Русский',
    zh_cn: '简体中文',
    zh_tw: '繁體中文',
    es: 'Español',
    it: 'Italiano',
    vi: 'Tiếng Việt',
};

export const platforms = [
    {
        title: 'DTrader',
        description: translate('A whole new trading experience on a powerful yet easy to use platform.'),
        link: 'https://app.deriv.com',
        logo: 'image/deriv/brand/ic-brand-dtrader.svg',
    },
    {
        title: 'DBot',
        description: translate('Automated trading at your fingertips. No coding needed.'),
        link: 'https://app.deriv.com/bot',
        logo: 'image/deriv/brand/ic-brand-dbot.svg',
    },
    {
        title: 'DMT5',
        description: translate('Trade on Deriv MetaTrader 5 (DMT5), the all-in-one FX and CFD trading platform.'),
        link: 'https://app.deriv.com/mt5',
        logo: 'image/deriv/brand/ic-brand-dmt5.svg',
    },
    {
        title: 'Deriv X',
        description: translate('Trade FX and CFDs on a customisable, easy-to-use trading platform.'),
        link: 'https://app.deriv.com/derivx',
        logo: 'image/deriv/brand/ic-brand-dxtrade.svg',
    },
    {
        title: 'SmartTrader',
        description: translate('Trade the world\'s markets with our popular user-friendly platform.'),
        link: 'https://smarttrader.deriv.com/',
        logo: 'image/deriv/brand/ic-brand-smarttrader.svg',
    },
    {
        title: 'Binary Bot',
        description: translate(
            'Our classic “drag-and-drop” tool for creating trading bots, featuring pop-up trading charts, for advanced users.'
        ),
        link: '#',
        logo: 'image/deriv/brand/ic-brand-binarybot.svg',
    },
];
