// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#n3drko
import { translator } from '../../../../../common/translator';
import { relationChecker } from '../../relationChecker';

Blockly.Blocks.direction = {
  init: function() {
    this.appendDummyInput()
      .appendField(translator.translateText('Tick Direction'));
    this.setOutput(true, 'String');
    this.setColour('#f2f2f2');
		this.setTooltip(translator.translateText(`Returns the tick direction received by a strategy block, 
		its value could be 'up' if the tick is more than before, 'down' if less than before 
			and empty ('') if the tick is equal to the previous tick`));
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  },
  onchange: function(ev) {
    relationChecker.insideStrategy(this, ev, 'Tick Direction');
  },
};

