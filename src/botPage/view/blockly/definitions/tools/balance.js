// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#kqvz7z
import { translator } from '../../../../../common/translator';

Blockly.Blocks.balance = {
  init: function() {
    this.appendDummyInput()
      .appendField(translator.translateText('Balance:'))
			.appendField(new Blockly.FieldDropdown([
				[translator.translateText('string'), 'STR'],
				[translator.translateText('number'), 'NUM'],
			]), 'BALANCE_TYPE');
    this.setOutput(true, null);
    this.setColour('#dedede');
    this.setTooltip(translator.translateText('Get balance number or string'));
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  },
};
