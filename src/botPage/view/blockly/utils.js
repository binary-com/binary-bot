'use strict';
import config from '../../../common/const';
import { translator } from '../../../common/translator';

var Utils = function Utils(){
	if ( Utils.instance ){
		return Utils.instance;
	}
	Utils.instance = this;
	this.purchase_choices = [[translator.translateText('Click to select'), '']];
};

Utils.prototype = Object.create(null, {
	getPurchaseChoices: {
		value: function getPurchaseChoices(){
			return this.purchase_choices;
		}
	},
	findTopParentBlock: {
		value: function findTopParentBlock(block) {
			var pblock = block.parentBlock_;
			if (pblock === null) {
				return null;
			}
			while (pblock !== null ) {
				if ( pblock.type === 'trade' ) {
					return pblock;
				}
				block = pblock;
				pblock = block.parentBlock_;
			}
			return block;
		}
	},
	addPurchaseOptions: {
		value: function addPurchaseOptions() {
			var firstOption = {};
			var secondOption = {};
			var trade = Blockly.mainWorkspace.getBlockById('trade');
			if (trade !== null && trade.getInputTargetBlock('SUBMARKET') !== null && trade.getInputTargetBlock('SUBMARKET')
				.getInputTargetBlock('CONDITION') !== null) {
				var condition_type = trade.getInputTargetBlock('SUBMARKET')
					.getInputTargetBlock('CONDITION')
					.type;
				var opposites = config.opposites[condition_type.toUpperCase()];
				this.purchase_choices = [];
				var that = this;
				opposites.forEach(function (option, index) {
					if (index === 0) {
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
					that.purchase_choices.push([option[Object.keys(option)[0]], Object.keys(option)[0]]);
				});
				var purchases = [];
				Blockly.mainWorkspace.getAllBlocks()
					.forEach(function (block) {
						if (['purchase', 'payout', 'ask_price'].indexOf(block.type) >= 0) {
							purchases.push(block);
						}
					});
				purchases.forEach(function (purchase) {
					var value = purchase.getField('PURCHASE_LIST')
						.getValue();
					Blockly.WidgetDiv.hideIfOwner(purchase.getField('PURCHASE_LIST'));
					if (value === firstOption.condition) {
						purchase.getField('PURCHASE_LIST')
							.setText(firstOption.name);
					} else if (value === secondOption.condition) {
						purchase.getField('PURCHASE_LIST')
							.setText(secondOption.name);
					} else {
						purchase.getField('PURCHASE_LIST')
							.setValue(firstOption.condition);
						purchase.getField('PURCHASE_LIST')
							.setText(firstOption.name);
					}
				});
			}
		}
	},
});

module.exports = Utils;
