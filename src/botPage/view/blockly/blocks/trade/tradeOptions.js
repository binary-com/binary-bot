import { setInputList, updateInputList, getParentValue } from './tools';
import {
    expectValue,
    haveContractsForSymbol,
    getContractsAvailableForSymbol,
    getDurationsForContracts,
    getBarriersForContracts,
    getPredictionForContracts,
} from '../shared';
import { insideTrade } from '../../relationChecker';
import { findTopParentBlock, hideInteractionsFromBlockly, getBlocksByType } from '../../utils';
import { translate } from '../../../../../common/i18n';
import { observer as globalObserver } from '../../../../../common/utils/observer';

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
                // After creation emit change event so API-dependent fields become populated
                updateInputList(this);
                const block = Blockly.mainWorkspace.getBlockById(ev.blockId);
                if (ev.workspaceId === Blockly.mainWorkspace.id && block.type === 'trade') {
                    const symbol = block.getFieldValue('SYMBOL_LIST');
                    if (!symbol) return;

                    this.pollForContracts(symbol).then(contracts => {
                        this.updateBarrierOffsetBlocks(contracts);
                        this.updatePredictionBlocks(contracts);
                        this.updateDurationLists(contracts, false, false); // false because we want to maintain user's values on import
                    });
                }
            } else if (ev.type === Blockly.Events.MOVE) {
                // Make sure tradeOptions-blocks are consistent with symbol/tradeType when re-added to root-block
                if (!ev.oldParentId && ev.newParentId) {
                    const movedBlock = Blockly.mainWorkspace.getBlockById(ev.blockId);
                    const topParentBlock = findTopParentBlock(movedBlock);

                    if (topParentBlock && topParentBlock.type === 'trade') {
                        const symbol = topParentBlock.getFieldValue('SYMBOL_LIST');
                        if (!symbol) return;

                        const getNestedTradeOptions = block => {
                            if (block.type === 'tradeOptions') {
                                this.pollForContracts(symbol).then(contracts => {
                                    this.updateBarrierOffsetBlocks(contracts, true, [block.id]);
                                    this.updatePredictionBlocks(contracts, [block.id]);
                                    this.updateDurationLists(contracts, true, true, [block.id]);
                                });
                            }
                            block.getChildren().forEach(childBlock => {
                                getNestedTradeOptions(childBlock);
                            });
                        };
                        getNestedTradeOptions(movedBlock);
                    }
                }
            } else if (ev.type === Blockly.Events.CHANGE) {
                // eslint-disable-next-line no-underscore-dangle
                if (this.parentBlock_ !== null) {
                    const symbol = getParentValue(this, 'SYMBOL_LIST');
                    if (!symbol) return;

                    this.pollForContracts(symbol).then(contracts => {
                        if (ev.name === 'SYMBOL_LIST' && ev.oldValue !== ev.newValue) {
                            // Called to update duration options and set min durations
                            this.updateDurationLists(contracts, true, true);
                        } else if (['TRADETYPE_LIST'].includes(ev.name) && ev.oldValue !== ev.newValue) {
                            // Both are called to check if these blocks are required
                            this.updatePredictionBlocks(contracts);
                            this.updateBarrierOffsetBlocks(contracts, true);
                            // Called to default to smallest durations for symbol
                            this.updateDurationLists(contracts, true);
                        } else if (ev.name === 'DURATIONTYPE_LIST' && ev.oldValue !== ev.newValue) {
                            // Called to set barriers based on duration
                            this.updateBarrierOffsetBlocks(contracts, true, [ev.blockId]);
                            // Called to set min durations for selected unit
                            this.updateDurationLists(contracts, false, true, [ev.blockId]);
                        }
                        updateInputList(this);
                    });
                }
            }
        },
        pollForContracts(symbol) {
            return new Promise(resolve => {
                const contractsForSymbol = haveContractsForSymbol(symbol);
                if (!contractsForSymbol) {
                    // Register an event and use as a lock to avoid spamming API
                    const event = `contractsLoaded.${symbol}`;
                    if (!globalObserver.isRegistered(event)) {
                        globalObserver.register(event, () => {});
                        getContractsAvailableForSymbol(symbol).then(contracts => {
                            globalObserver.unregisterAll(event); // Release the lock
                            resolve(contracts);
                        });
                    } else {
                        // Request in progress, start polling localStorage until contracts are available.
                        const pollingFn = setInterval(() => {
                            const contracts = haveContractsForSymbol(symbol);
                            if (contracts) {
                                clearInterval(pollingFn);
                                resolve(contracts.available);
                            }
                        }, 100);
                        setTimeout(() => {
                            clearInterval(pollingFn);
                            resolve([]);
                        }, 10000);
                    }
                } else {
                    resolve(contractsForSymbol.available);
                }
            });
        },
        updatePredictionBlocks(contracts, updateOnly = []) {
            getBlocksByType('tradeOptions').forEach(tradeOptionsBlock => {
                if (tradeOptionsBlock.disabled) return;
                if (updateOnly.length && !updateOnly.includes(tradeOptionsBlock.id)) return;

                const predictionInput = tradeOptionsBlock.getInput('PREDICTION');
                if (!predictionInput) return;

                const tradeType = getParentValue(tradeOptionsBlock, 'TRADETYPE_LIST');
                const predictionRange = getPredictionForContracts(contracts, tradeType);

                hideInteractionsFromBlockly(() => {
                    if (!predictionRange.length) {
                        tradeOptionsBlock.removeInput('PREDICTION');
                        return;
                    }
                    predictionInput.setVisible(true);

                    // Attach shadow block with API-returned prediction-value (only if user hasn't defined a value)
                    if (!predictionInput.connection.isConnected()) {
                        predictionInput.attachShadowBlock(predictionRange[0], 'NUM', 'math_number');
                    }
                });
            });
        },
        updateBarrierOffsetBlocks(contracts, useDefault = false, updateOnly = []) {
            getBlocksByType('tradeOptions').forEach(tradeOptionsBlock => {
                if (tradeOptionsBlock.disabled) return;
                if (updateOnly.length && !updateOnly.includes(tradeOptionsBlock.id)) return;

                const tradeType = getParentValue(tradeOptionsBlock, 'TRADETYPE_LIST');
                const selectedDuration = tradeOptionsBlock.getFieldValue('DURATIONTYPE_LIST');
                const barriers = getBarriersForContracts(contracts, tradeType, selectedDuration);

                hideInteractionsFromBlockly(() => {
                    const barrierBlockNames = ['BARRIEROFFSET', 'SECONDBARRIEROFFSET'];
                    if (!Object.keys(barriers).length) {
                        barrierBlockNames.forEach(barrierInputName => tradeOptionsBlock.removeInput(barrierInputName));
                        return;
                    }
                    const barrierKeys = Object.keys(barriers);
                    barrierKeys.forEach((barrier, index) => {
                        const barrierInput = tradeOptionsBlock.getInput(barrierBlockNames[index]);
                        if (barrierInput) {
                            barrierInput.setVisible(true);

                            // Attach shadow block with API-returned barrier-value (only if user hasn't defined a value)
                            if (!barrierInput.connection.isConnected()) {
                                barrierInput.attachShadowBlock(barriers[barrier], 'NUM', 'math_number');
                            } else if (useDefault) {
                                const connectedBlock = barrierInput.connection.targetBlock();
                                if (connectedBlock.isShadow()) {
                                    connectedBlock.setFieldValue(barriers[barrier], 'NUM');
                                }
                            }
                        }
                    });
                    // Check if number of barriers returned by API is less than barrier inputs on our workspace
                    // If any, remove leftover barrierBlockNames from the workspace
                    if (barrierKeys.length < barrierBlockNames.length) {
                        barrierBlockNames
                            .slice(barrierKeys.length)
                            .forEach(barrierName => tradeOptionsBlock.removeInput(barrierName));
                    }
                });
            });
        },
        updateDurationLists(contracts, useDefaultUnit = false, setMinDuration = false, updateOnly = []) {
            getBlocksByType('tradeOptions').forEach(tradeOptionsBlock => {
                if (tradeOptionsBlock.disabled) return;
                if (updateOnly.length && !updateOnly.includes(tradeOptionsBlock.id)) return;

                const tradeType = getParentValue(tradeOptionsBlock, 'TRADETYPE_LIST');
                const durationTypeList = tradeOptionsBlock.getField('DURATIONTYPE_LIST');
                const selectedDuration = durationTypeList.getValue();

                const durations = getDurationsForContracts(contracts, tradeType);
                const durationOptions = durations.map(duration => [duration.label, duration.unit]);

                hideInteractionsFromBlockly(() => {
                    // Prevent UI flickering by only updating field only if options have changed
                    // eslint-disable-next-line no-underscore-dangle
                    if (JSON.stringify(durationTypeList.menuGenerator_) !== JSON.stringify(durationOptions)) {
                        durationTypeList.menuGenerator_ = durationOptions; // eslint-disable-line no-underscore-dangle
                    }

                    // Set duration to previous selected duration (required for imported strategies)
                    // eslint-disable-next-line no-underscore-dangle
                    const prevSelectedDuration = durationTypeList.menuGenerator_.find(d => d[1] === selectedDuration);
                    if (!useDefaultUnit && prevSelectedDuration) {
                        durationTypeList.setValue('');
                        durationTypeList.setValue(prevSelectedDuration[1]);
                        // eslint-disable-next-line no-underscore-dangle
                    } else if (durationTypeList.menuGenerator_.length) {
                        durationTypeList.setValue('');
                        // eslint-disable-next-line no-underscore-dangle
                        durationTypeList.setValue(durationTypeList.menuGenerator_[0][1]);
                    }

                    // Attach shadow block with min value (only when user hasn't already attached another output block)
                    if (durations.length) {
                        const durationInput = tradeOptionsBlock.getInput('DURATION');
                        if (!durationInput.connection.isConnected()) {
                            durationInput.attachShadowBlock(durations[0].minimum, 'NUM', 'math_number');
                        } else if (setMinDuration) {
                            const connectedBlock = durationInput.connection.targetBlock();
                            const minDuration = durations.find(d => d.unit === selectedDuration);

                            if (connectedBlock.isShadow() && minDuration) {
                                connectedBlock.setFieldValue(minDuration.minimum, 'NUM');
                            }
                        }
                    }
                });
            });
        },
    };
    Blockly.JavaScript.tradeOptions = block => {
        const tradeDefBlock = findTopParentBlock(block);
        if (!tradeDefBlock) {
            return '';
        }
        const getInputValue = fieldName =>
            Blockly.JavaScript.valueToCode(block, fieldName, Blockly.JavaScript.ORDER_ATOMIC) || 'undefined';
        const code = `
        Bot.start({
          limitations: BinaryBotPrivateLimitations,
          duration: ${expectValue(block, 'DURATION')},
          duration_unit: '${block.getFieldValue('DURATIONTYPE_LIST')}',
          currency: '${block.getFieldValue('CURRENCY_LIST')}',
          amount: ${expectValue(block, 'AMOUNT')},
          prediction: ${getInputValue('PREDICTION')},
          barrierOffset: ${getInputValue('BARRIEROFFSET')},
          secondBarrierOffset: ${getInputValue('SECONDBARRIEROFFSET')},
        });
      `;
        return code;
    };
};
