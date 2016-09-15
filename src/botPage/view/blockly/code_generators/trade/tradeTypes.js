import config from '../../../../../common/const';
import { translator } from '../../../../../common/translator';

export default () => {
  for (const opposites of Object.keys(config.opposites)) {
    Blockly.JavaScript[opposites.toLowerCase()] = function condition(block) {
      const duration = Blockly.JavaScript.valueToCode(block, 'DURATION', Blockly.JavaScript.ORDER_ATOMIC);
      const durationType = block.getFieldValue('DURATIONTYPE_LIST');
      const payouttype = block.getFieldValue('PAYOUTTYPE_LIST');
      const currency = block.getFieldValue('CURRENCY_LIST');
      const amount = Blockly.JavaScript.valueToCode(block, 'AMOUNT', Blockly.JavaScript.ORDER_ATOMIC);
      let prediction;
      let barrierOffset;
      let secondBarrierOffset;
      if (config.hasPrediction.indexOf(opposites) > -1) {
        prediction = Blockly.JavaScript.valueToCode(block, 'PREDICTION', Blockly.JavaScript.ORDER_ATOMIC);
        if (prediction === '') {
					throw Error(translator.translateText('All trade types are required'));
        }
      }
      if (config.hasBarrierOffset.indexOf(opposites) > -1 || config.hasSecondBarrierOffset.indexOf(opposites) > -1) {
        barrierOffset = Blockly.JavaScript.valueToCode(block, 'BARRIEROFFSET', Blockly.JavaScript.ORDER_ATOMIC);
        if (barrierOffset === '') {
					throw Error(translator.translateText('All trade types are required'));
        }
      }
      if (config.hasSecondBarrierOffset.indexOf(opposites) > -1) {
        secondBarrierOffset = Blockly.JavaScript.valueToCode(block, 'SECONDBARRIEROFFSET', Blockly.JavaScript.ORDER_ATOMIC);
        if (secondBarrierOffset === '') {
					throw Error(translator.translateText('All trade types are required'));
        }
      }
      if (opposites === '' || duration === '' || payouttype === '' || currency === '' || amount === '') {
        throw Error(translator.translateText('All trade types are required'));
      }
      const code = '{\n' +
      'condition: \'' + opposites + '\',\n' +
      'duration: ' + duration + ',\n' +
      'duration_unit: \'' + durationType + '\',\n' +
      'basis: \'' + payouttype + '\',\n' +
      'currency: \'' + currency + '\',\n' +
      'amount: (' + amount + ').toFixed(2),\n' +
			((config.hasPrediction.indexOf(opposites) > -1 && prediction !== '')
				? 'barrier: ' + prediction + ',\n' : '') +
					((config.hasSecondBarrierOffset.indexOf(opposites) > -1
						|| (config.hasBarrierOffset.indexOf(opposites) > -1 && barrierOffset !== ''))
						? 'barrier: \'' + barrierOffset + '\',\n' : '') +
				((config.hasSecondBarrierOffset.indexOf(opposites) > -1 && secondBarrierOffset !== '')
					? 'barrier2: \'' + secondBarrierOffset + '\',\n' : '');
      return code;
    };
  }
};
