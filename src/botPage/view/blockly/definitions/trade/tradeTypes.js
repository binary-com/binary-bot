// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#orvwcx

import config from '../../../../../common/const';
import { condition } from '../../relationChecker';
import { translator } from '../../../../../common/translator';
import { duration, payout, prediction, title, barrierOffset, secondBarrierOffset } from './components';

export default () => {
  for (let opposites of Object.keys(config.opposites)) {
    Blockly.Blocks[opposites.toLowerCase()] = {
      init: function () {
        let optionNames = [];
        for (let options of config.opposites[opposites]) {
          let optionName = options[Object.keys(options)[0]];
          optionNames.push(optionName);
        }
        title(this, opposites, optionNames);
        duration(this, opposites);
        payout(this, opposites);
        if (config.hasPrediction.indexOf(opposites) > -1) {
          prediction(this, opposites);
        }
        if (config.hasBarrierOffset.indexOf(opposites) > -1) {
          barrierOffset(this, opposites);
        }
        if (config.hasSecondBarrierOffset.indexOf(opposites) > -1) {
          barrierOffset(this, opposites, translator.translateText('High Barrier Offset:'));
          window.block = this;
          secondBarrierOffset(this, opposites);
        }
        this.setInputsInline(false);
        this.setPreviousStatement(true, 'Condition');
        this.setColour('#f2f2f2');
				this.setTooltip(translator.translateText('Provides the trade types:') +
					' ' + optionNames[0] + '/' + optionNames[1]);
        this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
      },
      onchange: function (ev) {
        condition(this, ev);
      },
    };
  }
};
