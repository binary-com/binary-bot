var LiveApi = require('binary-live-api').LiveApi;
var storageManager = require('./storageManager');
var ws = require('./mockWs');

module.exports = {
	addTokenIfValid: function addTokenIfValid(token, callback) {
		var api = new LiveApi();
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