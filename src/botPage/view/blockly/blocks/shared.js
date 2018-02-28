import { translate } from '../../../../common/i18n';
import config from '../../../common/const';
import { oppositesToDropdown } from '../utils';
import { symbolApi } from '../../shared';

let purchaseChoices = [[translate('Click to select'), '']];

export const getPurchaseChoices = () => purchaseChoices;

const filterPurchaseChoices = (contractType, oppositesName) => {
    const { [oppositesName]: tradeTypes } = config.opposites;

    let tmpPurchaseChoices = tradeTypes.filter(
        k => (contractType === 'both' ? true : contractType === Object.keys(k)[0])
    );

    if (!tmpPurchaseChoices.length) {
        tmpPurchaseChoices = tradeTypes;
    }

    return oppositesToDropdown(tmpPurchaseChoices);
};

export const updatePurchaseChoices = (contractType, oppositesName) => {
    purchaseChoices = filterPurchaseChoices(contractType, oppositesName);
    const purchases = Blockly.mainWorkspace
        .getAllBlocks()
        .filter(r => ['purchase', 'payout', 'ask_price'].indexOf(r.type) >= 0);
    Blockly.Events.recordUndo = false;
    purchases.forEach(purchase => {
        const value = purchase.getField('PURCHASE_LIST').getValue();
        Blockly.WidgetDiv.hideIfOwner(purchase.getField('PURCHASE_LIST'));
        if (value === purchaseChoices[0][1]) {
            purchase.getField('PURCHASE_LIST').setText(purchaseChoices[0][0]);
        } else if (purchaseChoices.length === 2 && value === purchaseChoices[1][1]) {
            purchase.getField('PURCHASE_LIST').setText(purchaseChoices[1][0]);
        } else {
            purchase.getField('PURCHASE_LIST').setValue(purchaseChoices[0][1]);
            purchase.getField('PURCHASE_LIST').setText(purchaseChoices[0][0]);
        }
    });
    Blockly.Events.recordUndo = true;
};

export const expectValue = (block, field) => {
    const value = Blockly.JavaScript.valueToCode(block, field, Blockly.JavaScript.ORDER_ATOMIC);
    if (!value) {
        throw Error(translate(`${field} cannot be empty`));
    }
    return value;
};

export const fieldGeneratorMapping = {};

const getActiveSymbols = symbols =>
    Object.keys(symbols).reduce(
        (acc, symbol) =>
            symbolApi.getAllowedCategories(symbol).length ? { ...acc, [symbol]: symbols[symbol] } : { ...acc },
        {}
    );

const getActiveSubMarket = submarkets =>
    Object.keys(submarkets).reduce(
        (acc, submarket) =>
            Object.keys(getActiveSymbols(submarkets[submarket].symbols)).length
                ? { ...acc, [submarket]: submarkets[submarket] }
                : { ...acc },
        {}
    );

const getActiveMarket = markets =>
    Object.keys(markets).reduce(
        (acc, market) =>
            Object.keys(getActiveSubMarket(markets[market].submarkets)).length
                ? { ...acc, [market]: markets[market] }
                : { ...acc },
        {}
    );

fieldGeneratorMapping.MARKET_LIST = () => () => {
    const markets = getActiveMarket(symbolApi.activeSymbols.getMarkets());
    return Object.keys(markets).map(e => [markets[e].name, e]);
};

fieldGeneratorMapping.SUBMARKET_LIST = block => () => {
    const markets = getActiveMarket(symbolApi.activeSymbols.getMarkets());
    const marketName = block.getFieldValue('MARKET_LIST');
    if (marketName === 'Invalid') {
        return [['', 'Invalid']];
    }
    const submarkets = getActiveSubMarket(markets[marketName].submarkets);
    return Object.keys(submarkets).map(e => [submarkets[e].name, e]);
};

fieldGeneratorMapping.SYMBOL_LIST = block => () => {
    const markets = getActiveMarket(symbolApi.activeSymbols.getMarkets());
    const submarketName = block.getFieldValue('SUBMARKET_LIST');
    if (!submarketName || submarketName === 'Invalid') {
        return [['', '']];
    }
    const marketName = block.getFieldValue('MARKET_LIST');
    const submarkets = getActiveSubMarket(markets[marketName].submarkets);
    const symbols = getActiveSymbols(submarkets[submarketName].symbols);
    return Object.keys(symbols).map(e => [symbols[e].display, symbols[e].symbol]);
};

fieldGeneratorMapping.TRADETYPECAT_LIST = block => () => {
    const symbol = block.getFieldValue('SYMBOL_LIST');
    if (!symbol) {
        return [['', '']];
    }
    const allowedCategories = symbolApi.getAllowedCategories(symbol.toLowerCase());
    return Object.keys(config.conditionsCategoryName)
        .filter(e => allowedCategories.indexOf(e) >= 0)
        .map(e => [config.conditionsCategoryName[e], e]);
};

fieldGeneratorMapping.TRADETYPE_LIST = block => () => {
    const tradeTypeCat = block.getFieldValue('TRADETYPECAT_LIST');
    if (!tradeTypeCat) {
        return [['', '']];
    }
    return config.conditionsCategory[tradeTypeCat].map(e => [
        config.opposites[e.toUpperCase()].map(c => c[Object.keys(c)[0]]).join('/'),
        e,
    ]);
};

export const dependentFieldMapping = {
    MARKET_LIST      : 'SUBMARKET_LIST',
    SUBMARKET_LIST   : 'SYMBOL_LIST',
    SYMBOL_LIST      : 'TRADETYPECAT_LIST',
    TRADETYPECAT_LIST: 'TRADETYPE_LIST',
};
