'use strict';
import tools from 'binary-common-utils/tools';
import $ from 'jquery';
import accounts from 'binary-common-utils/account';
import storageManager from 'binary-common-utils/storageManager';
var appId = 0;
if ( document.location.port === '8080' ) {
	appId = 1168; // binary bot on localhost
} else if ( document.location.hostname.indexOf('github.io') >= 0 ) {
	appId = 1180; // binary bot on dev gh-pages
} else {
	appId = 1169; // binary bot on deploy gh-pages
}
storageManager.set('appId', appId);
var AppId = {
	oauthLogin: function getToken(done) {
		var queryStr = tools.parseQueryString();
		var tokenList = [];
		Object.keys(queryStr).forEach(function(key){
			if ( key.indexOf('token') === 0 ) {
				tokenList.push(queryStr[key]);
			}
		});
		if (tokenList.length) {
			$('#main').hide();
			tools.asyncForEach(tokenList, function(token, index, next){
				accounts.addTokenIfValid(token, function(){
					next();
				});
			}, function(){
				document.location = '/bot.html';
			});
		} else {
			if (done) {
				done();
			}
		}
	},
	getAppId: function getAppId(){
		return storageManager.get('appId');
	}
};

module.exports = AppId;
