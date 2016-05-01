Bot.Version = function Version() {
	Bot.version = '1.1.5';
	if (Bot.debug) {
		console.log('%cBinary Bot (v' + Bot.version + ') started.', 'color: green');
	} else {
		Bot.queueLog('%cBinary Bot (v' + Bot.version + ') started.', 'color: green');
	}
};
