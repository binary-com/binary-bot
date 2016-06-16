module.exports = {
	getTokenList: function getTokenList() {
		if (!localStorage.hasOwnProperty('tokenList')) {
			localStorage.tokenList = [];
		}
		return localStorage.tokenList;
	},
	findToken: function findToken(token) {
		var tokenList = this.getTokenList();
		var index = -1;
		tokenList.forEach(function (tokenInfo, i) {
			if (tokenInfo.token === token) {
				index = i;
			}
		});
		return index;
	},
	addToken: function addToken(token, account_name) {
		if ( !token || !account_name ) {
			throw(Error('Token and account name should be both passed to addToken'));
		}
		var tokenList = this.getTokenList();
		var index = this.findToken(token);
		if (index < 0) {
			tokenList.push({
				account_name: account_name,
				token: token
			});
			localStorage.tokenList = tokenList;
		}
	},
	getToken: function getToken(token) {
		var tokenList = this.getTokenList();
		var index = this.findToken(token);
		if (index >= 0) {
			return tokenList[index];
		}
		return '';
	},
	removeToken: function removeToken(token) {
		var tokenList = this.getTokenList();
		var index = this.findToken(token);
		if (index > -1) {
			tokenList.splice(index, 1);
			localStorage.tokenList = tokenList;
		}
	},
	removeAllTokens: function removeAllTokens() {
		delete localStorage.tokenList;
	},
	isDone: function isDone(varName) {
		return localStorage.hasOwnProperty(varName);
	},
	setDone: function setDone(varName) {
		localStorage[varName] = true;
	},
	setNotDone: function setNotDone(varName) {
		delete localStorage[varName];
	},
};
