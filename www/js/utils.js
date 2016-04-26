Bot.utils = (function Utils(){
	var relationChecker = new Bot.RelationChecker();
	var storageManager = new Bot.StorageManager();
	
	var getUTCTime = function getUTCTime(date){
		var dateObject = new Date(date);
		return ('0' + dateObject.getUTCHours()).slice(-2) + ':' 
			+ ('0' + dateObject.getUTCMinutes()).slice(-2) + ':' 
			+ ('0' + dateObject.getUTCSeconds()).slice(-2);
	};

	var showError = function showError(error){
		if ( error.stack ){
			if (Bot.debug) {
				console.log('%c ' + error.stack, 'color: red');	
			}
		}
		var message;
		if ( error.message) {
			message = error.message;
		} else {
			message = error;
		}
		$.notify(message, {
			position: 'bottom right',
			className: 'error',
		});
		if (Bot.debug) {
			console.log('%c Error: ' + message, 'color: red');
		}
	};

	var log = function log(message, notify_type, position) {
		if ( notify_type !== undefined ) {
			$.notify(message, {
				position: (position === undefined)? 'bottom right': position,
				className: notify_type,
			});
		}
		if (Bot.debug) {
			console.log(message);
		}
	};

	var broadcast = function broadcast(eventName, data) {
		window.dispatchEvent(new CustomEvent(eventName, {detail: data}));
	};

	var chooseByIndex = function chooseByIndex(caps_name, index, list){
		list = ( typeof list === 'undefined' ) ? Bot.config.lists[caps_name] : list;
		index = parseInt(index);
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

	var findTopParentBlock = function findTopParentBlock(block) {
		var pblock = block.parentBlock_;
		if ( pblock === null ) {
			return null;
		}
		while ( pblock !== null ) {
			block = pblock;
			pblock = block.parentBlock_;
		}
		return block;
	};

	var updateTokenList = function updateTokenList(tokenToAdd){
		var tokenList = storageManager.getTokenList();
		Blockly.WidgetDiv.hideIfOwner(Blockly.mainWorkspace.getBlockById('trade').getField('ACCOUNT_LIST'));
		if ( tokenList.length === 0 ) {
			Bot.server.accounts = [['Please add a token first', '']];
			Blockly.mainWorkspace.getBlockById('trade').getField('ACCOUNT_LIST').setValue('');
			Blockly.mainWorkspace.getBlockById('trade').getField('ACCOUNT_LIST').setText('Please add a token first');
		} else {
			Bot.server.accounts = [];
			tokenList.forEach(function(tokenInfo){
				Bot.server.accounts.push([tokenInfo.account_name, tokenInfo.token]);
			});
			var tokenInfoToAdd = tokenList[0];
			if ( tokenToAdd !== undefined ) {
				var tokenInfoIndex = storageManager.findToken(tokenToAdd);
				if (tokenInfoIndex >= 0){
					tokenInfoToAdd = tokenList[tokenInfoIndex];
				}
			}
			if ( Blockly.mainWorkspace.getBlockById('trade').getField('ACCOUNT_LIST').getValue() !== tokenInfoToAdd.token ) {
				Blockly.mainWorkspace.getBlockById('trade').getField('ACCOUNT_LIST').setValue(tokenInfoToAdd.token);
			}
			if ( Blockly.mainWorkspace.getBlockById('trade').getField('ACCOUNT_LIST').getText() !== tokenInfoToAdd.account_name ) {
				Blockly.mainWorkspace.getBlockById('trade').getField('ACCOUNT_LIST').setText(tokenInfoToAdd.account_name);
			}
		}
	};

	var getStorageManager = function getStorageManager(){
		return storageManager;
	};

	var addPurchaseOptions = function addPurchaseOptions(){
		var firstOption = {};
		var secondOption = {};
		var trade = Blockly.mainWorkspace.getBlockById('trade');
		if ( trade !== null && trade.getInputTargetBlock('SUBMARKET') !== null && trade.getInputTargetBlock('SUBMARKET').getInputTargetBlock('CONDITION') !== null) {
			var condition_type = trade.getInputTargetBlock('SUBMARKET').getInputTargetBlock('CONDITION').type;
			var opposites = Bot.config.opposites[condition_type.toUpperCase()];
			Bot.server.purchase_choices = [];
			opposites.forEach(function(option, index){
				if ( index === 0 ) {
					firstOption = {
						condition: Object.keys(option)[0],
				name: option[Object.keys(option)[0]],
					};
				} else {
					secondOption = {
						condition: Object.keys(option)[0],
				name: option[Object.keys(option)[0]],
					};
				}
				Bot.server.purchase_choices.push([option[Object.keys(option)[0]], Object.keys(option)[0]]);
			});
			var purchases = [];
			Blockly.mainWorkspace.getAllBlocks().forEach(function(block){
				if ( block.type === 'purchase' ) {
					purchases.push(block);
				}
			});
			purchases.forEach(function(purchase){
				var value = purchase.getField('PURCHASE_LIST').getValue();
				Blockly.WidgetDiv.hideIfOwner(purchase.getField('PURCHASE_LIST'));
				if ( value === firstOption.condition ) {
					purchase.getField('PURCHASE_LIST').setText(firstOption.name);
				} else if ( value === secondOption.condition ) {
					purchase.getField('PURCHASE_LIST').setText(secondOption.name);
				} else {
					purchase.getField('PURCHASE_LIST').setValue(firstOption.condition);
					purchase.getField('PURCHASE_LIST').setText(firstOption.name);
				}
			});
		}
	};

	var getRelationChecker = function getRelationChecker(){
		return relationChecker;
	};

	return {
		showError: showError,
		log: log,
		getUTCTime: getUTCTime,
		broadcast: broadcast,
		chooseByIndex: chooseByIndex,
		findTopParentBlock: findTopParentBlock,
		updateTokenList: updateTokenList,
		getStorageManager: getStorageManager,
		addPurchaseOptions: addPurchaseOptions,
		getRelationChecker: getRelationChecker,
	};
})();
