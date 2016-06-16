var LiveApi = require('binary-live-api').LiveApi;

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
				removeToken(token);
				if (callback) {
					callback('Error');
				}
			});
	},
	removeToken: function removeToken(token, callback) {
		storageManager.removeToken(token);
		if (callback) {
			callback();
		}
	},
	removeAllTokens: function removeAllTokens(callback) {
		storageManager.removeAllTokens();
		if (callback) {
			callback();
		}
	},
};