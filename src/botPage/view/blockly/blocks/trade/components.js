import config from '../../../../common/const';
import { translate } from '../../../../../common/i18n';
import { oppositesToDropdown } from '../../utils';
import { caution } from '../images';
import { getTradeType } from './tools';
import { fieldGeneratorMapping } from '../shared';

export const marketDropdown = block => {
    block
        .appendDummyInput('MARKETDEFINITION')
        .appendField(`${translate('Market')}:`)
        .appendField(new Blockly.FieldDropdown(fieldGeneratorMapping.MARKET_LIST()), 'MARKET_LIST')
        .appendField('>')
        .appendField(new Blockly.FieldDropdown(fieldGeneratorMapping.SUBMARKET_LIST(block)), 'SUBMARKET_LIST')
        .appendField('>')
        .appendField(new Blockly.FieldDropdown(fieldGeneratorMapping.SYMBOL_LIST(block)), 'SYMBOL_LIST');
};

export const tradeTypeDropdown = block => {
    block
        .appendDummyInput('TRADETYPEDEFINITION')
        .appendField(`${translate('Trade Type')}:`)
        .appendField(new Blockly.FieldDropdown(fieldGeneratorMapping.TRADETYPECAT_LIST(block)), 'TRADETYPECAT_LIST')
        .appendField('>')
        .appendField(new Blockly.FieldDropdown(fieldGeneratorMapping.TRADETYPE_LIST(block)), 'TRADETYPE_LIST');
};

export const contractTypes = block => {
    if (!block.getInput('CONTRACT_TYPE')) {
        const getContractTypes = () => {
            const tradeType = block.getFieldValue('TRADETYPE_LIST');
            if (tradeType) {
                return [[translate('Both'), 'both'], ...oppositesToDropdown(config.opposites[tradeType.toUpperCase()])];
            }
            return [['', '']];
        };
        block
            .appendDummyInput('CONTRACT_TYPE')
            .appendField(translate('Contract Type:'))
            .appendField(new Blockly.FieldDropdown(getContractTypes), 'TYPE_LIST');
    }
};

export const candleInterval = block => {
    if (!block.getInput('CANDLE_INTERVAL')) {
        block
            .appendDummyInput('CANDLE_INTERVAL')
            .appendField(translate('Default Candle Interval:'))
            .appendField(new Blockly.FieldDropdown(config.candleIntervals.slice(1)), 'CANDLEINTERVAL_LIST');
    }
};

export const duration = block => {
    if (!block.getInput('DURATION')) {
        const getDurationTypes = () => {
            const tradeType = getTradeType(block);
            if (tradeType) {
                return config.durationTypes[tradeType.toUpperCase()];
            }
            return [[translate('Ticks'), 't']];
        };
        block
            .appendValueInput('DURATION')
            .setCheck('Number')
            .appendField(translate('Duration:'))
            .appendField(new Blockly.FieldDropdown(getDurationTypes), 'DURATIONTYPE_LIST');
    }
};

export const payout = block => {
    if (!block.getInput('AMOUNT')) {
        block
            .appendValueInput('AMOUNT')
            .setCheck('Number')
            .appendField(`${translate('Stake')}:`)
            .appendField(new Blockly.FieldDropdown(config.lists.CURRENCY), 'CURRENCY_LIST');
    }
};

export const barrierOffset = block => {
    if (!block.getInput('BARRIEROFFSET')) {
        block
            .appendValueInput('BARRIEROFFSET')
            .setCheck('Number')
            .appendField(`${translate('Barrier Offset')} 1:`)
            .appendField(new Blockly.FieldDropdown(config.barrierTypes), 'BARRIEROFFSETTYPE_LIST');
    }
};

export const secondBarrierOffset = block => {
    if (!block.getInput('SECONDBARRIEROFFSET')) {
        block
            .appendValueInput('SECONDBARRIEROFFSET')
            .setCheck('Number')
            .appendField(`${translate('Barrier Offset')} 2:`)
            .appendField(new Blockly.FieldDropdown(config.barrierTypes), 'SECONDBARRIEROFFSETTYPE_LIST');
    }
};

export const prediction = block => {
    if (!block.getInput('PREDICTION')) {
        block
            .appendValueInput('PREDICTION')
            .setCheck('Number')
            .appendField(translate('Prediction:'));
    }
};

export const restart = block => {
    block
        .appendDummyInput()
        .appendField(`${translate('Restart buy/sell on error')}`)
        .appendField(`(${translate('disable for better performance')}):`)
        .appendField(new Blockly.FieldCheckbox('FALSE'), 'TIME_MACHINE_ENABLED');
    block
        .appendDummyInput()
        .appendField(`${translate('Restart last trade on error')}`)
        .appendField(`(${translate('bot ignores the unsuccessful trade')}):`)
        .appendField(new Blockly.FieldCheckbox('TRUE'), 'RESTARTONERROR')
        .appendField(new Blockly.FieldImage(caution, 15, 15, '!'));
};
