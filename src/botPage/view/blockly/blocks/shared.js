import { translate } from '../../../../common/i18n';
import config from '../../../common/const';
import { oppositesToDropdown } from '../utils';
import { symbolApi } from '../../shared';

let purchaseChoices = [[translate('Click to select'), '']];

export const getPurchaseChoices = () => purchaseChoices;

export const updatePurchaseChoices = (contractType, oppositesName) => {
    purchaseChoices = oppositesToDropdown(
        config.opposites[oppositesName].filter(
            k => (contractType === 'both' ? true : contractType === Object.keys(k)[0])
        )
    );
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

const getSubmarkets = block => () => {
    const markets = symbolApi.activeSymbols.getMarkets();
    const marketName = block.getFieldValue('MARKET_LIST');
    if (marketName === 'Invalid') {
        return [['', 'Invalid']];
    }
    const { submarkets } = markets[marketName];
    return Object.keys(submarkets).map(e => [submarkets[e].name, e]);
};

const getSymbols = block => () => {
    const markets = symbolApi.activeSymbols.getMarkets();
    const submarketName = block.getFieldValue('SUBMARKET_LIST');
    if (!submarketName || submarketName === 'Invalid') {
        return [['', '']];
    }
    const marketName = block.getFieldValue('MARKET_LIST');
    const { submarkets } = markets[marketName];
    const { symbols } = submarkets[submarketName];
    return Object.keys(symbols).map(e => [symbols[e].display, symbols[e].symbol]);
};

const getTradeTypeCats = block => () => {
    const symbol = block.getFieldValue('SYMBOL_LIST');
    if (!symbol) {
        return [['', '']];
    }
    const allowedCategories = symbolApi.getAllowedCategories(symbol.toLowerCase());
    return Object.keys(config.conditionsCategoryName)
        .filter(e => allowedCategories.indexOf(e) >= 0)
        .map(e => [config.conditionsCategoryName[e], e]);
};

const getTradeTypes = block => () => {
    const tradeTypeCat = block.getFieldValue('TRADETYPECAT_LIST');
    if (!tradeTypeCat) {
        return [['', '']];
    }
    return config.conditionsCategory[tradeTypeCat].map(e => [
        config.opposites[e.toUpperCase()].map(c => c[Object.keys(c)[0]]).join('/'),
        e,
    ]);
};

export const getDependentDropdownCallback = {
    MARKET_LIST      : getSubmarkets,
    SUBMARKET_LIST   : getSymbols,
    SYMBOL_LIST      : getTradeTypeCats,
    TRADETYPECAT_LIST: getTradeTypes,
};
