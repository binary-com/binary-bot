// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#2jo335
import { insideStrategy } from '../../relationChecker';
import { translator } from '../../../../../common/translator';

Blockly.Blocks.tick = {
  init: function init() {
    this.appendDummyInput()
      .appendField(translator.translateText('Last Tick'));
    this.setOutput(true, 'Number');
    this.setColour('#f2f2f2');
    this.setTooltip(translator.translateText('Returns the tick value received by a strategy block'));
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  },
  onchange: function onchange(ev) {
    insideStrategy(this, ev, 'Tick Value');
  },
};
