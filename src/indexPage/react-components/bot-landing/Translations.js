import { translate } from '../../../common/i18n';

export default {
    carouselContentArray: [
        {
            title      : translate('Where to find Binary Bot on Deriv'),
            content    : translate('On the Deriv homepage, hit Trade at the top of the page and choose Binary Bot.'),
            action_text: translate('Try Binary Bot on Deriv'),
            img        : 'image/1a.webm',
        },
        {
            title      : translate('It’s the same Binary Bot you know and love'),
            content    : translate('Everything is exactly the way you like it.'),
            action_text: translate('Try Binary Bot on Deriv'),
            img        : 'image/2a.webm',
        },
        {
            title  : translate('Bring your bots across seamlessly'),
            content: translate(
                'Your strategies from Binary.com can be used on Deriv. Just load your XML files and get trading.'
            ),
            action_text: translate('Try Binary Bot on Deriv'),
            img        : 'image/3a.webm',
        },
    ],
    carouselContentArrayOne: [
        {
            title  : translate('7 trading platforms — old favourites and new ones, too'),
            content: translate(
                'You’ll find Binary Bot and SmartTrader alongside new platforms like DBot and DTrader. Whatever your trading style, we’ve got the platform for you.'
            ),
            img: 'image/trading-platforms.svg',
        },
        {
            title  : translate('Cryptocurrency deposits via fiat on-ramp'),
            content: translate(
                'Make crypto deposits easily via exchange services such as Changelly, Banxa, and XanPool.'
            ),
            img: 'image/fiat-on-ramp.svg',
        },
    ],
    carouselContentArrayTwo: [
        {
            title  : translate('3 trade types'),
            content: translate(
                'Trade CFDs, digital options, and multipliers, a new, exciting trade type that boosts your potential profits with limited risk.'
            ),
            img: 'image/trade-types.svg',
        },
        {
            title  : translate('Peer-to-peer deposits and withdrawals'),
            content: translate(
                'Exchange your local currency with fellow traders to get funds in and out of your account with Deriv P2P.'
            ),
            img: 'image/peer-to-peer.svg',
        },
    ],
    carouselContentArrayThree: [
        {
            title  : translate('6 market types'),
            content: translate(
                'Expand your portfolio with a wide range of markets such as forex, stocks, cryptocurrencies, synthetics, and more.'
            ),
            img: 'image/market_types.svg',
        },
        {
            title  : translate('Learn with Deriv Academy'),
            content: translate(
                'Enjoy complimentary articles and videos to help you learn the ropes of online trading.'
            ),
            img: 'image/deriv_academy.svg',
        },
    ],
};
