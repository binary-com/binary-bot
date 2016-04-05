Bot.StorageManager = function StorageManager(){
	var getTokenList = function getTokenList(){
		if ( !localStorage.hasOwnProperty('tokenList') ) {
			localStorage.tokenList = JSON.stringify([]);
		} 	
		return JSON.parse(localStorage.tokenList);
	};

	var findToken = function findToken(token){
		var tokenList = getTokenList();
		var index = -1;
		tokenList.forEach(function(tokenInfo, i){
			if ( tokenInfo.token === token ) {
				index = i;
			}
		});
		return index;
	};

	var setTokenList = function setTokenList(tokenList){
		localStorage.tokenList = JSON.stringify(tokenList);
	};

	var addToken = function addToken(token, account_name){
		var tokenList = getTokenList();
		var index = findToken(token);
		if ( index < 0 ) {
			tokenList.push({
				account_name: account_name,
				token: token
			});
			setTokenList(tokenList);
		}
	};
	var removeToken = function removeToken(token){
		var tokenList = getTokenList();
		var index = findToken(token);
		if ( index > -1 ) {
			tokenList.splice(index, 1);
			setTokenList(tokenList);
		}
	};
	var isDone = function isDone(varName){
		return localStorage.hasOwnProperty(varName);
	};
	var setDone = function setDone(varName){
		localStorage[varName] = true;
	};
	var setNotDone = function setNotDone(varName){
		delete localStorage[varName];
	};
	return {
		getTokenList: getTokenList,			
		findToken: findToken,			
		setTokenList: setTokenList,			
		addToken: addToken,			
		removeToken: removeToken,			
		isDone: isDone,			
		setDone: setDone,			
		setNotDone: setNotDone,			
	};
};
