var utils = require('./utils');
var account = require('./account');

module.exports = {
	_initialized: false,
	_app_id: 0,
	_getAppId: function _getAppId(){
		if ( document.location.port === '8080' ) {
			return 1168; // localhost
		} else if ( document.location.hostname.indexOf('github.io') >= 0 ) {
			return 1180; // github
		} else {
			return 1169; // binary.com
		}
	},
	init: function init() {
		this._initialized = true;
		this._app_id = this._getAppId();
	},
	redirectOauth: function redirectOauth(){
		if ( !this._initialized ) {
			throw Error('AppId cannot be used before initialization');
		}
		document.location = 'https://oauth.binary.com/oauth2/authorize?app_id=' + this._app_id + '&l=' + window.lang.toUpperCase();
	},
	oauthLogin: function oauthLogin(done) {
		if ( !this._initialized ) {
			throw Error('AppId cannot be used before initialization');
		}
		var queryStr = utils.parseQueryString();
		var tokenList = [];
		Object.keys(queryStr).forEach(function(key){
			if ( key.indexOf('token') === 0 ) {
				tokenList.push(queryStr[key]);
			}
		});
		if (tokenList.length) {
			account.addAllTokens(tokenList, function(){
				document.location.pathname += ((document.location.pathname.slice(-1) === '/')?'':'/') + 'bot.html';
			});
		} else {
			if (done) {
				done();
			}
		}
	},
	removeTokenFromUrl: function removeTokenFromUrl(){
		if ( !this._initialized ) {
			throw Error('AppId cannot be used before initialization');
		}
		var queryStr = utils.parseQueryString();
		if (queryStr.token1) {
			document.location.href = document.location.href.split('?')[0];
		}
	},
	getAppId: function getAppId(){
		if ( !this._initialized ) {
			throw Error('AppId cannot be used before initialization');
		}
		return this._app_id;
	}
};