import { setInputList, updateInputList, getTradeType, getSelectedSymbol } from './tools';
import { expectValue, getAvailableDurations } from '../shared';
import { insideTrade } from '../../relationChecker';
import { findTopParentBlock } from '../../utils';
import config from '../../../../common/const';
import { translate } from '../../../../../common/i18n';

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
            if (ev.type === Blockly.Events.CREATE) {
                Blockly.Events.fire(
                    new Blockly.Events.Change(this, 'field', 'SYMBOL_LIST', '', this.getFieldValue('SYMBOL_LIST'))
                );
            }
            if ([Blockly.Events.CREATE, Blockly.Events.CHANGE].includes(ev.type)) {
                updateInputList(this);
            }
            if (ev.name === 'TRADETYPE_LIST') {
                updateInputList(this);
            }
            if (ev.name === 'SYMBOL_LIST' || ev.name === 'TRADETYPE_LIST') {
                if (ev.oldValue !== ev.newValue) {
                    const symbol = getSelectedSymbol(this);
                    const tradeType = getTradeType(this);
                    const durationTypeList = this.getField('DURATIONTYPE_LIST');

                    const prevSelectedDuration = durationTypeList.getValue();
                    this.setFieldValue(translate('Loading...'), 'DURATIONTYPE_LIST');

                    getAvailableDurations(symbol, tradeType).then(durations => {
                        // Prevent UI flickering by only updating field if options have changed
                        // eslint-disable-next-line no-underscore-dangle
                        if (JSON.stringify(durationTypeList.menuGenerator_) !== JSON.stringify(durations)) {
                            durationTypeList.menuGenerator_ = durations; // eslint-disable-line no-underscore-dangle
                        }
                        // Maintain previously selected duration if possible (req for imported strategies)
                        const selectedValue = durationTypeList.menuGenerator_.find(d => d[1] === prevSelectedDuration); // eslint-disable-line no-underscore-dangle
                        const fieldValue = selectedValue ? prevSelectedDuration : durationTypeList.menuGenerator_[0][1]; // eslint-disable-line no-underscore-dangle
                        this.setFieldValue(fieldValue, 'DURATIONTYPE_LIST');
                    });
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
