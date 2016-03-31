Bot = {};
Bot.config = {};
Bot.config.lists = { 
	PAYOUTTYPE: [["Payout", "payout"], ["Stake", "stake"]],
	CURRENCY: [["USD", "USD"], ["EUR", "EUR"], ["GBP", "GBP"], ["AUD", "AUD"]],
	DETAILS: [['statement', '1'], ['ask price', '2'], ['payout', '3'], ['contract type', '4'], ['entry spot', '5'], ['entry value', '6'], ['exit spot', '7'], ['exit value', '8'], ['barrier', '9'], ],
}; 

Bot.config.opposites = {
	UPDOWN: [{'CALL': 'Up'}, {'PUT': 'Down'}],
	ASIAN: [{'ASIANU': 'Asian Up'}, {'ASIAND': 'Asian Down'}],
	MATCHESDIFFERS: [{'DIGITMATCH': 'Matches'}, {'DIGITDIFF': 'Differs'}],
	EVENODD: [{'DIGITEVEN': 'Even'}, {'DIGITODD': 'Odd'}],
	OVERUNDER: [{'DIGITOVER': 'Over'}, {'DIGITUNDER': 'Under'}],
};

Bot.config.opposites_have_barrier = [
	'MATCHESDIFFERS',
	'OVERUNDER',
];

Bot.config.conditions = ['updown', 'asian', 'matchesdiffers', 'evenodd', 'overunder'];
Bot.config.ticktrade_markets = ['r_25', 'r_50', 'r_75', 'r_100', 'rdbear', 'rdbull', 'rdmoon', 'rdsun', 'rdmars', 'rdvenus', 'rdyang', 'rdyin'];
Bot.config.ticktrade_market_names = ['Random 25', 'Random 50', 'Random 75', 'Random 100', 'Random Bear', 'Random Bull', 'Random Moon', 'Random Sun', 'Random Mars', 'Random Venus', 'Random Yang', 'Random Yin'];

