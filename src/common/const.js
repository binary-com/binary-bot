'use strict';
import Translator from './translator';
var translator = new Translator();

module.exports = {
	lists: {
		PAYOUTTYPE: [
			[translator.translateText('Payout'), 'payout'],
			[translator.translateText('Stake'), 'stake']
		],
		CURRENCY: [
			['USD', 'USD'],
			['EUR', 'EUR'],
			['GBP', 'GBP'],
			['AUD', 'AUD']
		],
		DETAILS: [
			[translator.translateText('statement'), '1'],
			[translator.translateText('ask price'), '2'],
			[translator.translateText('payout'), '3'],
			[translator.translateText('profit'), '4'],
			[translator.translateText('contract type'), '5'],
			[translator.translateText('entry spot'), '6'],
			[translator.translateText('entry value'), '7'],
			[translator.translateText('exit spot'), '8'],
			[translator.translateText('exit value'), '9'],
			[translator.translateText('barrier'), '10'],
			[translator.translateText('result'), '11'],
		],
		CHECK_RESULT: [
			[translator.translateText('Win'), 'win'],
			[translator.translateText('Loss'), 'loss'],
		],
		CHECK_DIRECTION: [
			[translator.translateText('Rise'), 'rise'],
			[translator.translateText('Fall'), 'fall'],
			[translator.translateText('No Change'), ''],
		],
	},

	opposites: {
		RISEFALL: [{
			'CALL': translator.translateText('Rise')
		}, {
			'PUT': translator.translateText('Fall')
		}],
		ASIANS: [{
			'ASIANU': translator.translateText('Asian Up')
		}, {
			'ASIAND': translator.translateText('Asian Down')
		}],
		MATCHESDIFFERS: [{
			'DIGITMATCH': translator.translateText('Matches')
		}, {
			'DIGITDIFF': translator.translateText('Differs')
		}],
		EVENODD: [{
			'DIGITEVEN': translator.translateText('Even')
		}, {
			'DIGITODD': translator.translateText('Odd')
		}],
		OVERUNDER: [{
			'DIGITOVER': translator.translateText('Over')
		}, {
			'DIGITUNDER': translator.translateText('Under')
		}],
	},
	oppositesHaveBarrier: [
		'MATCHESDIFFERS',
		'OVERUNDER',
	],
	conditionsCategory: {
		callput: ['risefall'],
		asian: ['asians'],
		digits: ['matchesdiffers', 'evenodd', 'overunder']
	},
	conditionsCategoryName: {
		callput: translator.translateText('Up/Down'),
		asian: translator.translateText('Asians'),
		digits: translator.translateText('Digits'),
	},
	conditions: ['risefall', 'asians', 'matchesdiffers', 'evenodd', 'overunder']
};
