var getTokenList = function getTokenList() {
	if (!localStorage.hasOwnProperty('tokenList')) {
		localStorage.tokenList = JSON.stringify([]);
	}
	return JSON.parse(localStorage.tokenList);
};

var findToken = function findToken(token) {
	var tokenList = getTokenList();
	var index = -1;
	tokenList.forEach(function (tokenInfo, i) {
		if (tokenInfo.token === token) {
			index = i;
		}
	});
	return index;
};

var findAccount = function findAccount(account_name) {
	var tokenList = getTokenList();
	var index = -1;
	tokenList.forEach(function (tokenInfo, i) {
		if (tokenInfo.account_name === account_name) {
			index = i;
		}
	});
	return index;
};

var setTokenList = function setTokenList(tokenList) {
	localStorage.tokenList = JSON.stringify(tokenList);
};

var addToken = function addToken(token, account_name, isVirtual) {
	var tokenList = getTokenList();
	var tokenIndex = findToken(token);
	var accountIndex = findAccount(account_name);
	if (tokenIndex < 0 && accountIndex < 0) {
		tokenList.push({
			account_name: account_name,
			token: token,
			isVirtual: isVirtual
		});
		setTokenList(tokenList);
	}
};

var getToken = function getToken(token) {
	var tokenList = getTokenList();
	var index = findToken(token);
	if (index >= 0) {
		return tokenList[index];
	}
	return '';
};

var removeToken = function removeToken(token) {
	var tokenList = getTokenList();
	var index = findToken(token);
	if (index > -1) {
		tokenList.splice(index, 1);
		setTokenList(tokenList);
	}
};
var removeAllTokens = function removeAllTokens() {
	delete localStorage.tokenList;
};
var isDone = function isDone(varName) {
	return localStorage.hasOwnProperty(varName);
};
var setDone = function setDone(varName) {
	localStorage[varName] = true;
};
var setNotDone = function setNotDone(varName) {
	delete localStorage[varName];
};
module.exports = {
	getTokenList: getTokenList,
	findToken: findToken,
	setTokenList: setTokenList,
	getToken: getToken,
	addToken: addToken,
	removeToken: removeToken,
	removeAllTokens: removeAllTokens,
	isDone: isDone,
	setDone: setDone,
	setNotDone: setNotDone,
};
