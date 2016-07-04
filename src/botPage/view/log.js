var showError = function showError(error) {
	if (error.stack) {
		if (global.isDebug()) {
			console.log('%c' + error.stack, 'color: red');
		} else {
			global.addLogToQueue('%c' + error.stack, 'color: red');
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
	if (global.isDebug()) {
		console.log('%cError: ' + message, 'color: red');
	} else {
		global.addLogToQueue('%cError: ' + message, 'color: red');
	}
};

var log = function log(message, notify_type, position) {
	if (notify_type !== undefined) {
		$.notify(message, {
			position: (position === undefined) ? 'bottom right' : position,
			className: notify_type,
		});
	}
	if (global.isDebug()) {
		console.log(message);
	} else {
		global.addLogToQueue(message);
	}
};

var broadcast = function broadcast(eventName, data) {
	window.dispatchEvent(new CustomEvent(eventName, {
		detail: data
	}));
};