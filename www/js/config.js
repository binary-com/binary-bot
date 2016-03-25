Bot = {};
Bot.config = {};
Bot.config.lists = { 
	ACCOUNT: [['VRTC1197409', 'X6PLvU3nx6JBaXo'], ['FakeAccount', 'faketokenishere12']],
	DURATIONUNIT: [["ticks", "t"], ["seconds", "s"], ["minutes", "m"], ["hours", "h"], ["days", "d"]],
	PAYOUTTYPE: [["Payout", "payout"], ["Stake", "stake"]],
	CURRENCY: [["USD", "USD"], ["EUR", "EUR"], ["GBP", "GBP"], ["AUD", "AUD"]],
	PURCHASE: [["First", "1"], ["Second", "2"]],
}; 

Bot.config.opposites = {
	UPDOWN: ['CALL', 'PUT'],
};

Bot.config.r_markets = ['r_25', 'r_50', 'r_75', 'r_100'];
