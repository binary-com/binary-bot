import { translate } from '../../common/i18n';
import { generateLiveApiInstance } from '../../common/appId';

const CRYPTO_CURRENCIES = ['BTC', 'ETH', 'LTC', 'BCH'];

const config = {
    lists: {
        PAYOUTTYPE: [
            // [translate('Payout'), 'payout'],
            [translate('Stake'), 'stake'],
        ],
        CRYPTO_CURRENCIES,
        CHECK_RESULT     : [[translate('Win'), 'win'], [translate('Loss'), 'loss']],
        CHECK_DIRECTION  : [[translate('Rise'), 'rise'], [translate('Fall'), 'fall'], [translate('No Change'), '']],
        BALANCE_TYPE     : [[translate('string'), 'STR'], [translate('number'), 'NUM']],
        NOTIFICATION_TYPE: [
            [translate('green'), 'success'],
            [translate('blue'), 'info'],
            [translate('yellow'), 'warn'],
            [translate('red'), 'error'],
        ],
        NOTIFICATION_SOUND: [
            [translate('Silent'), 'silent'],
            [translate('Announcement'), 'announcement'],
            [translate('Earned money'), 'earned-money'],
            [translate('Job done'), 'job-done'],
            [translate('Error'), 'error'],
            [translate('Severe error'), 'severe-error'],
        ],
    },
    opposites: {
        RISEFALL: [
            {
                CALL: translate('Rise'),
            },
            {
                PUT: translate('Fall'),
            },
        ],
        RISEFALLEQUALS: [
            {
                CALLE: translate('Rise Equals'),
            },
            {
                PUTE: translate('Fall Equals'),
            },
        ],
        HIGHERLOWER: [
            {
                CALL: translate('Higher'),
            },
            {
                PUT: translate('Lower'),
            },
        ],
        TOUCHNOTOUCH: [
            {
                ONETOUCH: translate('Touch'),
            },
            {
                NOTOUCH: translate('No Touch'),
            },
        ],
        ENDSINOUT: [
            {
                EXPIRYRANGE: translate('Ends In'),
            },
            {
                EXPIRYMISS: translate('Ends Out'),
            },
        ],
        STAYSINOUT: [
            {
                RANGE: translate('Stays In'),
            },
            {
                UPORDOWN: translate('Goes Out'),
            },
        ],
        ASIANS: [
            {
                ASIANU: translate('Asian Up'),
            },
            {
                ASIAND: translate('Asian Down'),
            },
        ],
        MATCHESDIFFERS: [
            {
                DIGITMATCH: translate('Matches'),
            },
            {
                DIGITDIFF: translate('Differs'),
            },
        ],
        EVENODD: [
            {
                DIGITEVEN: translate('Even'),
            },
            {
                DIGITODD: translate('Odd'),
            },
        ],
        OVERUNDER: [
            {
                DIGITOVER: translate('Over'),
            },
            {
                DIGITUNDER: translate('Under'),
            },
        ],
        HIGHLOWTICKS: [
            {
                TICKHIGH: translate('High Tick'),
            },
            {
                TICKLOW: translate('Low Tick'),
            },
        ],
    },
    barrierTypes: [['+', '+'], ['-', '-']],
    ohlcFields  : [
        [translate('Open'), 'open'],
        [translate('High'), 'high'],
        [translate('Low'), 'low'],
        [translate('Close'), 'close'],
        [translate('Open Time'), 'epoch'],
    ],
    candleIntervals: [
        [translate('Default'), 'default'],
        ['1 minute', '60'],
        ['2 minutes', '120'],
        ['3 minutes', '180'],
        ['5 minutes', '300'],
        ['10 minutes', '600'],
        ['15 minutes', '900'],
        ['30 minutes', '1800'],
        ['1 hour', '3600'],
        ['2 hours', '7200'],
        ['4 hours', '14400'],
        ['8 hours', '28800'],
        ['1 day', '86400'],
    ],
    mainBlocks   : ['trade', 'before_purchase', 'after_purchase', 'during_purchase'],
    durationTypes: {
        RISEFALL: [
            [translate('Ticks'), 't'],
            [translate('Seconds'), 's'],
            [translate('Minutes'), 'm'],
            [translate('Hours'), 'h'],
        ],
        RISEFALLEQUALS: [
            [translate('Ticks'), 't'],
            [translate('Seconds'), 's'],
            [translate('Minutes'), 'm'],
            [translate('Hours'), 'h'],
        ],
        HIGHERLOWER: [
            [translate('Ticks'), 't'],
            [translate('Seconds'), 's'],
            [translate('Minutes'), 'm'],
            [translate('Hours'), 'h'],
        ],
        TOUCHNOTOUCH  : [[translate('Ticks'), 't'], [translate('Minutes'), 'm'], [translate('Hours'), 'h']],
        ENDSINOUT     : [[translate('Minutes'), 'm'], [translate('Hours'), 'h']],
        STAYSINOUT    : [[translate('Minutes'), 'm'], [translate('Hours'), 'h']],
        ASIANS        : [[translate('Ticks'), 't']],
        MATCHESDIFFERS: [[translate('Ticks'), 't']],
        EVENODD       : [[translate('Ticks'), 't']],
        OVERUNDER     : [[translate('Ticks'), 't']],
        HIGHLOWTICKS  : [[translate('Ticks'), 't']],
    },
    hasPrediction         : ['MATCHESDIFFERS', 'OVERUNDER', 'HIGHLOWTICKS'],
    hasBarrierOffset      : ['HIGHERLOWER', 'TOUCHNOTOUCH', 'ENDSINOUT', 'STAYSINOUT'],
    hasSecondBarrierOffset: ['ENDSINOUT', 'STAYSINOUT'],
    conditionsCategory    : {
        callput     : ['risefall', 'risefallequals', 'higherlower'],
        touchnotouch: ['touchnotouch'],
        endsinout   : ['endsinout'],
        staysinout  : ['staysinout'],
        asian       : ['asians'],
        digits      : ['matchesdiffers', 'evenodd', 'overunder'],
        highlowticks: ['highlowticks'],
    },
    conditionsCategoryName: {
        callput     : translate('Up/Down'),
        asian       : translate('Asians'),
        digits      : translate('Digits'),
        touchnotouch: translate('Touch/No Touch'),
        endsinout   : translate('Ends In/Out'),
        staysinout  : translate('Stays In/Goes Out'),
        highlowticks: translate('High/Low Ticks'),
    },
    scopeNames: {
        before_purchase: translate('Before Purchase'),
        during_purchase: translate('During Purchase'),
        after_purchase : translate('After Purchase'),
        tick_analysis  : translate('Tick Analysis'),
        timeout        : translate('Run After n Seconds'),
        interval       : translate('Run Every n Seconds'),
    },
    bbResult  : [[translate('upper'), '1'], [translate('middle'), '0'], [translate('lower'), '2']],
    macdFields: [[translate('Histogram'), '0'], [translate('MACD'), '1'], [translate('Signal'), '2']],
};

export async function updateConfigCurrencies() {
    const api = generateLiveApiInstance();
    try {
        const response = await api.getPayoutCurrencies();
        config.lists.CURRENCY = response.payout_currencies.map(c => [c, c]);
    } catch (e) {
        config.lists.CURRENCY = ['USD', 'EUR', 'GBP', 'AUD', ...CRYPTO_CURRENCIES].map(c => [c, c]);
    }
}

export default config;
