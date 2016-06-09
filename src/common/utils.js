var storageManager = require('storageManager');
var blockly = require('blockly');

var parseQueryString = function parseQueryString() {
	var str = window.location.search;
	var objURL = {};
	str.replace(
		new RegExp("([^?=&]+)(=([^&]*))?", "g"),
		function ($0, $1, $2, $3) {
			objURL[$1] = $3;
		}
	);
	return objURL;
};

var removeToken = function removeToken(token, callback) {
	storageManager.removeToken(token);
	if (callback) {
		callback();
	}
};

var removeAllTokens = function removeAllTokens(token, callback) {
	storageManager.removeAllTokens(token);
	if (callback) {
		callback();
	}
};

var addTokenIfValid = function addTokenIfValid(token, callback) {
	var LiveApi = require('binary-live-api')
		.LiveApi;
	var api = new LiveApi();
	api.authorize(token)
		.then(function (response) {
			api.disconnect();
			storageManager.addToken(token, response.authorize.loginid);
			if (callback) {
				callback();
			}
			log(i18n._('Your token was added successfully'), 'info');
		}, function (reason) {
			api.disconnect();
			removeToken(token);
			showError(i18n._('Authentication failed using token:') + ' ' + token);
			});
};

module.exports = {
	parseQueryString: parseQueryString,
	removeToken: removeToken,
	removeAllTokens: removeAllTokens,
	addTokenIfValid: addTokenIfValid
};