Bot.Config = function Config() {
	return {
		lists: {
			PAYOUTTYPE: [
				[i18n._('Payout'), 'payout'],
				[i18n._('Stake'), 'stake']
			],
			CURRENCY: [
				['USD', 'USD'],
				['EUR', 'EUR'],
				['GBP', 'GBP'],
				['AUD', 'AUD']
			],
			DETAILS: [
				[i18n._('statement'), '1'],
				[i18n._('ask price'), '2'],
				[i18n._('payout'), '3'],
				[i18n._('profit'), '4'],
				[i18n._('contract type'), '5'],
				[i18n._('entry spot'), '6'],
				[i18n._('entry value'), '7'],
				[i18n._('exit spot'), '8'],
				[i18n._('exit value'), '9'],
				[i18n._('barrier'), '10'],
			],
		},

		opposites: {
			UPDOWN: [{
				'CALL': i18n._('Up')
			}, {
				'PUT': i18n._('Down')
			}],
			ASIAN: [{
				'ASIANU': i18n._('Asian Up')
			}, {
				'ASIAND': i18n._('Asian Down')
			}],
			MATCHESDIFFERS: [{
				'DIGITMATCH': i18n._('Matches')
			}, {
				'DIGITDIFF': i18n._('Differs')
			}],
			EVENODD: [{
				'DIGITEVEN': i18n._('Even')
			}, {
				'DIGITODD': i18n._('Odd')
			}],
			OVERUNDER: [{
				'DIGITOVER': i18n._('Over')
			}, {
				'DIGITUNDER': i18n._('Under')
			}],
		},

		opposites_have_barrier: [
			'MATCHESDIFFERS',
			'OVERUNDER',
		],

		conditions: ['updown', 'asian', 'matchesdiffers', 'evenodd', 'overunder'],
		ticktrade_markets: ['r_25', 'r_50', 'r_75', 'r_100', 'rdbear', 'rdbull'],
		ticktrade_market_names: [i18n._('Volatility 25 Index'), i18n._('Volatility 50 Index'), i18n._('Volatility 75 Index'), i18n._('Volatility 100 Index'), i18n._('Bear Market Index'), i18n._('Bull Market Index')],
	};
};
