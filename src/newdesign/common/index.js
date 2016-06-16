var translator = require('./translator');
var storageManager = require('./storageManager');
var account = require('./account');
var tools = require('./tools');
var _const = require('./const');
var xml = require('./xml');
var version = require('./version');
var observer = require('./observer');

module.exports = {
	translator: translator,
	storageManager: storageManager,
	account: account,
	tools: tools,
	const: _const,
	xml: xml,
	observer: observer
};