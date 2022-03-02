import { translate } from '../../../common/utils/tools';
import { getRelatedDeriveOrigin } from './utils';

export const supportedLanguages = {
    en: 'English',
    // fr: 'Français',
    id: 'Indonesia',
    // pl: 'Polish',
    pt: 'Português',
    // ru: 'Русский',
    // zh_cn: '简体中文',
    // zh_tw: '繁體中文',
    es: 'Español',
    // it: 'Italiano',
    // vi: 'Tiếng Việt',
};

export const currencyNameMap = {
    USD: {
        display_code: 'USD',
        name: translate('US Dollar'),
        fractional_digits: 2,
    },
    AUD: {
        display_code: 'AUD',
        name: translate('Australian Dollar'),
        fractional_digits: 2,
    },
    EUR: {
        display_code: 'EUR',
        name: translate('Euro'),
        fractional_digits: 2,
    },
    GBP: {
        display_code: 'GBP',
        name: translate('Pound Sterling'),
        fractional_digits: 2,
    },
    BTC: {
        display_code: 'BTC',
        name: translate('Bitcoin'),
        fractional_digits: 8,
    },
    BUSD: {
        display_code: 'BUSD',
        name: translate('Binance USD'),
        fractional_digits: 2,
    },
    DAI: {
        display_code: 'DAI',
        name: translate('Multi-Collateral DAI'),
        fractional_digits: 2,
    },
    EURS: {
        display_code: 'EURS',
        name: translate('STATIS Euro'),
        fractional_digits: 2,
    },
    IDK: {
        display_code: 'IDK',
        name: translate('IDK'),
        fractional_digits: 0,
    },
    PAX: {
        display_code: 'PAX',
        name: translate('Paxos Standard'),
        fractional_digits: 2,
    },
    TUSD: {
        display_code: 'TUSD',
        name: translate('True USD'),
        fractional_digits: 2,
    },
    USDC: {
        display_code: 'USDC',
        name: translate('USD Coin'),
        fractional_digits: 2,
    },
    USDK: {
        display_code: 'USDK',
        name: translate('USDK'),
        fractional_digits: 2,
    },
    eUSDT: {
        display_code: 'eUSDT',
        name: translate('Tether ERC20'),
        fractional_digits: 2,
    },
    BCH: {
        display_code: 'BCH',
        name: translate('Bitcoin Cash'),
        fractional_digits: 8,
    },
    ETH: {
        display_code: 'ETH',
        name: translate('Ethereum'),
        fractional_digits: 8,
    },
    ETC: {
        display_code: 'ETC',
        name: translate('Ethereum Classic'),
        fractional_digits: 8,
    },
    LTC: {
        display_code: 'LTC',
        name: translate('Litecoin'),
        fractional_digits: 8,
    },
    UST: {
        display_code: 'USDT',
        name: translate('Tether Omni'),
        fractional_digits: 2,
    },
    // USB: {
    //     display_code: 'USB',
    //     name: translate('Binary Coin'),
    //     fractional_digits: 2,
    // },
};

const related_deriv_origin = getRelatedDeriveOrigin()

export const platforms = [
    {
        title: 'DTrader',
        description: translate('A whole new trading experience on a powerful yet easy to use platform.'),
        link: related_deriv_origin.origin,
        logo: 'image/deriv/brand/ic-brand-dtrader.svg',
    },
    {
        title: 'DBot',
        description: translate('Automated trading at your fingertips. No coding needed.'),
        link: `${related_deriv_origin.origin}bot`,
        logo: 'image/deriv/brand/ic-brand-dbot.svg',
    },
    {
        title: 'DMT5',
        description: translate('Trade on Deriv MetaTrader 5 (DMT5), the all-in-one FX and CFD trading platform.'),
        link: `${related_deriv_origin.origin}mt5`,
        logo: 'image/deriv/brand/ic-brand-dmt5.svg',
    },
    {
        title: 'Deriv X',
        description: translate('Trade FX and CFDs on a customisable, easy-to-use trading platform.'),
        link: `${related_deriv_origin.origin}derivx`,
        logo: 'image/deriv/brand/ic-brand-dxtrade.svg',
    },
    {
        title: 'SmartTrader',
        description: translate('Trade the world\'s markets with our popular user-friendly platform.'),
        link: `https://${related_deriv_origin.prefix}smarttrader.deriv.${related_deriv_origin.extension}/`,
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
