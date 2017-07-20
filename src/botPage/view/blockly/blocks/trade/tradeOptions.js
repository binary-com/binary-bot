import { translate } from '../../../../../common/i18n';
import config from '../../../../common/const';
import { insideTrade } from '../../relationChecker';
import { expectValue } from '../shared';
import { findTopParentBlock } from '../../utils';
import { setInputList, updateInputList } from './tools';

export default () => {
    Blockly.Blocks.tradeOptions = {
        init: function init() {
            setInputList(this);
            this.setPreviousStatement(true, 'TradeOptions');
            this.setColour('#f2f2f2');
        },
        onchange: function onchange(ev) {
            insideTrade(this, ev, translate('Trade Options'));
            if (ev.group === 'BackwardCompatibility') {
                return;
            }
            if ([Blockly.Events.CREATE, Blockly.Events.CHANGE].includes(ev.type)) {
                updateInputList(this);
            }
            if (ev.name === 'TRADETYPE_LIST') {
                if (ev.newValue) {
                    updateInputList(this);
                    this.setFieldValue(config.durationTypes[ev.newValue.toUpperCase()][0][1], 'DURATIONTYPE_LIST');
                } else {
                    this.setFieldValue('', 'DURATIONTYPE_LIST');
                }
            }
        },
    };
    Blockly.JavaScript.tradeOptions = block => {
        const durationValue = expectValue(block, 'DURATION');
        const durationType = block.getFieldValue('DURATIONTYPE_LIST');
        const currency = block.getFieldValue('CURRENCY_LIST');
        const amount = expectValue(block, 'AMOUNT');
        const tradeDefBlock = findTopParentBlock(block);
        if (!tradeDefBlock) {
            return '';
        }
        const oppositesName = tradeDefBlock.getFieldValue('TRADETYPE_LIST').toUpperCase();
        let predictionValue = 'undefined';
        let barrierOffsetValue = 'undefined';
        let secondBarrierOffsetValue = 'undefined';
        if (config.hasPrediction.indexOf(oppositesName) > -1) {
            predictionValue = expectValue(block, 'PREDICTION');
        }
        if (
            config.hasBarrierOffset.indexOf(oppositesName) > -1 ||
            config.hasSecondBarrierOffset.indexOf(oppositesName) > -1
        ) {
            const barrierOffsetType = block.getFieldValue('BARRIEROFFSETTYPE_LIST');
            const value = expectValue(block, 'BARRIEROFFSET');
            barrierOffsetValue = `${barrierOffsetType}${value}`;
        }
        if (config.hasSecondBarrierOffset.indexOf(oppositesName) > -1) {
            const barrierOffsetType = block.getFieldValue('SECONDBARRIEROFFSETTYPE_LIST');
            const value = expectValue(block, 'SECONDBARRIEROFFSET');
            secondBarrierOffsetValue = `${barrierOffsetType}${value}`;
        }
        const code = `
        Bot.start({
          limitations: BinaryBotPrivateLimitations,
          duration: ${durationValue},
          duration_unit: '${durationType}',
          currency: '${currency}',
          amount: ${amount},
          prediction: ${predictionValue},
          barrierOffset: ${barrierOffsetValue},
          secondBarrierOffset: ${secondBarrierOffsetValue},
        });
      `;
        return code;
    };
};
