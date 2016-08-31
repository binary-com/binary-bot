import Observer from 'binary-common-utils/observer';
import tools from 'binary-common-utils/tools';
import config from '../../../common/const';
import { bot } from '../../bot';
import { translator } from '../../../common/translator';
import { utils } from './utils';

var isInteger = function isInteger(amount) {
	return !isNaN(+amount) && parseInt(amount) === parseFloat(amount);
};

var isInRange = function isInRange(amount, min, max) {
	return !isNaN(+amount) && +amount >= min && +amount <= max;
};

var getNumField = function getNumField(block, fieldName) {
	var field = block.getInputTargetBlock(fieldName);
	if (field !== null && field.type === 'math_number') {
		field = field.getFieldValue('NUM')
			.trim();
		return field;
	}
	return '';
};

var getListField = function getListField(block, fieldName) {
	return block.getFieldValue(fieldName);
};

var RelationChecker = function RelationChecker(){
	if ( RelationChecker.instance ) {
		return RelationChecker.instance;
	}
	RelationChecker.instance = this;
	this.observer = new Observer();
};

RelationChecker.prototype = Object.create(null, {
	trade: {
		value: function trade(_trade, ev) {
			if (ev.type === 'create') {
				if (bot.symbol.findSymbol(Blockly.mainWorkspace.getBlockById(ev.blockId).type)) {
					this.observer.emit('tour:submarket_created');
				}
				if (config.conditions.indexOf(Blockly.mainWorkspace.getBlockById(ev.blockId)
						.type) >= 0) {
					this.observer.emit('tour:condition_created');
				}
				if (Blockly.mainWorkspace.getBlockById(ev.blockId)
					.type === 'math_number') {
					this.observer.emit('tour:number');
				}
				if (Blockly.mainWorkspace.getBlockById(ev.blockId)
					.type === 'purchase') {
					this.observer.emit('tour:purchase_created');
				}
				if (Blockly.mainWorkspace.getBlockById(ev.blockId)
					.type === 'trade_again') {
					this.observer.emit('tour:trade_again_created');
				}
			}
			if (_trade.childBlocks_.length && !bot.symbol.findSymbol(_trade.childBlocks_[0].type)) {
				this.observer.emit('ui.log.warn', translator.translateText('The trade block can only accept submarket blocks'));
				Array.prototype.slice.apply(_trade.childBlocks_)
					.forEach(function (child) {
						child.unplug();
					});
			} else if (_trade.childBlocks_.length > 0) {
				this.submarket(_trade.childBlocks_[0], ev);
				this.observer.emit('tour:submarket');
				if (ev.hasOwnProperty('newInputName')) {
					utils.addPurchaseOptions();
				}
			}
			var topParent = utils.findTopParentBlock(_trade);
			if (topParent !== null) {
				if (bot.symbol.findSymbol(topParent.type) || topParent.type === 'on_strategy' || topParent.type === 'on_finish') {
					this.observer.emit('ui.log.warn', translator.translateText('The trade block cannot be inside binary blocks'));
					_trade.unplug();
				}
			}
		}
	},
	submarket: {
		value: function submarket(_submarket, ev) {
			if (_submarket.childBlocks_.length > 0 && config.conditions.indexOf(_submarket.childBlocks_[0].type) < 0) {
				this.observer.emit('ui.log.warn', translator.translateText('Submarket blocks can only accept trade type blocks'));
				Array.prototype.slice.apply(_submarket.childBlocks_)
					.forEach(function (child) {
						child.unplug();
					});
			} else if (_submarket.childBlocks_.length > 0) {
				this.condition(_submarket.childBlocks_[0], ev, true);
			}
			if (_submarket.parentBlock_ !== null) {
				if (_submarket.parentBlock_.type !== 'trade') {
					this.observer.emit('ui.log.warn', translator.translateText('Submarket blocks have to be added to the trade block'));
					_submarket.unplug();
				}
			}
		}
	},
	condition: {
		value: function condition(_condition, ev, calledByParent) {
			if (_condition.parentBlock_ !== null) {
				if (!bot.symbol.findSymbol(_condition.parentBlock_.type)) {
					this.observer.emit('ui.log.warn', translator.translateText('Trade Type blocks have to be added to submarket blocks'));
					_condition.unplug();
				} else if ( !bot.symbol.isConditionAllowedInSymbol(_condition.parentBlock_.type, _condition.type) ){
					var symbol = bot.symbol.findSymbol(_condition.parentBlock_.type);
					this.observer.emit('ui.log.warn', symbol[Object.keys(symbol)[0]] + ' ' + translator.translateText('does not support category:') + 
						' ' + bot.symbol.getCategoryNameForCondition(_condition.type) +
						', ' + translator.translateText('Allowed categories are') + ' ' + bot.symbol.getAllowedCategoryNames(_condition.parentBlock_.type));
					_condition.unplug();
				} else {
					this.observer.emit('tour:condition');
					if (!calledByParent) {
						if ((ev.type === 'change' && ev.element && ev.element === 'field') || (ev.type === 'move' && typeof ev.newInputName === 'string')) {
							var duration = getNumField(_condition, 'DURATION');
							var durationType = getListField(_condition, 'DURATIONTYPE_LIST');
							if ( duration !== '' ) {
								var minDuration = bot.symbol.getLimitation(_condition.parentBlock_.type, _condition.type).minDuration;
								if ( !tools.durationAccepted(duration+durationType, minDuration) ) {
									this.observer.emit('ui.log.warn', translator.translateText('Minimum duration is') + ' ' + tools.expandDuration(minDuration) );
								} else {
									this.observer.emit('tour:ticks');
								}
								if (durationType === 't') {
									if (!isInteger(duration) || !isInRange(duration, 5, 10)) {
										this.observer.emit('ui.log.warn', translator.translateText('Number of ticks must be between 5 and 10'));
									} else {
										this.observer.emit('tour:ticks');
									}
								} else {
									if (!isInteger(duration) || duration < 1) {
										this.observer.emit('ui.log.warn', translator.translateText('Expiry time cannot be equal to start time'));
									}
								}
							}
							var prediction = getNumField(_condition, 'PREDICTION');
							if (prediction !== '') {
								if (!isInteger(prediction) || !isInRange(prediction, 0, 9)) {
									this.observer.emit('ui.log.warn', translator.translateText('Prediction must be one digit'));
								}
							}
							for ( var i in _condition.inputList ) {
								if ( _condition.inputList[i].name !== '' && _condition.getInputTargetBlock(_condition.inputList[i].name) === null ) {
									return;
								}
							}
							this.observer.emit('tour:options');
						}
					}
				}
			}
		}
	},
	inside_condition: {
		value: function inside_condition(blockObject, ev, name) {
			var topParent = utils.findTopParentBlock(blockObject);
			if (topParent !== null){
				if (config.conditions.indexOf(blockObject.parentBlock_.type) < 0 && !ev.oldParentId) {
					this.observer.emit('ui.log.warn', name + ' ' + translator.translateText('must be added to the condition block'));
					blockObject.unplug();
				}
			}
		}
	},
	inside_strategy: {
		value: function inside_strategy(blockObject, ev, name) {
			var topParent = utils.findTopParentBlock(blockObject);
			if (topParent !== null){
				if (topParent.type !== 'on_strategy' && !ev.oldParentId) {
					this.observer.emit('ui.log.warn', name + ' ' + translator.translateText('must be added inside the strategy block'));
					blockObject.unplug();
				} else {
					if (blockObject.type === 'purchase') {
						this.observer.emit('tour:purchase');
					}
				}
			}
		}
	},
	inside_finish: {
		value: function inside_finish(blockObject, ev, name) {
			var topParent = utils.findTopParentBlock(blockObject);
			if (topParent !== null){
				if (topParent.type !== 'on_finish' && !ev.oldParentId) {
					this.observer.emit('ui.log.warn', name + ' ' + translator.translateText('must be added inside the finish block'));
					blockObject.unplug();
				} else {
					if (blockObject.type === 'trade_again') {
						this.observer.emit('tour:trade_again');
					}
				}
			}
		}
	}
});

module.exports = RelationChecker;
