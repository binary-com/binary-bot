var utils = require('utils');

var AppId = {
	app_id: ( document.location.port === '8080' ) ? 1168 : 1163,
	redirectOauth: function oauthLogin(){
		document.location = 'https://oauth.binary.com/oauth2/authorize?app_id=' + this.app_id + '&l=' + window.lang.toUpperCase();
	},
	oauthLogin: function getToken() {
		var queryStr = utils.parseQueryString();
		if (queryStr.token1) {
			utils.addTokenIfValid(queryStr.token1, function(){
				document.location.pathname = '/bot.html';
			});
		}
	},
	removeTokenFromUrl: function removeTokenFromUrl(){
		var queryStr = utils.parseQueryString();
		if (queryStr.token1) {
			document.location.search = '';
		}
	}
};

module.exports = AppId;