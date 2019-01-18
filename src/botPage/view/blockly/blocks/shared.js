import { translate } from '../../../../common/i18n';
import config from '../../../common/const';
import { oppositesToDropdown } from '../utils';
import { symbolApi } from '../../shared';
import { get as getStorage, set as setStorage } from '../../../../common/utils/storageManager';
import { generateLiveApiInstance } from '../../../../common/appId';

let purchaseChoices = [[translate('Click to select'), '']];

export const getPurchaseChoices = () => purchaseChoices;

const filterPurchaseChoices = (contractType, oppositesName) => {
    const { [oppositesName]: tradeTypes } = config.opposites;

    let tmpPurchaseChoices = tradeTypes.filter(k =>
        contractType === 'both' ? true : contractType === Object.keys(k)[0]
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

fieldGeneratorMapping.MARKET_LIST = () => {
    const markets = getActiveMarket(symbolApi.activeSymbols.getMarkets());
    return Object.keys(markets).map(e => [markets[e].name, e]);
};

fieldGeneratorMapping.SUBMARKET_LIST = block => () => {
    const markets = getActiveMarket(symbolApi.activeSymbols.getMarkets());
    const marketName = block.getFieldValue('MARKET_LIST');
    if (!marketName || marketName === 'Invalid') {
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

export const getAvailableDurations = (symbol, selectedContractType) => {
    const contractsForStore = JSON.parse(getStorage('contractsForStore') || '[]');
    const defaultDurations = [
        [translate('Ticks'), 't'],
        [translate('Seconds'), 's'],
        [translate('Minutes'), 'm'],
        [translate('Hours'), 'h'],
        [translate('Days'), 'd'],
    ];
    const getContractsForSymbolFromApi = async underlyingSymbol => {
        // Refactor this when reducing WS connections
        let api = generateLiveApiInstance();
        const response = await api.getContractsForSymbol(underlyingSymbol);
        const contractsForSymbol = {};
        if (response.contracts_for) {
            Object.assign(contractsForSymbol, {
                symbol   : underlyingSymbol,
                available: response.contracts_for.available,
                timestamp: Date.now(),
            });
            contractsForStore.push(contractsForSymbol);
            setStorage('contractsForStore', JSON.stringify(contractsForStore));
        }
        api.disconnect();
        api = null;
        return contractsForSymbol;
    };
    const getDurationsForContract = contractsForSymbol => {
        if (!contractsForSymbol) return defaultDurations;

        // Resolve contract_category (e.g. risefall = callput)
        const contractCategory = Object.keys(config.conditionsCategory).find(
            c => c === selectedContractType || config.conditionsCategory[c].includes(selectedContractType)
        );

        // Get contracts based on `contract_category` and `barrier_category`
        const contractsForContractCategory = contractsForSymbol.filter(c => {
            const meetsBarrierConditions = () => {
                const conditions = [];
                Object.keys(config.barrierCategories).some(barrierCategory => {
                    if (config.barrierCategories[barrierCategory].includes(selectedContractType)) {
                        conditions.push(c.barrier_category === barrierCategory);
                    }
                    return conditions.length;
                });
                // If `barrierCategory` for `selectedContractType` not found fallback to all contracts for durations
                return !conditions.includes(false);
            };
            return c.contract_category === contractCategory && meetsBarrierConditions();
        });

        const getDurationIndex = input => defaultDurations.findIndex(d => d[1] === input.replace(/\d+/g, ''));

        // Generate list of available durations from filtered contracts
        const offeredDurations = [];
        contractsForContractCategory.forEach(c => {
            const startIndex = getDurationIndex(c.min_contract_duration);
            const endIndex = getDurationIndex(c.max_contract_duration);
            defaultDurations.slice(startIndex, endIndex + 1).forEach(duration => {
                if (!offeredDurations.includes(duration)) {
                    offeredDurations.push(duration);
                }
            });
        });
        const isIntraday = contractsForContractCategory.every(c => c.expiry_type === 'intraday');
        if (isIntraday) {
            const dayDurationIndex = offeredDurations.findIndex(d => d[1] === 'd');
            if (dayDurationIndex) {
                offeredDurations.splice(dayDurationIndex, 1);
            }
        }
        if (offeredDurations.length) {
            offeredDurations.sort((a, b) => getDurationIndex(a[1]) - getDurationIndex(b[1]));
            return offeredDurations;
        }
        return config.durationTypes[selectedContractType.toUpperCase()];
    };
    // Check if we have local data to get durations from
    const contractsForSymbol = contractsForStore.find(c => c.symbol === symbol);
    if (contractsForSymbol) {
        // If `contracts_for` data is expired, request new data in background but return current cached data
        if (Math.floor((Date.now() - contractsForSymbol.timestamp) / 1000) > 600) {
            getContractsForSymbolFromApi(symbol);
        }
        return Promise.resolve(getDurationsForContract(contractsForSymbol.available));
    }
    return new Promise(resolve => {
        getContractsForSymbolFromApi(symbol).then(contractsForSymbolFromApi => {
            resolve(getDurationsForContract(contractsForSymbolFromApi.available));
        });
    });
};
