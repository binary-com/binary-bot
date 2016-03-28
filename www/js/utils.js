Bot.utils = {};
Bot.utils.chooseByIndex = function chooseByIndex(caps_name, index, list){
	var list = ( typeof list === 'undefined' ) ? Bot.config.lists[caps_name] : list;
	var index = parseInt(index);
	if ( isNaN(index) ){
		return null;
	}
	if ( index > 0 && index <= list.length ) {
		index--;
		return list[index][1];
	} else {
		return null;
	}
};

Bot.utils.addPurchaseOptions = function addPurchaseOptions(){
	var firstOption = {};
	var strategy = Blockly.getMainWorkspace().getBlockById('strategy');
	var trade = Blockly.getMainWorkspace().getBlockById('trade');
	if ( trade !== null && trade.getInputTargetBlock('SUBMARKET') !== null && trade.getInputTargetBlock('SUBMARKET').getInputTargetBlock('CONDITION').type !== null) {
		var condition_type = trade.getInputTargetBlock('SUBMARKET').getInputTargetBlock('CONDITION').type;
		var opposites = Bot.config.opposites[condition_type.toUpperCase()];
		Bot.server.purchase_choices = [];
		opposites.forEach(function(option, index){
			if ( index === 0 ) {
				firstOption = {
					condition: Object.keys(option)[0],
					name: option[Object.keys(option)[0]],
				};
			}
			Bot.server.purchase_choices.push([option[Object.keys(option)[0]], Object.keys(option)[0]]);
		});
		if ( strategy !== null ) {
			var purchases = [];
			strategy.getDescendants().forEach(function(block){
				if ( block.type === 'purchase' ) {
					purchases.push(block);
				}
			});
			purchases.forEach(function(purchase){
				purchase.getField('PURCHASE_LIST').setValue(firstOption.condition);
			});
		}
	}
};

var StorageManager = function StorageManager(){
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

	return {
		addToken: function addToken(token, account_name){
			var tokenList = getTokenList();
			var index = findToken(token);
			if ( index < 0 ) {
				tokenList.push({
					account_name: account_name,
					token: token
				});
				setTokenList(tokenList);
			}
		},
		removeToken: function removeToken(token){
			var tokenList = getTokenList();
			var index = findToken(token);
			if ( index > -1 ) {
				tokenList.splice(index, 1);
				setTokenList(tokenList);
			}
		},
		getTokenList: getTokenList,
		findtoken: findToken,
	};	
};

Bot.utils.storageManager = StorageManager();
