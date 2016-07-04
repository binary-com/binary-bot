var globals = require('./globals');
var version = require('common').const.version;
if (globals.debug) {
	console.log('%cBinary Bot (v' + version + ') started.', 'color: green');
} else {
	globals.addLogToQueue('%cBinary Bot (v' + version + ') started.', 'color: green');
}
module.exports = version;
