'use strict';
// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#pbvgpo
var globalBlockly = require('blockly');
var Blockly = require('../../../blockly');
var blockly = new Blockly();
var relationChecker = require('../../relationChecker');
var Translator = require('translator');
var translator = new Translator();

globalBlockly.Blocks.purchase = {
	init: function() {
		this.appendDummyInput()
			.appendField(translator.translateText("Purchase"))
			.appendField(new globalBlockly.FieldDropdown(function(){
				return blockly.getPurchaseChoices();
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
