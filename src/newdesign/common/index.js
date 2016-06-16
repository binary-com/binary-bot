var translator = require('./translator');
var storageManager = require('./storageManager');
var account = require('./account');
var utils = require('./utils');
var appId = require('./appId');

module.exports = {
	translator: translator,
	storageManager: storageManager,
	account: account,
	utils: utils,
	appId: appId,
	init: function init() {
		this.appId.init();
		this.translator.init();
	}
};