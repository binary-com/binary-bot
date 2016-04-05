var StorageManager = function StorageManager(){
};
StorageManager.prototype.getTokenList = function getTokenList(){
	if ( !localStorage.hasOwnProperty('tokenList') ) {
		localStorage.tokenList = JSON.stringify([]);
	} 	
	return JSON.parse(localStorage.tokenList);
};

StorageManager.prototype.findToken = function findToken(token){
	var tokenList = this.getTokenList();
	var index = -1;
	tokenList.forEach(function(tokenInfo, i){
		if ( tokenInfo.token === token ) {
			index = i;
		}
	});
	return index;
};

StorageManager.prototype.setTokenList = function setTokenList(tokenList){
	localStorage.tokenList = JSON.stringify(tokenList);
};

StorageManager.prototype.addToken = function addToken(token, account_name){
	var tokenList = this.getTokenList();
	var index = this.findToken(token);
	if ( index < 0 ) {
		tokenList.push({
			account_name: account_name,
			token: token
		});
		this.setTokenList(tokenList);
	}
};
StorageManager.prototype.removeToken = function removeToken(token){
	var tokenList = this.getTokenList();
	var index = this.findToken(token);
	if ( index > -1 ) {
		tokenList.splice(index, 1);
		this.setTokenList(tokenList);
	}
};
StorageManager.prototype.isDone = function isDone(varName){
	return localStorage.hasOwnProperty(varName);
};
StorageManager.prototype.setDone = function setDone(varName){
	localStorage[varName] = true;
};
StorageManager.prototype.setNotDone = function setNotDone(varName){
	delete localStorage[varName];
};
