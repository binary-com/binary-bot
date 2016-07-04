module.exports = {
	getTokenList: function getTokenList() {
		if (!localStorage.hasOwnProperty('tokenList')) {
			localStorage.tokenList = [];
		} else if ( typeof localStorage.tokenList === 'string' ) { // compatibility with old code
			localStorage.tokenList = JSON.dumps(localStorage.tokenList);
		}
		return localStorage.tokenList;
	},
	findAccount: function findAccount(account_name) {
		var tokenList = this.getTokenList();
		var index = -1;
		tokenList.forEach(function (tokenInfo, i) {
			if (tokenInfo.account_name === account_name) {
				index = i;
			}
		});
		return index;
	},
	setTokenList: function setTokenList(tokenList) {
		localStorage.tokenList = tokenList;
	},
	addToken: function addToken(token, account_name, isVirtual) {
		var tokenList = this.getTokenList();
		var tokenIndex = this.findToken(token);
		var accountIndex = this.findAccount(account_name);
		if (tokenIndex < 0 && accountIndex < 0) {
			tokenList.push({
				account_name: account_name,
				token: token,
				isVirtual: isVirtual
			});
			this.setTokenList(tokenList);
		}
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
	getToken: function getToken(token) {
		var tokenList = this.getTokenList();
		var index = this.findToken(token);
		if (index >= 0) {
			return tokenList[index];
		}
		return {};
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
	set: function set(varName, value) {
		localStorage[varName] = value;
	},
	get: function get(varName) {
		return localStorage[varName];
	},
};
