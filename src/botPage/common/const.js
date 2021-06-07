import { translate } from '../../common/i18n';
import { generateLiveApiInstance } from '../../common/appId';
import { load as loadLang } from '../../common/lang';

loadLang();

const CRYPTO_CURRENCIES = ['BTC', 'ETH', 'LTC', 'BCH'];

const config = {
    lists: {
        CRYPTO_CURRENCIES,
        DETAILS: [
            [translate('statement'), '1'],
            [translate('ask price'), '2'],
            [translate('payout'), '3'],
            [translate('profit'), '4'],
            [translate('contract type'), '5'],
            [translate('entry spot'), '6'],
            [translate('entry value'), '7'],
            [translate('entry value string'), '12'],
            [translate('exit spot'), '8'],
            [translate('exit value'), '9'],
            [translate('exit value string'), '13'],
            [translate('barrier'), '10'],
            [translate('result'), '11'],
        ],
        CHECK_RESULT: [
            [translate('Win'), 'win'],
            [translate('Loss'), 'loss'],
        ],
        CHECK_DIRECTION: [
            [translate('Rise'), 'rise'],
            [translate('Fall'), 'fall'],
            [translate('No Change'), ''],
        ],
        BALANCE_TYPE: [
            [translate('string'), 'STR'],
            [translate('number'), 'NUM'],
        ],
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
        RESET: [
            {
                RESETCALL: translate('Reset Call'),
            },
            {
                RESETPUT: translate('Reset Put'),
            },
        ],
        RUNS: [
            {
                RUNHIGH: translate('Only Ups'),
            },
            {
                RUNLOW: translate('Only Downs'),
            },
        ],
    },
    barrierTypes: [
        ['Offset +', '+'],
        ['Offset -', '-'],
    ],
    ohlcFields: [
        [translate('Open'), 'open'],
        [translate('High'), 'high'],
        [translate('Low'), 'low'],
        [translate('Close'), 'close'],
        [translate('Open Time'), 'epoch'],
    ],
    candleIntervals: [
        [translate('Default'), 'default'],
        [translate('1 minute'), '60'],
        [translate('2 minutes'), '120'],
        [translate('3 minutes'), '180'],
        [translate('5 minutes'), '300'],
        [translate('10 minutes'), '600'],
        [translate('15 minutes'), '900'],
        [translate('30 minutes'), '1800'],
        [translate('1 hour'), '3600'],
        [translate('2 hours'), '7200'],
        [translate('4 hours'), '14400'],
        [translate('8 hours'), '28800'],
        [translate('1 day'), '86400'],
    ],
    mainBlocks         : ['trade', 'before_purchase', 'after_purchase', 'during_purchase'],
    mandatoryBlocks    : ['trade', 'before_purchase', 'tradeOptions', 'purchase'],
    mandatoryMainBlocks: ['trade', 'before_purchase'],
    mandatoryBlockPairs: [
        {
            parentBlock: 'trade',
            childBlock : 'tradeOptions',
        },
        {
            parentBlock: 'before_purchase',
            childBlock : 'purchase',
        },
    ],
    blockLabels: {
        trade          : translate('(1) Define your trade contract'),
        before_purchase: translate('(2) Watch and purchase your contract'),
        tradeOptions   : translate('Trade Options'),
        purchase       : translate('Purchase'),
    },
    conditionsCategory: {
        callput     : ['risefall', 'higherlower'],
        callputequal: ['risefallequals'],
        touchnotouch: ['touchnotouch'],
        endsinout   : ['endsinout'],
        staysinout  : ['staysinout'],
        asian       : ['asians'],
        digits      : ['matchesdiffers', 'evenodd', 'overunder'],
        highlowticks: ['highlowticks'],
        reset       : ['reset'],
        runs        : ['runs'],
    },
    conditionsCategoryName: {
        callput     : translate('Up/Down'),
        callputequal: translate('Up/Down Equals'),
        asian       : translate('Asians'),
        digits      : translate('Digits'),
        touchnotouch: translate('Touch/No Touch'),
        endsinout   : translate('Ends In/Out'),
        staysinout  : translate('Stays In/Goes Out'),
        highlowticks: translate('High/Low Ticks'),
        reset       : translate('Reset Call/Reset Put'),
        runs        : translate('Only Ups/Only Downs'),
    },
    conditions: [
        'risefall',
        'risefallequals',
        'higherlower',
        'touchnotouch',
        'endsinout',
        'staysinout',
        'asians',
        'matchesdiffers',
        'evenodd',
        'overunder',
    ],
    barrierCategories: {
        euro_atm     : ['callput', 'risefall', 'risefallequals'],
        euro_non_atm : ['endsinout', 'higherlower'],
        american     : ['staysinout', 'touchnotouch', 'highlowticks', 'runs'],
        non_financial: ['digits', 'overunder', 'evenodd', 'matchesdiffers'],
        asian        : ['asian'],
        reset        : ['reset'],
        lookback     : ['lookback'],
    },
    scopeNames: {
        before_purchase: translate('Before Purchase'),
        during_purchase: translate('During Purchase'),
        after_purchase : translate('After Purchase'),
        tick_analysis  : translate('Tick Analysis'),
        timeout        : translate('Run After n Seconds'),
        interval       : translate('Run Every n Seconds'),
    },
    bbResult: [
        [translate('upper'), '1'],
        [translate('middle'), '0'],
        [translate('lower'), '2'],
    ],
    macdFields: [
        [translate('Histogram'), '0'],
        [translate('MACD'), '1'],
        [translate('Signal'), '2'],
    ],
    gd: {
        cid: '828416594271-qj2dnf4u2omg1iugangbtsrq6p0a55oc.apps.googleusercontent.com',
        aid: 'derivbot-248506',
        api: 'AIzaSyBDYQ7IIgGxM14IeAV5JrtaJNYjxB4A5jo',
    },
    quick_strategies: ['martingale', 'dalembert'],
};

export async function updateConfigCurrencies(api = generateLiveApiInstance()) {
    try {
        const response = await api.getPayoutCurrencies();
        config.lists.CURRENCY = response.payout_currencies.map(c => {
            if (c === 'UST') return ['USDT', 'UST'];
            return [c, c];
        });
    } catch (e) {
        config.lists.CURRENCY = ['USD', 'EUR', 'GBP', 'AUD', ...CRYPTO_CURRENCIES].map(c => [c, c]);
    }
}

export default config;
