'use strict';
// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#szwuog

import config from '../../../../../common/const';
import { translator } from '../../../../../common/translator';

import { relationChecker } from '../../relationChecker';

Blockly.Blocks.read_ohlc_obj = {
  init: function() {
    this.appendValueInput("OHLCOBJ")
      .setCheck(null)
      .appendField("Candles")
      .appendField(new Blockly.FieldDropdown(config.ohlcFields), "OHLCFIELD_LIST");
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour("#f2f2f2");
    this.setTooltip(translator.translateText('Read a field from a candle (received from Candles list)'));
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  },
  onchange: function(ev) {

    relationChecker.insideStrategy(this, ev, 'Candles');
  },
};
