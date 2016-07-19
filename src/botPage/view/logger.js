var logQueue = [];
var debug = false;

var toggleDebug = function toggleDebug() {
	debug = !debug;
	if (debug) {
		logQueue.forEach(function (log) {
			console.log.apply(console, log);
		});
		logQueue = [];
	}
};

var addLogToQueue = function addLogToQueue() {
	logQueue.push(Array.prototype.slice.apply(arguments));
};

var isDebug = function isDebug() {
	return debug;
};

module.exports = {
	toggleDebug: toggleDebug,
	addLogToQueue: addLogToQueue,
	isDebug: isDebug,
};
