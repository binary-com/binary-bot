var LiveApi = require('binary-live-api').LiveApi;
var storageManager = require('./storageManager');
module.exports = {
	addTokenIfValid: function addTokenIfValid(token, callback) {
		var api;
		if (typeof ws === 'undefined') {
			api = new LiveApi({ websocket: require('ws') });
		} else {
			api = new LiveApi();
		}
		api.authorize(token)
			.then(function (response) {
				api.disconnect();
				storageManager.addToken(token, response.authorize.loginid);
				if (callback) {
					callback(null);
				}
			}, function (reason) {
				api.disconnect();
				storageManager.removeToken(token);
				if (callback) {
					callback('Error');
				}
			});
	},
};
