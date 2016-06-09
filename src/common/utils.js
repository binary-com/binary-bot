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

var removeAllTokens = function removeAllTokens(callback) {
	storageManager.removeAllTokens();
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
				callback(null);
			}
		}, function (reason) {
			api.disconnect();
			removeToken(token);
			if (callback) {
				callback('Error');
			}
		});
};

var getAccountName = function getAccountName(token) {
	var accountName = storageManager.getToken(token);
	if (accountName instanceof Object) {
		return accountName.account_name;
	}
	return '';
};

module.exports = {
	parseQueryString: parseQueryString,
	removeToken: removeToken,
	removeAllTokens: removeAllTokens,
	addTokenIfValid: addTokenIfValid,
	getAccountName: getAccountName
};