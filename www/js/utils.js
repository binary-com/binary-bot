Bot.utils = {};
Bot.utils.showError = function showError(message){
	$.notify(message, {
		position: 'bottom right',
		className: 'error',
	});
	console.log('Error: ' + message);
};
Bot.utils.log = function log(message, notify_type) {
	if ( notify_type !== undefined ) {
		$.notify(message, {
			position: 'bottom right',
			className: notify_type,
		});
	}
	console.log(message);
}
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

Bot.utils.findTopParentBlock = function findTopParentBlock(block) {
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

Bot.utils.updateTokenList = function updateTokenList(tokenToAdd){
	var tokenList = Bot.utils.storageManager.getTokenList();
	if ( tokenList.length === 0 ) {
		Bot.server.accounts = [['Please add a token first', '']];
		Blockly.getMainWorkspace().getBlockById('trade').getField('ACCOUNT_LIST').setValue('');
		Blockly.getMainWorkspace().getBlockById('trade').getField('ACCOUNT_LIST').setText('Please add a token first');
	} else {
		Bot.server.accounts = [];
		tokenList.forEach(function(tokenInfo){
			Bot.server.accounts.push([tokenInfo.account_name, tokenInfo.token]);
		});
		var tokenInfoToAdd = tokenList[0];
		if ( tokenToAdd !== undefined ) {
			var tokenInfoIndex = Bot.utils.storageManager.findToken(tokenToAdd);
			if (tokenInfoIndex >= 0){
				tokenInfoToAdd = tokenList[tokenInfoIndex];
			}
		}
		if ( Blockly.getMainWorkspace().getBlockById('trade').getField('ACCOUNT_LIST').getValue() !== tokenInfoToAdd.token ) {
			Blockly.getMainWorkspace().getBlockById('trade').getField('ACCOUNT_LIST').setValue(tokenInfoToAdd.token);
		}
		if ( Blockly.getMainWorkspace().getBlockById('trade').getField('ACCOUNT_LIST').getText() !== tokenInfoToAdd.account_name ) {
			Blockly.getMainWorkspace().getBlockById('trade').getField('ACCOUNT_LIST').setText(tokenInfoToAdd.account_name);
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
			findToken: findToken,
	};	
};

Bot.utils.storageManager = StorageManager();

Bot.utils.addPurchaseOptions = function addPurchaseOptions(){
	var firstOption = {};
	var secondOption = {};
	var strategy = Blockly.getMainWorkspace().getBlockById('strategy');
	var trade = Blockly.getMainWorkspace().getBlockById('trade');
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
		if ( strategy !== null ) {
			var purchases = [];
			strategy.getDescendants().forEach(function(block){
				if ( block.type === 'purchase' ) {
					purchases.push(block);
				}
			});
			purchases.forEach(function(purchase){
				var value = purchase.getField('PURCHASE_LIST').getValue();
				if ( value !== firstOption.condition && value !== secondOption.condition ) {
					purchase.getField('PURCHASE_LIST').setValue(firstOption.condition);
				}
				var text = purchase.getField('PURCHASE_LIST').getText();
				if ( text !== firstOption.name && text !== secondOption.name ) {
					purchase.getField('PURCHASE_LIST').setText(firstOption.name);
				}
			});
		}
	}
};

Bot.utils.unplugErrors = {
	trade: function trade(_trade, ev){
		if ( _trade.childBlocks_.length > 0 && Bot.config.ticktrade_markets.indexOf(_trade.childBlocks_[0].type) < 0 ) {
			Bot.utils.log('The trade block can only accept submarket blocks', 'warning');
			Array.prototype.slice.apply(_trade.childBlocks_).forEach(function(child){
				child.unplug();
			});
		} else if ( _trade.childBlocks_.length > 0 ){
			Bot.utils.unplugErrors.submarket(_trade.childBlocks_[0], ev);
			if ( ev.hasOwnProperty('newInputName') ) {
				Bot.utils.addPurchaseOptions();
			}
		}
		var topParent = Bot.utils.findTopParentBlock(_trade);
		if ( topParent !== null ) {
			if ( Bot.config.ticktrade_markets.indexOf(topParent.type) >= 0 || topParent.id === 'strategy' || topParent.id === 'finish' ) {
				Bot.utils.log('The trade block cannot be inside binary blocks', 'warning');
				_trade.unplug();
			}
		}
	},
	submarket: function submarket(_submarket, ev){
		if ( _submarket.childBlocks_.length > 0 && Bot.config.conditions.indexOf(_submarket.childBlocks_[0].type) < 0 ) {
			Bot.utils.log('Submarket blocks can only accept condition blocks', 'warning');
			Array.prototype.slice.apply(_submarket.childBlocks_).forEach(function(child){
				child.unplug();
			});
		} else if ( _submarket.childBlocks_.length > 0 ){
			Bot.utils.unplugErrors.condition(_submarket.childBlocks_[0], ev);
		}
		if ( _submarket.parentBlock_ !== null) {
			if ( _submarket.parentBlock_.type !== 'trade' ) {
				Bot.utils.log('Submarket blocks have to be added to the trade block', 'warning');
				_submarket.unplug();
			}
		}
	},
	condition: function condition(_condition, ev){
		if ( _condition.parentBlock_ !== null ) {
			if ( Bot.config.ticktrade_markets.indexOf(_condition.parentBlock_.type) < 0 ) {
				Bot.utils.log('Condition blocks have to be added to submarket blocks', 'warning');
				_condition.unplug();
			}
		}
	},
	purchase: function purchase(_purchase, ev) {
    var topParent = Bot.utils.findTopParentBlock(_purchase);
    if ( topParent !== null && topParent.id !== 'strategy' ) {
			Bot.utils.log('Purchase blocks have to be added inside the strategy block', 'warning');
      _purchase.unplug();
    }
	},
	trage_again: function trade_again(_trade_again, ev) {
    var topParent = Bot.utils.findTopParentBlock(_trade_again);
    if ( topParent !== null && topParent.id !== 'finish' ) {
			Bot.utils.log('Purchase blocks have to be added inside the finish block', 'warning');
      _trade_again.unplug();
    }
	},
};
