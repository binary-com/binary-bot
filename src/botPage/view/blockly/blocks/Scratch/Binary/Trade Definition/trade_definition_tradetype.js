import {
    fieldGeneratorMapping,
    pollForContracts,
    getPredictionForContracts,
    getBarriersForContracts,
    getDurationsForContracts,
} from '../../../shared';
import config from '../../../../../../common/const';
import { translate } from '../../../../../../../common/utils/tools';

Blockly.Blocks.trade_definition_tradetype = {
    init() {
        this.jsonInit({
            message0: translate('Trade Category: %1 Trade Type: %2'),
            args0   : [
                {
                    type   : 'field_dropdown',
                    name   : 'TRADETYPECAT_LIST',
                    options: [['', '']],
                },
                {
                    type   : 'field_dropdown',
                    name   : 'TRADETYPE_LIST',
                    options: [['', '']],
                },
            ],
            colour           : Blockly.Colours.BinaryLessPurple.colour,
            colourSecondary  : Blockly.Colours.Binary.colourSecondary,
            colourTertiary   : Blockly.Colours.BinaryLessPurple.colourTertiary,
            previousStatement: null,
            nextStatement    : null,
        });
        this.setMovable(false);
        this.setDeletable(false);
    },
    onchange(event) {
        const allowedEvents = [Blockly.Events.BLOCK_CREATE, Blockly.Events.BLOCK_CHANGE, Blockly.Events.END_DRAG];
        if (!this.workspace || this.isInFlyout || !allowedEvents.includes(event.type) || this.workspace.isDragging()) {
            return;
        }

        const topParentBlock = this.getTopParent();
        if (!topParentBlock || topParentBlock.type !== 'trade_definition') {
            this.enforceParent();
            return;
        }
        const marketBlock = topParentBlock.getChildByType('trade_definition_market');
        if (!marketBlock) {
            return;
        }
        const symbol = marketBlock.getFieldValue('SYMBOL_LIST');
        if (!symbol) {
            return;
        }

        const updateTradeTypeCatList = (useDefault = false) => {
            const tradeTypeCatList = this.getField('TRADETYPECAT_LIST');
            const tradeTypeCatArgs = [fieldGeneratorMapping.TRADETYPECAT_LIST(marketBlock)()];
            if (useDefault) {
                tradeTypeCatArgs.push(tradeTypeCatList.getValue());
            }
            tradeTypeCatList.updateOptions(...tradeTypeCatArgs);
        };

        const updateTradeTypeList = (useDefault = false) => {
            const tradeTypeList = this.getField('TRADETYPE_LIST');
            const tradeTypeArgs = [fieldGeneratorMapping.TRADETYPE_LIST(this)()];
            if (useDefault) {
                tradeTypeArgs.push(tradeTypeList.getValue());
            }
            tradeTypeList.updateOptions(...tradeTypeArgs);
        };

        if (event.type === Blockly.Events.BLOCK_CHANGE) {
            if (event.name === 'MARKET_LIST' || event.name === 'SUBMARKET_LIST' || event.name === 'SYMBOL_LIST') {
                updateTradeTypeCatList();
            } else if (event.name === 'TRADETYPECAT_LIST') {
                updateTradeTypeList();
            } else if (event.name === 'TRADETYPE_LIST') {
                pollForContracts(symbol).then(contracts => {
                    this.updatePredictionInputs(contracts);
                    this.updateBarrierInputs(contracts);
                    this.updateDurationInputs(contracts);
                });
            }
        } else if (event.type === Blockly.Events.BLOCK_CREATE) {
            if (event.ids.includes(this.id)) {
                updateTradeTypeCatList(true);
                updateTradeTypeList(true);
                pollForContracts(symbol).then(contracts => {
                    this.updateDurationInputs(contracts);
                });
            }
        }
    },
    updateBarrierInputs(contracts) {
        const topParentBlock = this.getTopParent();
        this.workspace
            .getAllBlocks()
            .filter(block => block.type === 'trade_definition_tradeoptions')
            .forEach(tradeOptionsBlock => {
                const barrierOffsetNames = ['BARRIER', 'SECONDBARRIER'];
                const barrierLabels = [translate('High barrier'), translate('Low barrier')];

                const tradeType = topParentBlock.getChildFieldValue('trade_definition_tradetype', 'TRADETYPE_LIST');
                const durationUnit = tradeOptionsBlock.getFieldValue('DURATIONTYPE_LIST');

                const firstBarrierType =
                    tradeOptionsBlock.getFieldValue('BARRIERTYPE_LIST') || config.barrierTypes[0][1];
                const secondBarrierType =
                    tradeOptionsBlock.getFieldValue('SECONDBARRIERTYPE_LIST') || config.barrierTypes[1][1];
                const selectedBarrierTypes = [firstBarrierType, secondBarrierType];
                const barriers = getBarriersForContracts(contracts, tradeType, durationUnit, selectedBarrierTypes);

                if (barriers.values.length === 0) {
                    tradeOptionsBlock.removeInput('BARRIER', true);
                    tradeOptionsBlock.removeInput('SECONDBARRIER', true);
                } else {
                    Blockly.Events.disable();

                    const firstBarrierInput = tradeOptionsBlock.getInput('BARRIER');
                    const secondBarrierInput = tradeOptionsBlock.getInput('SECONDBARRIER');

                    if (barriers.values.length > 0) {
                        if (!firstBarrierInput) {
                            tradeOptionsBlock.createBarrierInput(barriers);
                        }

                        if (barriers.values.length === 1 && secondBarrierInput) {
                            tradeOptionsBlock.removeInput('SECONDBARRIER');
                        } else if (barriers.values.length === 2 && !secondBarrierInput) {
                            tradeOptionsBlock.createBarrierInput(barriers, 1);
                            // Ensure barrier inputs are displayed together
                            tradeOptionsBlock.moveInputBefore('BARRIER', 'SECONDBARRIER');
                        }

                        barriers.values.forEach((barrierValue, index) => {
                            const typeList = tradeOptionsBlock.getField(`${barrierOffsetNames[index]}TYPE_LIST`);
                            const typeInput = tradeOptionsBlock.getInput(barrierOffsetNames[index]);
                            const absoluteType = [[translate('Absolute'), 'absolute']];

                            if (durationUnit === 'd') {
                                typeList.updateOptions(absoluteType);
                            } else if (barriers.allowBothTypes || barriers.allowAbsoluteType) {
                                typeList.updateOptions([...config.barrierTypes, ...absoluteType]);
                            } else {
                                typeList.updateOptions(config.barrierTypes);
                            }

                            if (barriers.values.length === 1) {
                                typeInput.fieldRow[0].setText(`${translate('Barrier')}:`);
                            } else {
                                typeInput.fieldRow[0].setText(`${barrierLabels[index]}:`);
                            }
                        });

                        // Updates Shadow Block values
                        const barrierInputArgs = [
                            contracts,
                            tradeType,
                            tradeOptionsBlock.getFieldValue('DURATIONTYPE_LIST'),
                        ];
                        tradeOptionsBlock.updateBarrierInputs(...barrierInputArgs);
                    }

                    tradeOptionsBlock.initSvg();
                    tradeOptionsBlock.render();

                    Blockly.Events.enable();
                }
            });
    },
    updatePredictionInputs(contracts) {
        const topParentBlock = this.getTopParent();
        const tradeType = topParentBlock.getChildFieldValue('trade_definition_tradetype', 'TRADETYPE_LIST');
        const predictionRange = getPredictionForContracts(contracts, tradeType);

        this.workspace
            .getAllBlocks()
            .filter(block => block.type === 'trade_definition_tradeoptions')
            .forEach(tradeOptionsBlock => {
                if (predictionRange.length === 0) {
                    tradeOptionsBlock.removeInput('PREDICTION_LABEL');
                    tradeOptionsBlock.removeInput('PREDICTION');
                } else {
                    const predictionInput = tradeOptionsBlock.getInput('PREDICTION');
                    if (predictionInput) {
                        // TODO: Set new suggested value from API, i.e. first value in prediction range
                    } else {
                        tradeOptionsBlock.createPredictionInput(predictionRange);
                    }
                }
                tradeOptionsBlock.initSvg();
                tradeOptionsBlock.render(true);
            });
    },
    updateDurationInputs(contracts) {
        const topParentBlock = this.getTopParent();
        const tradeType = topParentBlock.getChildFieldValue('trade_definition_tradetype', 'TRADETYPE_LIST');
        const durations = getDurationsForContracts(contracts, tradeType);

        this.workspace
            .getAllBlocks()
            .filter(block => block.type === 'trade_definition_tradeoptions')
            .forEach(tradeOptionsBlock => {
                const durationUnits = durations.map(duration => [duration.label, duration.unit]);
                const durationList = tradeOptionsBlock.getField('DURATIONTYPE_LIST');
                durationList.updateOptions(durationUnits);

                const minDuration = durations.find(duration => duration.unit === durationList.getValue());
                if (minDuration) {
                    tradeOptionsBlock.updateDurationInput(durations, minDuration.minimum);
                }
            });
    },
    enforceParent: Blockly.Blocks.trade_definition_market.enforceParent,
};
Blockly.JavaScript.trade_definition_tradetype = () => '';
