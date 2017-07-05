import config from '../../../../common/const';
import { translate } from '../../../../../common/i18n';
import { symbolApi } from '../../../shared';
import { oppositesToDropdown } from '../../utils';
import { caution } from '../images';
import { getTradeType } from './tools';

export const marketDropdown = block => {
    const markets = symbolApi.activeSymbols.getMarkets();
    const getSubmarkets = () => {
        const marketName = block.getFieldValue('MARKET_LIST');
        if (marketName === 'Invalid') {
            return [['', 'Invalid']];
        }
        const submarkets = markets[marketName].submarkets;
        return Object.keys(submarkets).map(e => [submarkets[e].name, e]);
    };
    const getSymbols = () => {
        const submarketName = block.getFieldValue('SUBMARKET_LIST');
        if (!submarketName || submarketName === 'Invalid') {
            return [['', '']];
        }
        const marketName = block.getFieldValue('MARKET_LIST');
        const submarkets = markets[marketName].submarkets;
        const symbols = submarkets[submarketName].symbols;
        return Object.keys(symbols).map(e => [symbols[e].display, symbols[e].symbol]);
    };
    const getMarket = () => Object.keys(markets).map(e => [markets[e].name, e]);
    block
        .appendDummyInput('MARKETDEFINITION')
        .appendField(`${translate('Market')}:`)
        .appendField(new Blockly.FieldDropdown(getMarket), 'MARKET_LIST')
        .appendField('->')
        .appendField(new Blockly.FieldDropdown(getSubmarkets), 'SUBMARKET_LIST')
        .appendField('->')
        .appendField(new Blockly.FieldDropdown(getSymbols), 'SYMBOL_LIST');
};

export const tradeTypeDropdown = block => {
    const getTradeTypeCats = () => {
        const symbol = block.getFieldValue('SYMBOL_LIST');
        if (!symbol) {
            return [['', '']];
        }
        const allowedCategories = symbolApi.getAllowedCategories(symbol.toLowerCase());
        return Object.keys(config.conditionsCategoryName)
            .filter(e => allowedCategories.indexOf(e) >= 0)
            .map(e => [config.conditionsCategoryName[e], e]);
    };
    const getTradeTypes = () => {
        const tradeTypeCat = block.getFieldValue('TRADETYPECAT_LIST');
        if (!tradeTypeCat) {
            return [['', '']];
        }
        return config.conditionsCategory[tradeTypeCat].map(e => [
            config.opposites[e.toUpperCase()].map(c => c[Object.keys(c)[0]]).join('/'),
            e,
        ]);
    };
    block
        .appendDummyInput('TRADETYPEDEFINITION')
        .appendField(`${translate('Trade Type')}:`)
        .appendField(new Blockly.FieldDropdown(getTradeTypeCats), 'TRADETYPECAT_LIST')
        .appendField('->')
        .appendField(new Blockly.FieldDropdown(getTradeTypes), 'TRADETYPE_LIST');
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
            .appendField(new Blockly.FieldDropdown(config.candleIntervals), 'CANDLEINTERVAL_LIST');
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
        block.appendValueInput('PREDICTION').setCheck('Number').appendField(translate('Prediction:'));
    }
};

export const restart = block => {
    block
        .appendDummyInput()
        .appendField(`${translate('Restart buy/sell on error')}`)
        .appendField(`(${translate('disable for better performance')}):`)
        .appendField(new Blockly.FieldCheckbox('TRUE'), 'TIME_MACHINE_ENABLED');
    block
        .appendDummyInput()
        .appendField(`${translate('Restart last trade on error')}`)
        .appendField(`(${translate('bot ignores the unsuccessful trade')}):`)
        .appendField(new Blockly.FieldCheckbox('FALSE'), 'RESTARTONERROR')
        .appendField(new Blockly.FieldImage(caution, 15, 15, '!'));
};
