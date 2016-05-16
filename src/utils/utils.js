var globals = require('../globals/globals');

var getUTCTime = function getUTCTime(date) {
	var dateObject = new Date(date);
	return ('0' + dateObject.getUTCHours())
		.slice(-2) + ':' + ('0' + dateObject.getUTCMinutes())
		.slice(-2) + ':' + ('0' + dateObject.getUTCSeconds())
		.slice(-2);
};

var showError = function showError(error) {
	if (error.stack) {
		if (globals.isDebug()) {
			console.log('%c' + error.stack, 'color: red');
		} else {
			globals.addLogToQueue('%c' + error.stack, 'color: red');
		}
	}
	var message;
	if (error.message) {
		message = error.message;
	} else {
		message = error;
	}
	$.notify(message, {
		position: 'bottom right',
		className: 'error',
	});
	if (globals.isDebug()) {
		console.log('%cError: ' + message, 'color: red');
	} else {
		globals.addLogToQueue('%cError: ' + message, 'color: red');
	}
};

var log = function log(message, notify_type, position) {
	if (notify_type !== undefined) {
		$.notify(message, {
			position: (position === undefined) ? 'bottom right' : position,
			className: notify_type,
		});
	}
	if (globals.isDebug()) {
		console.log(message);
	} else {
		globals.addLogToQueue(message);
	}
};

var broadcast = function broadcast(eventName, data) {
	window.dispatchEvent(new CustomEvent(eventName, {
		detail: data
	}));
};

var findTopParentBlock = function findTopParentBlock(block) {
	var pblock = block.parentBlock_;
	if (pblock === null) {
		return null;
	}
	while (pblock !== null) {
		block = pblock;
		pblock = block.parentBlock_;
	}
	return block;
};

module.exports = {
	showError: showError,
	log: log,
	getUTCTime: getUTCTime,
	broadcast: broadcast,
	findTopParentBlock: findTopParentBlock,
};
