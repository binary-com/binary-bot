var CustomApi = require('./CustomApi');
var storageManager = require('./storageManager');

module.exports = {
	addTokenIfValid: function addTokenIfValid(token, callback) {
		var api = new CustomApi()._originalApi;
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
