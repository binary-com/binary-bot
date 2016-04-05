Bot.RelationChecker = function RelationChecker(){

	var getNumField = function getNumField(block, fieldName) {
		var field = block.getInputTargetBlock(fieldName);
		if ( field !== null && field.type === 'math_number' ) {
			field = field.getFieldValue('NUM').trim();
			return field;
		}
		return '';
	};

	var isInteger = function isInteger(amount){
		return !isNaN(+amount) && parseInt(amount) === parseFloat(amount); 
	};

	var isInRange = function isInRange(amount, min, max) {
		return !isNaN(+amount) && +amount >= min && +amount <= max;
	};

	var trade = function trade(_trade, ev){
		if ( ev.type === 'create' ) {
			if ( Bot.config.ticktrade_markets.indexOf(Blockly.getMainWorkspace().getBlockById(ev.blockId).type) >= 0 ){
				Bot.utils.broadcast('tour:submarket_created');
			}
			if ( Bot.config.conditions.indexOf(Blockly.getMainWorkspace().getBlockById(ev.blockId).type) >= 0){
				Bot.utils.broadcast('tour:condition_created');
			}
			if ( Blockly.getMainWorkspace().getBlockById(ev.blockId).type === 'math_number' ){
				Bot.utils.broadcast('tour:number');
			}
			if ( Blockly.getMainWorkspace().getBlockById(ev.blockId).type === 'purchase' ){
				Bot.utils.broadcast('tour:purchase_created');
			}
			if ( Blockly.getMainWorkspace().getBlockById(ev.blockId).type === 'trade_again' ){
				Bot.utils.broadcast('tour:trade_again_created');
			}
		}
		if ( _trade.childBlocks_.length > 0 && Bot.config.ticktrade_markets.indexOf(_trade.childBlocks_[0].type) < 0 ) {
			Bot.utils.log('The trade block can only accept submarket blocks', 'warning');
			Array.prototype.slice.apply(_trade.childBlocks_).forEach(function(child){
				child.unplug();
			});
		} else if ( _trade.childBlocks_.length > 0 ){
			submarket(_trade.childBlocks_[0], ev);
			Bot.utils.broadcast('tour:submarket');
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
	};
	var submarket = function submarket(_submarket, ev){
		if ( _submarket.childBlocks_.length > 0 && Bot.config.conditions.indexOf(_submarket.childBlocks_[0].type) < 0 ) {
			Bot.utils.log('Submarket blocks can only accept condition blocks', 'warning');
			Array.prototype.slice.apply(_submarket.childBlocks_).forEach(function(child){
				child.unplug();
			});
		} else if ( _submarket.childBlocks_.length > 0 ){
			condition(_submarket.childBlocks_[0], ev, true);
		}
		if ( _submarket.parentBlock_ !== null) {
			if ( _submarket.parentBlock_.type !== 'trade' ) {
				Bot.utils.log('Submarket blocks have to be added to the trade block', 'warning');
				_submarket.unplug();
			}
		}
	};
	var condition = function condition(_condition, ev, calledByParent){
		if ( _condition.parentBlock_ !== null ) {
			if ( Bot.config.ticktrade_markets.indexOf(_condition.parentBlock_.type) < 0 ) {
				Bot.utils.log('Condition blocks have to be added to submarket blocks', 'warning');
				_condition.unplug();
			} else {
				Bot.utils.broadcast('tour:condition');
				if ( !calledByParent) {
					if ( ( ev.type === 'change' && ev.element && ev.element === 'field' ) || ( ev.type === 'move' && typeof ev.newInputName === 'string' ) ){
						var added = []; 
						var duration = getNumField(_condition, 'DURATION');
						if ( duration !== '' ) {
							if ( !isInteger(duration) || !isInRange(duration, 5, 15) ) {
								Bot.utils.log('Ticks has to be an integer between 5 and 15', 'warning');
							} else {
								Bot.utils.broadcast('tour:ticks');
								added.push('DURATION');
							}
						}
						var maximum = (_condition.type === 'asian') ? 10000: 50000;
						var amount = getNumField(_condition, 'AMOUNT');
						if ( amount !== '' ) {
							if ( !isInRange(amount, 0.35, maximum) ) {
								Bot.utils.log('Ticks has to be an integer between 0.35 and ' + maximum, 'warning');
							} else {
								added.push('AMOUNT');
							}
						}
						var prediction = getNumField(_condition, 'PREDICTION');
						if ( prediction !== '' ) {
							if ( !isInteger(prediction) || !isInRange(prediction, 0, 9) ) {
								Bot.utils.log('Prediction has to be one digit', 'warning');
							} else {
								added.push('PREDICTION');
							}
						}
						if ( added.indexOf('AMOUNT') >= 0 && added.indexOf('DURATION') >= 0 ) {
							if ( _condition.inputList.slice(-1)[0].name === 'PREDICTION' ) {
								if ( added.indexOf('PREDICTION') >= 0 ) {
									Bot.utils.broadcast('tour:options');
								}
							} else {
								Bot.utils.broadcast('tour:options');
							}
						}
					}
				}
			}
		}
	};
	var purchase = function purchase(_purchase, ev) {
		var topParent = Bot.utils.findTopParentBlock(_purchase);
		if ( topParent !== null && ( topParent.id === 'finish' || topParent.id === 'trade' ) ) {
			Bot.utils.log('Purchase blocks have to be added inside the strategy block', 'warning');
			_purchase.unplug();
		} else if ( topParent !== null && topParent.id === 'strategy' ) {
			Bot.utils.broadcast('tour:purchase');
		}
	};
	var trage_again = function trade_again(_trade_again, ev) {
		var topParent = Bot.utils.findTopParentBlock(_trade_again);
		if ( topParent !== null && ( topParent.id === 'strategy' || topParent.id === 'trade' ) ) {
			Bot.utils.log('Purchase blocks have to be added inside the finish block', 'warning');
			_trade_again.unplug();
		} else if ( topParent !== null && topParent.id === 'finish' ) {
			Bot.utils.broadcast('tour:trade_again');
		}
	};
	return {
		trade: trade,
		submarket: submarket,
		condition: condition,
		purchase: purchase,
		trage_again: trage_again,
	};
};
