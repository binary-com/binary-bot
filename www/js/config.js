Bot = {};
Bot.config = {};
Bot.config.lists = { 
	ACCOUNT: [['Amin', '1XihhKDPjDGAkW7'], ['VRTC1197409', 'X6PLvU3nx6JBaXo'], ['FakeAccount', 'faketokenishere12']],
	DURATIONUNIT: [["ticks", "t"], ["seconds", "s"], ["minutes", "m"], ["hours", "h"], ["days", "d"]],
	PAYOUTTYPE: [["Payout", "payout"], ["Stake", "stake"]],
	CURRENCY: [["USD", "USD"], ["EUR", "EUR"], ["GBP", "GBP"], ["AUD", "AUD"]],
	PURCHASE: [["First", "1"], ["Second", "2"]],
}; 

Bot.config.opposites = {
	UPDOWN: ['CALL', 'PUT'],
};

Bot.config.updown_markets = ['r_25', 'r_50', 'r_75', 'r_100', 'rdbear', 'rdbull', 'rdmoon', 'rdsun', 'rdmars', 'rdvenus', 'rdyang', 'rdyin'];
Bot.config.updown_market_names = ['Random 25', 'Random 50', 'Random 75', 'Random 100', 'Random Bear', 'Random Bull', 'Random Moon', 'Random Sun', 'Random Mars', 'Random Venus', 'Random Yang', 'Random Yin'];
