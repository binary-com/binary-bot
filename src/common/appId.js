var utils = require('utils');

var AppId = {
	app_id: ( document.location.port === '8080' ) ? 1168 : ( document.location.hostname.indexOf('github.io') >= 0 ) ? 1180 : 1169,
	redirectOauth: function oauthLogin(){
		document.location = 'https://oauth.binary.com/oauth2/authorize?app_id=' + this.app_id + '&l=' + window.lang.toUpperCase();
	},
	oauthLogin: function getToken(done) {
		var queryStr = utils.parseQueryString();
		var tokenList = [];
		Object.keys(queryStr).forEach(function(key){
			if ( key.indexOf('token') === 0 ) {
				tokenList.push(queryStr[key]);
			}
		});
		if (tokenList.length) {
			utils.addAllTokens(tokenList, function(){
				document.location.pathname = '/bot.html';
			});
		} else {
			if (done) {
				done();
			}
		}
	},
	removeTokenFromUrl: function removeTokenFromUrl(){
		var queryStr = utils.parseQueryString();
		if (queryStr.token1) {
			document.location.search = '';
		}
	},
	getAppId: function getAppId(){
		return this.app_id;
	}
};

module.exports = AppId;