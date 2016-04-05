Bot.utils = {};
Bot.utils.dragHandler = function dragHandler(e){
	window.my_dragging = {};
	my_dragging.pageX0 = e.pageX;
	my_dragging.pageY0 = e.pageY;
	my_dragging.elem = this;
	my_dragging.offset0 = $(this).offset();
	function handle_dragging(e){
		var left = my_dragging.offset0.left + (e.pageX - my_dragging.pageX0);
		var top = my_dragging.offset0.top + (e.pageY - my_dragging.pageY0);
		$(my_dragging.elem)
		.offset({top: top, left: left});
	}
	function handle_mouseup(e){
		$('body')
		.off('mousemove', handle_dragging)
		.off('mouseup', handle_mouseup);
	}
	$('body')
	.on('mouseup', handle_mouseup)
	.on('mousemove', handle_dragging);
};
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

Bot.utils.broadcast = function broadcast(eventName, data) {
	window.dispatchEvent(new CustomEvent(eventName, {detail: data}));
};

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
		var purchases = [];
		Blockly.getMainWorkspace().getAllBlocks().forEach(function(block){
			if ( block.type === 'purchase' ) {
				purchases.push(block);
			}
		});
		purchases.forEach(function(purchase){
			var value = purchase.getField('PURCHASE_LIST').getValue();
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

Bot.utils.getNumField = function getNumField(block, fieldName) {
  var field = block.getInputTargetBlock(fieldName);
  if ( field !== null && field.type === 'math_number' ) {
    field = field.getFieldValue('NUM');
    return field;
  }
  return '';
};

Bot.utils.isInteger = function isInteger(amount){
	return !isNaN(+amount) && parseInt(amount) === parseFloat(amount); 
};

Bot.utils.isInRange = function isInRange(amount, min, max) {
	return !isNaN(+amount) && +amount >= min && +amount <= max;
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
			Bot.tutor_event.trigger('tutor_submarket_added');
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
			Bot.utils.unplugErrors.condition(_submarket.childBlocks_[0], ev, true);
		}
		if ( _submarket.parentBlock_ !== null) {
			if ( _submarket.parentBlock_.type !== 'trade' ) {
				Bot.utils.log('Submarket blocks have to be added to the trade block', 'warning');
				_submarket.unplug();
			}
		}
	},
	condition: function condition(_condition, ev, calledByParent){
		if ( _condition.parentBlock_ !== null ) {
			if ( Bot.config.ticktrade_markets.indexOf(_condition.parentBlock_.type) < 0 ) {
				Bot.utils.log('Condition blocks have to be added to submarket blocks', 'warning');
				_condition.unplug();
			} else {
				Bot.tutor_event.trigger('tutor_condition_added');
				if ( !calledByParent) {
					if ( ( ev.type === 'change' && ev.element && ev.element === 'field' ) || ( ev.type === 'move' && typeof ev.newInputName === 'string' ) ){
						var added = []; 
						var duration = Bot.utils.getNumField(_condition, 'DURATION');
						if ( duration !== '' && ( !Bot.utils.isInteger(duration) || !Bot.utils.isInRange(duration, 5, 15) ) ) {
							Bot.utils.log('Ticks has to be an integer between 5 and 15', 'warning');
						} else {
							added.push('DURATION');
						}
						var maximum = (_condition.type === 'asian') ? 10000: 50000;
						var amount = Bot.utils.getNumField(_condition, 'AMOUNT');
						if ( amount !== '' && !Bot.utils.isInRange(amount, 0.35, maximum) ) {
							Bot.utils.log('Ticks has to be an integer between 0.35 and ' + maximum, 'warning');
						} else {
							added.push('AMOUNT');
						}
						var prediction = Bot.utils.getNumField(_condition, 'PREDICTION');
						if ( prediction !== '' && (!Bot.utils.isInteger(prediction) || !Bot.utils.isInRange(prediction, 0, 9) ) ) {
							Bot.utils.log('Prediction has to be one digit', 'warning');
						} else {
							added.push('PREDICTION');
						}
						if ( added.indexOf('AMOUNT') >= 0 && added.indexOf('DURATION') >= 0 ) {
							if ( _condition.inputList.slice(-1)[0].name !== 'PREDICTION' ) {
								if ( added.indexOf('PREDICTION') >= 0 ) {
									Bot.tutor_event.trigger('tutor_condition_options_added');
								}
							} else {
								Bot.tutor_event.trigger('tutor_condition_options_added');
							}
						}
					}
				}
			}
		}
	},
	purchase: function purchase(_purchase, ev) {
    var topParent = Bot.utils.findTopParentBlock(_purchase);
    if ( topParent !== null && ( topParent.id === 'finish' || topParent.id === 'trade' ) ) {
			Bot.utils.log('Purchase blocks have to be added inside the strategy block', 'warning');
      _purchase.unplug();
    } else if ( topParent !== null && topParent.id === 'strategy' ) {
			Bot.tutor_event.trigger('tutor_purchase_added');
		}
	},
	trage_again: function trade_again(_trade_again, ev) {
    var topParent = Bot.utils.findTopParentBlock(_trade_again);
    if ( topParent !== null && ( topParent.id === 'strategy' || topParent.id === 'trade' ) ) {
			Bot.utils.log('Purchase blocks have to be added inside the finish block', 'warning');
      _trade_again.unplug();
    } else if ( topParent !== null && topParent.id === 'finish' ) {
			Bot.tutor_event.trigger('tutor_trade_again_added');
		}
	},
};
