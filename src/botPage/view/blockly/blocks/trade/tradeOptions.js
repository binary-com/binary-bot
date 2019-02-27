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
import config from '../../../../common/const';

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
                            this.updateDurationLists(contracts, false, true);
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
                    const revealBarrierBlock = (barrier, inputName) => {
                        const barrierInput = tradeOptionsBlock.getInput(inputName);
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
                    };

                    const absoluteBarrierNames = ['ABSOLUTEBARRIER', 'SECONDABSOLUTEBARRIER'];
                    const barrierOffsetNames = ['BARRIEROFFSET', 'SECONDBARRIEROFFSET'];

                    const barrierKeys = Object.keys(barriers);
                    if (!barrierKeys.length) {
                        [...absoluteBarrierNames, ...barrierOffsetNames].forEach(barrierInputName =>
                            tradeOptionsBlock.removeInput(barrierInputName)
                        );
                        return;
                    }

                    // Draw absolute barriers for day-durations
                    if (selectedDuration === 'd') {
                        if (barrierKeys.length === 1) {
                            revealBarrierBlock(barrierKeys[0], absoluteBarrierNames[0]);
                            // Update label to show 'Barrier' only
                            const input = tradeOptionsBlock.getInput(absoluteBarrierNames[0]);
                            input.fieldRow[0].setText(`${translate('Barrier')}:`);
                        } else {
                            barrierKeys.forEach((barrier, index) =>
                                revealBarrierBlock(barrier, absoluteBarrierNames[index])
                            );
                            // Update labels to show 'High barrier' + 'Low barrier'
                            absoluteBarrierNames.forEach((inputName, index) => {
                                const input = tradeOptionsBlock.getInput(inputName);
                                input.fieldRow[0].setText(`${config.absoluteBarrierLabels[index]}:`);
                            });
                        }
                        [...barrierOffsetNames, ...absoluteBarrierNames.slice(barrierKeys.length)].forEach(inputName =>
                            tradeOptionsBlock.removeInput(inputName)
                        );
                    } else {
                        // Draw barrier offsets for all other durations
                        barrierKeys.forEach((barrier, index) => revealBarrierBlock(barrier, barrierOffsetNames[index]));
                        [...absoluteBarrierNames, ...barrierOffsetNames.slice(barrierKeys.length)].forEach(inputName =>
                            tradeOptionsBlock.removeInput(inputName)
                        );
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

        const durationValue = expectValue(block, 'DURATION');
        const durationType = block.getFieldValue('DURATIONTYPE_LIST');
        const currency = block.getFieldValue('CURRENCY_LIST');
        const amount = expectValue(block, 'AMOUNT');

        const isVisibleField = field => block.getInput(field) && block.getInput(field).isVisible();

        let predictionValue = 'undefined';
        let absoluteBarrierValue = 'undefined';
        let secondAbsoluteBarrierValue = 'undefined';
        let barrierOffsetValue = 'undefined';
        let secondBarrierOffsetValue = 'undefined';

        if (isVisibleField('PREDICTION')) {
            predictionValue = expectValue(block, 'PREDICTION');
        }
        if (isVisibleField('ABSOLUTEBARRIER')) {
            absoluteBarrierValue = expectValue(block, 'ABSOLUTEBARRIER');
        }
        if (isVisibleField('SECONDABSOLUTEBARRIER')) {
            secondAbsoluteBarrierValue = expectValue(block, 'SECONDABSOLUTEBARRIER');
        }
        if (isVisibleField('BARRIEROFFSET')) {
            const barrierOffsetType = block.getFieldValue('BARRIEROFFSETTYPE_LIST');
            const value = expectValue(block, 'BARRIEROFFSET');
            barrierOffsetValue = `'${barrierOffsetType}${value}'`;
        }
        if (isVisibleField('SECONDBARRIEROFFSET')) {
            const barrierOffsetType = block.getFieldValue('SECONDBARRIEROFFSETTYPE_LIST');
            const value = expectValue(block, 'SECONDBARRIEROFFSET');
            secondBarrierOffsetValue = `'${barrierOffsetType}${value}'`;
        }

        const code = `
            Bot.start({
            limitations: BinaryBotPrivateLimitations,
            duration: ${durationValue},
            duration_unit: '${durationType}',
            currency: '${currency}',
            amount: ${amount},
            prediction: ${predictionValue},
            absoluteBarrier: ${absoluteBarrierValue},
            secondAbsoluteBarrier: ${secondAbsoluteBarrierValue},
            barrierOffset: ${barrierOffsetValue},
            secondBarrierOffset: ${secondBarrierOffsetValue},
            });
        `;
        return code;
    };
};
