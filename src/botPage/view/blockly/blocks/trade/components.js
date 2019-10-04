import { caution } from '../images';
import { fieldGeneratorMapping } from '../shared';
import { oppositesToDropdown } from '../../utils';
import config from '../../../../common/const';
import { translate } from '../../../../../common/i18n';

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
            if (tradeType && tradeType !== 'na') {
                return [[translate('Both'), 'both'], ...oppositesToDropdown(config.opposites[tradeType.toUpperCase()])];
            }
            return [[translate('Not available'), 'na']];
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
        block
            .appendValueInput('DURATION')
            .setCheck('Number')
            .appendField(translate('Duration:'))
            .appendField(new Blockly.FieldDropdown([['', '']]), 'DURATIONTYPE_LIST');
    }
};

export const payout = block => {
    if (!block.getInput('AMOUNT')) {
        const amountInput = block.appendValueInput('AMOUNT');

        amountInput.setCheck('Number');

        if (block.type === 'tradeOptions_payout') {
            amountInput.appendField(`${translate('Payout')}:`);
        } else {
            amountInput.appendField(`${translate('Stake')}:`);
        }

        amountInput.appendField(new Blockly.FieldDropdown(config.lists.CURRENCY), 'CURRENCY_LIST');
    }
};

export const barrierOffsetGenerator = (inputName, block) => {
    if (!block.getInput(inputName)) {
        // Determine amount of barrierOffset-blocks on workspace
        const barrierNumber = block.inputList.filter(input => /BARRIEROFFSET$/.test(input.name)).length;

        // Set barrier options according to barrierNumber (i.e. Offset + and Offset -)
        const barrierOffsetList = new Blockly.FieldDropdown(config.barrierTypes);
        barrierOffsetList.prefixField = null;
        barrierOffsetList.menuGenerator_ = config.barrierTypes; // eslint-disable-line no-underscore-dangle
        barrierOffsetList.setValue('');
        barrierOffsetList.setValue(config.barrierTypes[barrierNumber % config.barrierTypes.length][1]);

        block
            .appendValueInput(inputName)
            .setCheck('Number')
            .appendField(`${translate('Barrier')} ${barrierNumber + 1}:`)
            .appendField(barrierOffsetList, `${inputName}TYPE_LIST`);

        const input = block.getInput(inputName);
        input.setVisible(false);
    }
};

export const prediction = block => {
    const inputName = 'PREDICTION';
    if (!block.getInput(inputName)) {
        block
            .appendValueInput(inputName)
            .setCheck('Number')
            .appendField(`${translate('Prediction')}:`);

        const input = block.getInput(inputName);
        input.setVisible(false);
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
