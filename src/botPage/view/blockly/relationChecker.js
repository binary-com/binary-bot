'use strict';
import config from 'const';
import Bot from '../../bot';
import Translator from 'translator';
import Observer from 'binary-common-utils/observer';
import Utils from './utils';
var translator = new Translator();
var bot = new Bot();
var observer = new Observer();
var utils = new Utils();
var getNumField = function getNumField(block, fieldName) {
	var field = block.getInputTargetBlock(fieldName);
	if (field !== null && field.type === 'math_number') {
		field = field.getFieldValue('NUM')
			.trim();
		return field;
	}
	return '';
};

var isInteger = function isInteger(amount) {
	return !isNaN(+amount) && parseInt(amount) === parseFloat(amount);
};

var isInRange = function isInRange(amount, min, max) {
	return !isNaN(+amount) && +amount >= min && +amount <= max;
};

var trade = function trade(_trade, ev) {
	if (ev.type === 'create') {
		if (bot.symbol.findSymbol(Blockly.mainWorkspace.getBlockById(ev.blockId).type)) {
			observer.emit('tour:submarket_created');
		}
		if (config.conditions.indexOf(Blockly.mainWorkspace.getBlockById(ev.blockId)
				.type) >= 0) {
			observer.emit('tour:condition_created');
		}
		if (Blockly.mainWorkspace.getBlockById(ev.blockId)
			.type === 'math_number') {
			observer.emit('tour:number');
		}
		if (Blockly.mainWorkspace.getBlockById(ev.blockId)
			.type === 'purchase') {
			observer.emit('tour:purchase_created');
		}
		if (Blockly.mainWorkspace.getBlockById(ev.blockId)
			.type === 'trade_again') {
			observer.emit('tour:trade_again_created');
		}
	}
	if (_trade.childBlocks_.length && !bot.symbol.findSymbol(_trade.childBlocks_[0].type)) {
		observer.emit('ui.log.warn', translator.translateText('The trade block can only accept submarket blocks'));
		Array.prototype.slice.apply(_trade.childBlocks_)
			.forEach(function (child) {
				child.unplug();
			});
	} else if (_trade.childBlocks_.length > 0) {
		submarket(_trade.childBlocks_[0], ev);
		observer.emit('tour:submarket');
		if (ev.hasOwnProperty('newInputName')) {
			utils.addPurchaseOptions();
		}
	}
	var topParent = utils.findTopParentBlock(_trade);
	if (topParent !== null) {
		if (bot.symbol.findSymbol(topParent.type) || topParent.type === 'on_strategy' || topParent.type === 'on_finish') {
			observer.emit('ui.log.warn', translator.translateText('The trade block cannot be inside binary blocks'));
			_trade.unplug();
		}
	}
};
var submarket = function submarket(_submarket, ev) {
	if (_submarket.childBlocks_.length > 0 && config.conditions.indexOf(_submarket.childBlocks_[0].type) < 0) {
		observer.emit('ui.log.warn', translator.translateText('Submarket blocks can only accept condition blocks'));
		Array.prototype.slice.apply(_submarket.childBlocks_)
			.forEach(function (child) {
				child.unplug();
			});
	} else if (_submarket.childBlocks_.length > 0) {
		condition(_submarket.childBlocks_[0], ev, true);
	}
	if (_submarket.parentBlock_ !== null) {
		if (_submarket.parentBlock_.type !== 'trade') {
			observer.emit('ui.log.warn', translator.translateText('Submarket blocks have to be added to the trade block'));
			_submarket.unplug();
		}
	}
};
var condition = function condition(_condition, ev, calledByParent) {
	if (_condition.parentBlock_ !== null) {
		if (!bot.symbol.findSymbol(_condition.parentBlock_.type)) {
			observer.emit('ui.log.warn', translator.translateText('Condition blocks have to be added to submarket blocks'));
			_condition.unplug();
		} else if ( !bot.symbol.isConditionAllowedInSymbol(_condition.parentBlock_.type, _condition.type) ){
			var symbol = bot.symbol.findSymbol(_condition.parentBlock_.type);
			observer.emit('ui.log.warn', symbol[Object.keys(symbol)[0]] + ' ' + translator.translateText('does not support category:') + 
				' ' + bot.symbol.getCategoryNameForCondition(_condition.type) +
				', ' + translator.translateText('Allowed categories are') + ' ' + bot.symbol.getAllowedCategoryNames(_condition.parentBlock_.type));
			_condition.unplug();
		} else {
			observer.emit('tour:condition');
			if (!calledByParent) {
				if ((ev.type === 'change' && ev.element && ev.element === 'field') || (ev.type === 'move' && typeof ev.newInputName === 'string')) {
					var added = [];
					var duration = getNumField(_condition, 'DURATION');
					if (duration !== '') {
						if (!isInteger(duration) || !isInRange(duration, 5, 15)) {
							observer.emit('ui.log.warn', translator.translateText('Number of ticks must be between 5 and 10'));
						} else {
							observer.emit('tour:ticks');
							added.push('DURATION');
						}
					}
					var amount = getNumField(_condition, 'AMOUNT');
					if (amount !== '') {
						added.push('AMOUNT');
					}
					var prediction = getNumField(_condition, 'PREDICTION');
					if (prediction !== '') {
						if (!isInteger(prediction) || !isInRange(prediction, 0, 9)) {
							observer.emit('ui.log.warn', translator.translateText('Prediction must be one digit'));
						} else {
							added.push('PREDICTION');
						}
					}
					if (added.indexOf('AMOUNT') >= 0 && added.indexOf('DURATION') >= 0) {
						if (_condition.inputList.slice(-1)[0].name === 'PREDICTION') {
							if (added.indexOf('PREDICTION') >= 0) {
								observer.emit('tour:options');
							}
						} else {
							observer.emit('tour:options');
						}
					}
				}
			}
		}
	}
};
var inside_strategy = function inside_strategy(blockObject, ev, name) {
	var topParent = utils.findTopParentBlock(blockObject);
	if (topParent !== null && (topParent.type === 'on_finish' || topParent.type === 'trade')) {
		observer.emit('ui.log.warn', name + ' ' + translator.translateText('must be added inside the strategy block'));
		blockObject.unplug();
	} else if (topParent !== null && topParent.type === 'on_strategy') {
		if (blockObject.type === 'purchase') {
			observer.emit('tour:purchase');
		}
	}
};
var inside_finish = function inside_finish(blockObject, ev, name) {
	var topParent = utils.findTopParentBlock(blockObject);
	if (topParent !== null && (topParent.type === 'on_strategy' || topParent.type === 'trade')) {
		observer.emit('ui.log.warn', name + ' ' + translator.translateText('must be added inside the finish block'));
		blockObject.unplug();
	} else if (topParent !== null && topParent.type === 'on_finish') {
		if (blockObject.type === 'trade_again') {
			observer.emit('tour:trade_again');
		}
	}
};
module.exports = {
	trade: trade,
	submarket: submarket,
	condition: condition,
	inside_strategy: inside_strategy,
	inside_finish: inside_finish,
};
