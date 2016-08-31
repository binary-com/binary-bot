'use strict';
// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#pbvgpo
import { utils } from '../../../blockly/utils';
import RelationChecker from '../../relationChecker';
import { translator } from '../../../../../common/translator';


Blockly.Blocks.payout = {
	init: function() {
		this.appendDummyInput()
			.appendField(translator.translateText("Payout"))
			.appendField(new Blockly.FieldDropdown(function(){
				return utils.getPurchaseChoices();
			}), "PURCHASE_LIST");
		this.setOutput(true, 'Number');
		this.setColour("#f2f2f2");
		this.setTooltip(translator.translateText('Payout for selected proposal'));
		this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
	},
	onchange: function(ev) {
		var relationChecker = new RelationChecker();
		relationChecker.inside_strategy(this, ev, 'Payout');
	},
};
