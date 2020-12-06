import { oppositesToDropdown } from '../utils';
import { symbolApi } from '../../shared';
import config from '../../../common/const';
import { generateLiveApiInstance } from '../../../../common/appId';
import { translate } from '../../../../common/i18n';
import {
    get as getStorage,
    set as setStorage,
    getTokenList,
    removeAllTokens,
} from '../../../../common/utils/storageManager';
import { observer as globalObserver } from '../../../../common/utils/observer';

let purchaseChoices = [[translate('Click to select'), '']];

export const getPurchaseChoices = () => purchaseChoices;

const filterPurchaseChoices = (contractType, oppositesName) => {
    if (oppositesName.toLowerCase() === 'na') {
        return [[translate('Not available'), 'na']];
    }

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

    if (Object.keys(markets).length === 0) {
        return [[translate('Not available'), 'na']];
    }
    return Object.keys(markets).map(e => [markets[e].name, e]);
};

fieldGeneratorMapping.SUBMARKET_LIST = block => () => {
    const markets = getActiveMarket(symbolApi.activeSymbols.getMarkets());
    const marketName = block.getFieldValue('MARKET_LIST');
    const submarketOptions = [];

    if (Object.keys(markets).length > 0 && marketName !== 'na') {
        const marketObj = markets[marketName];

        if (marketObj) {
            const submarkets = getActiveSubMarket(marketObj.submarkets);

            submarketOptions.push(
                ...Object.keys(submarkets)
                    .map(e => [submarkets[e].name, e])
                    // Filter out markets we don't have contracts for
                    .filter(submarket => !['energy'].includes(submarket[1]))
            );
        }
    }

    if (submarketOptions.length === 0) {
        return [[translate('Not available'), 'na']];
    }

    return submarketOptions;
};

fieldGeneratorMapping.SYMBOL_LIST = block => () => {
    const markets = getActiveMarket(symbolApi.activeSymbols.getMarkets());
    const submarketName = block.getFieldValue('SUBMARKET_LIST');
    const symbolOptions = [];

    if (Object.keys(markets).length > 0 && submarketName !== 'na') {
        const marketName = block.getFieldValue('MARKET_LIST');
        const marketObj = markets[marketName];

        if (marketObj) {
            const { submarkets } = marketObj;

            if (Object.keys(submarkets).length > 0 && submarkets[submarketName]) {
                const symbols = getActiveSymbols(submarkets[submarketName].symbols);

                symbolOptions.push(
                    ...Object.keys(symbols)
                        .map(e => [symbols[e].display, symbols[e].symbol])
                        // Filter out symbols we don't have contracts for (these symbols have only forward-starting)
                        .filter(symbol => !['frxGBPNOK', 'frxUSDNOK', 'frxUSDNEK', 'frxUSDSEK'].includes(symbol[1]))
                );
            }
        }
    }

    if (symbolOptions.length === 0) {
        return [[translate('Not available'), 'na']];
    }

    return symbolOptions;
};

fieldGeneratorMapping.TRADETYPECAT_LIST = block => () => {
    const symbol = block.getFieldValue('SYMBOL_LIST');

    if (!symbol || symbol === 'na') {
        return [[translate('Not available'), 'na']];
    }

    const allowedCategories = symbolApi.getAllowedCategories(symbol.toLowerCase());
    return Object.keys(config.conditionsCategoryName)
        .filter(e => allowedCategories.indexOf(e) >= 0)
        .map(e => [config.conditionsCategoryName[e], e]);
};

fieldGeneratorMapping.TRADETYPE_LIST = block => () => {
    const tradeTypeCat = block.getFieldValue('TRADETYPECAT_LIST');

    if (!tradeTypeCat || tradeTypeCat === 'na') {
        return [[translate('Not available'), 'na']];
    }

    return (
        config.conditionsCategory[tradeTypeCat]
            .map(e => [config.opposites[e.toUpperCase()].map(c => c[Object.keys(c)[0]]).join('/'), e])
            // Filter out trade types we don't offer
            .filter(
                tradeType => !(block.getFieldValue('SUBMARKET_LIST') === 'smart_fx' && tradeType[1] === 'higherlower')
            )
    );
};

export const dependentFieldMapping = {
    MARKET_LIST      : 'SUBMARKET_LIST',
    SUBMARKET_LIST   : 'SYMBOL_LIST',
    SYMBOL_LIST      : 'TRADETYPECAT_LIST',
    TRADETYPECAT_LIST: 'TRADETYPE_LIST',
};

const contractsForStore = JSON.parse(getStorage('contractsForStore') || '[]');

const getContractCategory = input =>
    Object.keys(config.conditionsCategory).find(c => c === input || config.conditionsCategory[c].includes(input));

const matchesBarrierCategory = (contract, contractCategory) => {
    const conditions = [];
    Object.keys(config.barrierCategories).some(barrierCategory => {
        if (config.barrierCategories[barrierCategory].includes(contractCategory)) {
            conditions.push(contract.barrier_category === barrierCategory);
        }
        return conditions.length;
    });
    // If `barrierCategory` for `contractCategory` not found fallback to all contracts
    return !conditions.includes(false);
};

const filterContractsByCategory = (contracts, contractCategory, contractType) => {
    if (!contracts) return [];
    return contracts.filter(contract => {
        // We don't offer forward-starting contracts in Binary Bot, remove these
        if (contract.start_type === 'forward') {
            return false;
        }
        return contract.contract_category === contractCategory && matchesBarrierCategory(contract, contractType);
    });
};

export const getDurationsForContracts = (contractsAvailable, selectedContractType) => {
    const defaultDurations = [
        [translate('Ticks'), 't'],
        [translate('Seconds'), 's'],
        [translate('Minutes'), 'm'],
        [translate('Hours'), 'h'],
        [translate('Days'), 'd'],
    ];
    const noDurationsAvailable = [{ label: translate('Not available'), unit: 'na', minimum: 0 }];
    if (!contractsAvailable) return noDurationsAvailable;

    const getMinimumAmount = input => input.replace(/\D/g, '');
    const getDurationIndex = input => defaultDurations.findIndex(d => d[1] === input.replace(/\d+/g, ''));

    const offeredDurations = [];

    const contractsForContractCategory = filterContractsByCategory(
        contractsAvailable,
        getContractCategory(selectedContractType),
        selectedContractType
    );
    contractsForContractCategory.forEach(c => {
        if (!c.min_contract_duration || !c.max_contract_duration) return;

        const startIndex = getDurationIndex(c.min_contract_duration);
        const endIndex = getDurationIndex(c.max_contract_duration === '1d' ? '24h' : c.max_contract_duration);

        defaultDurations.slice(startIndex, endIndex + 1).forEach((duration, index) => {
            if (!offeredDurations.find(offeredDuration => offeredDuration.unit === duration[1])) {
                offeredDurations.push({
                    label  : duration[0],
                    unit   : duration[1],
                    minimum: index === 0 ? getMinimumAmount(c.min_contract_duration) : 1,
                });
            }
        });
    });
    // If only intraday contracts available remove day-durations
    if (contractsForContractCategory.every(c => c.expiry_type === 'intraday')) {
        const dayDurationIndex = offeredDurations.findIndex(d => d[1] === 'd');
        if (dayDurationIndex !== -1) {
            offeredDurations.splice(dayDurationIndex, 1);
        }
    }
    if (!offeredDurations.length) {
        return noDurationsAvailable;
    }
    return (
        offeredDurations
            // Maintain order based on duration unit
            .sort((a, b) => getDurationIndex(a.unit) - getDurationIndex(b.unit))
    );
};

export const haveContractsForSymbol = underlyingSymbol => {
    const contractsForSymbol = contractsForStore.find(c => c.symbol === underlyingSymbol);
    if (!contractsForSymbol) {
        return false;
    }
    const tokenList = getTokenList();
    const isDifferentAccount = () => tokenList.length && contractsForSymbol.accountName !== tokenList[0].accountName;
    if (isDifferentAccount()) {
        return false;
    }
    // Data expired, return cached data, retrieve updated data in background (if not already doing so)
    const isExpiredData = () => Math.floor((Date.now() - contractsForSymbol.timestamp) / 1000) > 600;
    if (isExpiredData()) {
        const event = `contractsLoaded.${underlyingSymbol}`;
        if (!globalObserver.isRegistered(event)) {
            globalObserver.register(event);
            getContractsAvailableForSymbolFromApi(underlyingSymbol);
        }
    }
    return contractsForSymbol;
};

export const getContractsAvailableForSymbol = async underlyingSymbol => {
    const contractsForSymbol = haveContractsForSymbol(underlyingSymbol);
    if (!contractsForSymbol) {
        const contractsAvailableForSymbol = await getContractsAvailableForSymbolFromApi(underlyingSymbol);
        return Promise.resolve(contractsAvailableForSymbol.available);
    }
    return Promise.resolve(contractsForSymbol.available);
};

export const getContractsAvailableForSymbolFromApi = async underlyingSymbol => {
    const api = generateLiveApiInstance();
    let tokenList = getTokenList();
    if (tokenList.length) {
        try {
            await api.authorize(tokenList[0].token);
        } catch (e) {
            removeAllTokens();
            tokenList = [];
        }
    }
    const contractsForSymbol = {};
    try {
        const response = await api.getContractsForSymbol(underlyingSymbol);
        if (response.contracts_for) {
            Object.assign(contractsForSymbol, {
                symbol   : underlyingSymbol,
                available: response.contracts_for.available,
                timestamp: Date.now(),
            });
            if (tokenList.length) {
                Object.assign(contractsForSymbol, {
                    accountName: tokenList[0].accountName,
                });
            }
            // Avoid duplicate symbols in contractsForStore
            contractsForStore
                .filter(c => c.symbol === underlyingSymbol)
                .forEach(() =>
                    contractsForStore.splice(contractsForStore.findIndex(c => c.symbol === underlyingSymbol), 1)
                );
            contractsForStore.push(contractsForSymbol);
            setStorage('contractsForStore', JSON.stringify(contractsForStore));
            globalObserver.unregisterAll(`contractsLoaded.${underlyingSymbol}`);
        }
    } catch (e) {
        if (window.trackJs) {
            trackJs.addMetadata('getContractsAvailableForSymbolFromApi Error', e.message);
        }
    }
    if (typeof api.disconnect === 'function') {
        api.disconnect();
    }
    return contractsForSymbol;
};

export const getBarriersForContracts = (contracts, selectedContractType, selectedDuration, selectedBarrierTypes) => {
    const barriers = { values: [] };
    const category = getContractCategory(selectedContractType);
    const contractsForContractCategory = filterContractsByCategory(contracts, category, selectedContractType);

    const offsetRegex = new RegExp('^[-|+]([0-9]+.[0-9]+)$');
    const isOffset = input => input && offsetRegex.test(input.toString());

    if (contractsForContractCategory) {
        const barrierProps = ['high_barrier', 'low_barrier'];

        selectedBarrierTypes.forEach((barrierType, index) => {
            const selectedOffset = ['+', '-'].includes(barrierType);

            // Find barriers based on selected duration & by selected barrier type
            // i.e. Hours & days can have different barrier values, offset + absolute sometimes have different values
            let contract;
            contract = contractsForContractCategory.find(c => {
                const durations = getDurationsForContracts([c], selectedContractType);
                if (durations.map(duration => duration.unit).includes(selectedDuration)) {
                    const barrierIsOffset = () => isOffset(c.barrier || c[barrierProps[index]]);
                    return (selectedOffset && barrierIsOffset()) || (!selectedOffset && !barrierIsOffset());
                }
                return false;
            });
            if (!contract) {
                contract = contractsForContractCategory.find(
                    c => barrierType === 'absolute' && !isOffset(c.barrier || c.high_barrier)
                );
            }
            // Fallback to contract with smallest barriers
            if (!contract) {
                contract = contractsForContractCategory
                    .sort((a, b) => {
                        const c = a.barrier || a.high_barrier;
                        const d = b.barrier || b.high_barrier;
                        return parseFloat(c) - parseFloat(d);
                    })
                    .shift();
            }
            const barrierlessCategories = ['reset', 'runs'];
            if (contract && !barrierlessCategories.includes(contract.contract_category)) {
                const propName = contract.barriers === 1 ? 'barrier' : barrierProps[index];
                if (contract[propName]) {
                    const barrierMatch = contract[propName].toString().match(offsetRegex);
                    barriers.values[index] = barrierMatch ? barrierMatch[1] : contract[propName];
                }

                if (['intraday', 'tick'].includes(contract.expiry_type) && isOffset(contract[propName])) {
                    barriers.allowBothTypes = true; // Allow both offset + absolute barriers
                } else if (barrierType === 'absolute' && !isOffset(contract[propName])) {
                    barriers.allowAbsoluteType = true;
                }

                if (contract.barriers === 1) {
                    selectedBarrierTypes.splice(index + 1, 1);
                }
            }
        });
        if (
            barriers.values.length === 2 &&
            selectedBarrierTypes.every(val => val === selectedBarrierTypes[0]) &&
            barriers.values.every(val => val === barriers.values[0])
        ) {
            // Set distinct values if equal barrier types have equal values
            barriers.values[1] = (barriers.values[0] * 0.95).toFixed(1);
        }
    }
    return barriers;
};

export const getPredictionForContracts = (contracts, selectedContractType) => {
    const category = getContractCategory(selectedContractType);
    const contractsForContractCategory = filterContractsByCategory(contracts, category, selectedContractType);

    const contractMapping = {};
    if (category === 'digits') {
        contractMapping.matchesdiffers = ['DIGITMATCH', 'DIGITDIFF'];
        contractMapping.overunder = ['DIGITOVER', 'DIGITUNDER'];
    } else if (category === 'highlowticks') {
        contractMapping.highlowticks = ['TICKHIGH', 'TICKLOW'];
    }

    const predictionRange = [];
    if (contractMapping[selectedContractType]) {
        const contract = contractsForContractCategory.find(c =>
            contractMapping[selectedContractType].includes(c.contract_type)
        );
        if (contract && contract.last_digit_range) {
            predictionRange.push(...contract.last_digit_range);
        } else {
            predictionRange.push(1, 2, 3, 4, 5);
        }
    }
    return predictionRange;
};

export const disableRunButton = shouldDisable => {
    const elRunButtons = document.querySelectorAll('#runButton, #summaryRunButton');
    const isRunning = globalObserver.getState('isRunning');

    elRunButtons.forEach(elRunButton => {
        if (isRunning) {
            if (shouldDisable) {
                elRunButton.setAttributeNode(document.createAttribute('disabled'));
            } else {
                // Do not enable. The bot is running.
            }
        } else if (shouldDisable) {
            elRunButton.setAttributeNode(document.createAttribute('disabled'));
        } else {
            elRunButton.removeAttribute('disabled');
        }
    });
};
