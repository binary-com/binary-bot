'use strict';
// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#pbvgpo
import Utils from '../../../blockly/utils';
var utils = new Utils();
import relationChecker from '../../relationChecker';
import Translator from 'translator';
var translator = new Translator();

Blockly.Blocks.purchase = {
	init: function() {
		this.appendDummyInput()
			.appendField(translator.translateText("Purchase"))
			.appendField(new Blockly.FieldDropdown(function(){
				return utils.getPurchaseChoices();
			}), "PURCHASE_LIST");
		this.setPreviousStatement(true, 'Purchase');
		this.setColour("#f2f2f2");
		this.setTooltip(translator.translateText('Purchases a chosen contract. Accepts index to choose between the contracts.'));
		this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
	},
	onchange: function(ev) {
		relationChecker.inside_strategy(this, ev, 'Purchase');
	},
};
