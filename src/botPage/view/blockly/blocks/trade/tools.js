import { marketDropdown, tradeTypeDropdown, candleInterval, contractTypes, restart } from './components';
import { findTopParentBlock } from '../../utils';
import { observer as globalObserver } from '../../../../../common/utils/observer';

export const getParentValue = (block, fieldName) => {
    const parentBlock = findTopParentBlock(block);
    return parentBlock && parentBlock.getFieldValue(fieldName);
};

export const updateInputList = block => {
    const tradeType = getParentValue(block, 'TRADETYPE_LIST');
    if (Blockly.Blocks[tradeType]) {
        Blockly.Blocks[tradeType].init.call(block);
    }
};

export const setInputList = block => {
    Blockly.Blocks.allFields.init.call(block);
};

const marketFields = [
    'MARKET_LIST',
    'SUBMARKET_LIST',
    'SYMBOL_LIST',
    'TRADETYPECAT_LIST',
    'TRADETYPE_LIST',
    'TYPE_LIST',
    'CANDLEINTERVAL_LIST',
];

const tradeOptionFields = [
    'DURATIONTYPE_LIST',
    'CURRENCY_LIST',
    'BARRIEROFFSETTYPE_LIST',
    'SECONDBARRIEROFFSETTYPE_LIST',
];

const extendField = (parent, block, field) => {
    const value = block.getFieldValue(field);
    if (value) {
        parent.setFieldValue(value, field);
    }
};

export const extendParentFields = (parent, block, fields) => {
    fields.forEach(field => extendField(parent, block, field));
};

export const ignoreAndGroupEvents = f => {
    const { recordUndo } = Blockly.Events;
    Blockly.Events.recordUndo = false;
    Blockly.Events.setGroup('BackwardCompatibility');
    f();
    Blockly.Events.setGroup(false);
    Blockly.Events.recordUndo = recordUndo;
};

export const cloneTradeOptions = (clone, block) => {
    extendParentFields(clone, block, tradeOptionFields);
    block.inputList.forEach(input => {
        if (input.connection && input.connection.targetConnection) {
            clone.getInput(input.name).connection.connect(input.connection.targetConnection);
        }
    });
};

export const createTradeOptions = () => {
    const tradeOptions = Blockly.mainWorkspace.newBlock('tradeOptions');

    tradeOptions.initSvg();
    tradeOptions.render();

    return tradeOptions;
};

const fixStatements = (block, tradeOptions) => {
    const trade = findTopParentBlock(block);
    const parent = block.getParent();
    const parentIsTradeDef = !parent.nextConnection;

    if (parentIsTradeDef) {
        trade.getInput('SUBMARKET').connection.connect(tradeOptions.previousConnection);
    } else {
        trade.getInput('INITIALIZATION').connection.connect(trade.getInput('SUBMARKET').connection.targetConnection);
        trade.getInput('SUBMARKET').connection.connect(tradeOptions.previousConnection);
    }
};

const addMarketToTrade = (trade, condition) => {
    const tradeTypeList = trade.getField('TRADETYPE_LIST');
    if (tradeTypeList) {
        tradeTypeList.setValue(condition.type);
    }
};

export const marketToTradeOption = (market, marketOptions) => {
    ignoreAndGroupEvents(() => {
        const trade = findTopParentBlock(market);

        if (!trade || trade.type !== 'trade') {
            market.dispose();
            return;
        }

        const tradeOptions = createTradeOptions();

        fixStatements(market, tradeOptions);

        if (marketOptions) {
            const [condition] = market.getChildren();

            if (condition) {
                cloneTradeOptions(tradeOptions, condition);
                addMarketToTrade(trade, condition);
            }
        } else {
            cloneTradeOptions(tradeOptions, market);
        }

        if (marketOptions) {
            trade.setFieldValue(marketOptions.market, 'MARKET_LIST');
            trade.setFieldValue(marketOptions.submarket, 'SUBMARKET_LIST');
            trade.setFieldValue(marketOptions.symbol, 'SYMBOL_LIST');
            globalObserver.emit('bot.init', marketOptions.symbol);
        } else {
            const symbol = market.getFieldValue('SYMBOL_LIST');
            if (symbol) {
                globalObserver.emit('bot.init', symbol);
            }
            extendParentFields(trade, market, marketFields);
        }

        updateInputList(tradeOptions);

        market.dispose();
    });
};

export const marketDefPlaceHolders = block => {
    marketDropdown(block);
    tradeTypeDropdown(block);
    contractTypes(block);
    candleInterval(block);
    restart(block);
};
