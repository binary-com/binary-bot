import { translate } from '../../../../../../../common/i18n';
import { getBarriersForContracts, pollForContracts, getDurationsForContracts } from '../../../shared';
import { findTopParentBlock, hideEventsFromBlockly } from '../../../../utils';
import config from '../../../../../../common/const';

Blockly.Blocks.trade_definition_tradeoptions = {
    init() {
        this.jsonInit({
            type    : 'trade_definition',
            message0: translate('Duration: %1 %2 Stake: %3 %4'),
            args0   : [
                {
                    type   : 'field_dropdown',
                    name   : 'DURATIONTYPE_LIST',
                    options: [['', '']],
                },
                {
                    type: 'input_value',
                    name: 'DURATION',
                },
                {
                    type   : 'field_dropdown',
                    name   : 'CURRENCY_LIST',
                    options: config.lists.CURRENCY,
                },
                {
                    type : 'input_value',
                    name : 'AMOUNT',
                    check: 'Number',
                },
            ],
            colour           : Blockly.Colours.BinaryLessPurple.colour,
            colourSecondary  : Blockly.Colours.Binary.colourSecondary,
            colourTertiary   : Blockly.Colours.BinaryLessPurple.colourTertiary,
            previousStatement: null,
            nextStatement    : null,
        });

        // Ensure one of this type per statement-stack
        this.setNextStatement(false);
    },
    onchange(event) {
        const allowedEvents = [Blockly.Events.BLOCK_CREATE, Blockly.Events.BLOCK_CHANGE, Blockly.Events.END_DRAG];
        if (!this.workspace || this.isInFlyout || !allowedEvents.includes(event.type) || this.workspace.isDragging()) {
            return;
        }

        const topParentBlock = this.getTopParent();
        if (!topParentBlock || topParentBlock.type !== 'trade_definition') {
            if (!this.disabled) {
                this.setDisabled(true);
            }
            return;
        } else if (this.disabled) {
            this.setDisabled(false);
        }

        const symbol = topParentBlock.getChildFieldValue('trade_definition_market', 'SYMBOL_LIST') || '';
        const tradeTypeBlock = topParentBlock.getChildByType('trade_definition_tradetype');
        const tradeType = tradeTypeBlock.getFieldValue('TRADETYPE_LIST') || '';
        const durationUnit = this.getFieldValue('DURATIONTYPE_LIST');

        if (event.type === Blockly.Events.BLOCK_CREATE) {
            if (event.ids.includes(this.id)) {
                pollForContracts(symbol).then(contracts => {
                    const durations = getDurationsForContracts(contracts, tradeType);
                    this.updateDurationInput(durations, true);
                });
            }
        } else if (event.type === Blockly.Events.BLOCK_CHANGE) {
            if (event.blockId === this.id) {
                if (event.name === 'DURATIONTYPE_LIST') {
                    pollForContracts(symbol).then(contracts => {
                        this.updateBarrierInputs(contracts, tradeType, durationUnit);
                    });
                } else if (event.name === 'BARRIERTYPE_LIST' || event.name === 'SECONDBARRIERTYPE_LIST') {
                    this.applyBarrierHandlebars(event.name);
                    pollForContracts(symbol).then(contracts => {
                        this.updateBarrierInputs(contracts, tradeType, durationUnit);
                    });
                }
            }
        } else if (event.type === Blockly.Events.END_DRAG) {
            if (event.blockId === this.id) {
                pollForContracts(symbol).then(contracts => {
                    const durations = getDurationsForContracts(contracts, tradeType);
                    this.updateDurationInput(durations, true);
                });
            }
        }
    },
    createPredictionInput(predictionRange) {
        hideEventsFromBlockly(() => {
            if (this.getInput('PREDICTION')) {
                return;
            }

            this.appendDummyInput('PREDICTION_LABEL').appendField(translate('Prediction:'));

            const predictionInput = this.appendValueInput('PREDICTION');

            // We can't determine which contract a user buys, so sometimes the prediction range
            // returned may not be valid, start at minimum index 1 (if possible) to bypass that
            const index = Math.min(1, predictionRange.length - 1);
            const shadowBlock = this.workspace.newBlock('math_number');

            shadowBlock.setShadow(true);
            shadowBlock.setFieldValue(predictionRange[index], 'NUM');
            shadowBlock.outputConnection.connect(predictionInput.connection);
            shadowBlock.initSvg();
            shadowBlock.render(true);
        });
    },
    createBarrierInput(barriers, startIndex = 0) {
        const inputNames = ['BARRIER', 'SECONDBARRIER'];
        const inputLabels = [translate('High barrier'), translate('Low barrier')];

        for (let i = startIndex; i < barriers.values.length; i++) {
            if (this.getInput(inputNames[i])) {
                return;
            }

            const label = barriers.values.length === 1 ? translate('Barrier') : inputLabels[i];
            const input = this.appendValueInput(inputNames[i])
                .appendField(translate(label), `${inputNames[i]}_LABEL`)
                .appendField(new Blockly.FieldDropdown(config.barrierTypes), `${inputNames[i]}TYPE_LIST`);

            const shadowBlock = this.workspace.newBlock('math_number');
            shadowBlock.setShadow(true);
            shadowBlock.setFieldValue(barriers.values[i], 'NUM');
            shadowBlock.outputConnection.connect(input.connection);
            shadowBlock.initSvg();
            shadowBlock.render(true);
        }
    },
    updateDurationInput(durations, setMinDuration) {
        const durationList = this.getField('DURATIONTYPE_LIST');
        durationList.updateOptions(durations.map(duration => [duration.label, duration.unit]));

        const durationInput = this.getInput('DURATION');
        if (durationInput.connection.isConnected()) {
            const targetBlock = durationInput.connection.targetBlock();
            if (targetBlock.isShadow()) {
                const minDuration = durations.find(duration => duration.unit === durationList.getValue());
                if (setMinDuration) {
                    targetBlock.setFieldValue(minDuration.minimum, 'NUM');
                }
            }
        }
    },
    // Only updates a single `trade_definition_tradeoptions` block, i.e. `this` instance
    updateBarrierInputs(contracts, tradeType, durationUnit) {
        const selectedBarrierTypes = [
            this.getFieldValue('BARRIERTYPE_LIST') || config.barrierTypes[0][1],
            this.getFieldValue('SECONDBARRIERTYPE_LIST') || config.barrierTypes[1][1],
        ];

        const barriers = getBarriersForContracts(contracts, tradeType, durationUnit, selectedBarrierTypes);
        const inputNames = ['BARRIER', 'SECONDBARRIER'];

        for (let i = 0; i < barriers.values.length; i++) {
            const input = this.getInput(inputNames[i]);

            if (input && input.connection.isConnected()) {
                const targetBlock = input.connection.targetBlock();
                const barrierTypeList = this.getField(`${inputNames[i]}TYPE_LIST`);
                const absoluteType = [[translate('Absolute'), 'absolute']];

                if (durationUnit === 'd') {
                    barrierTypeList.updateOptions(absoluteType, 'absolute');
                } else if (barriers.allowBothTypes || barriers.allowAbsoluteType) {
                    barrierTypeList.updateOptions(
                        [...config.barrierTypes, ...absoluteType],
                        barrierTypeList.getValue()
                    );
                } else {
                    barrierTypeList.updateOptions(config.barrierTypes, barrierTypeList.getValue());
                }

                if (targetBlock.isShadow()) {
                    targetBlock.setFieldValue(barriers.values[i], 'NUM');
                }
            }
        }
    },
    // Allow only one type of barrier (i.e. either both offset or absolute barrier type)
    applyBarrierHandlebars(barrierInputName) {
        const newValue = this.getFieldValue(barrierInputName);
        const otherBarrierListName =
            barrierInputName === 'BARRIERTYPE_LIST' ? 'SECONDBARRIERTYPE_LIST' : 'BARRIERTYPE_LIST';
        const otherBarrierList = this.getField(otherBarrierListName);

        if (otherBarrierList) {
            const otherBarrierType = otherBarrierList.getValue();

            if (config.barrierTypes.findIndex(type => type[1] === newValue) !== -1 && otherBarrierType === 'absolute') {
                const otherValue = config.barrierTypes.find(type => type[1] !== newValue);

                otherBarrierList.setValue(otherValue[1]);
            } else if (newValue === 'absolute' && otherBarrierType !== 'absolute') {
                otherBarrierList.setValue('absolute');
            }
        }
    },
    // Rebuild block from XML
    domToMutation(xmlElement) {
        const hasFirstBarrier = xmlElement.getAttribute('has_first_barrier') === 'true';
        const hasSecondBarrier = xmlElement.getAttribute('has_second_barrier') === 'true';
        const hasPrediction = xmlElement.getAttribute('has_prediction') === 'true';

        if (hasFirstBarrier && hasSecondBarrier) {
            this.createBarrierInput({ values: [1, 2] });
        } else if (hasFirstBarrier) {
            this.createBarrierInput({ values: [1] });
        } else if (hasPrediction) {
        }
    },
    // Export mutations to XML
    mutationToDom() {
        const container = document.createElement('mutation');
        container.setAttribute('has_first_barrier', !!this.getInput('BARRIER'));
        container.setAttribute('has_second_barrier', !!this.getInput('SECONDBARRIER'));
        container.setAttribute('has_prediction', !!this.getInput('PREDICTION'));
        return container;
    },
    enforceParent: Blockly.Blocks.trade_definition_market.enforceParent,
};

Blockly.JavaScript.trade_definition_tradeoptions = block => {
    const durationValue = Blockly.JavaScript.valueToCode(block, 'DURATION') || '0';
    const durationType = block.getFieldValue('DURATIONTYPE_LIST') || '0';
    const currency = block.getFieldValue('CURRENCY_LIST');
    const amount = Blockly.JavaScript.valueToCode(block, 'AMOUNT') || '0';

    let predictionValue = 'undefined';

    if (block.getInput('PREDICTION')) {
        predictionValue = Blockly.JavaScript.valueToCode(block, 'PREDICTION') || '-1';
    }

    const getBarrierValue = (barrierOffsetType, value) => {
        // Variables should not be encapsulated in quotes
        if (/^(\d+(\.\d+)?)$/.test(value)) {
            return barrierOffsetType === 'absolute' ? `'${value}'` : `'${barrierOffsetType}${value}'`;
        }
        return barrierOffsetType === 'absolute' ? value : `'${barrierOffsetType}' + ${value}`;
    };

    let barrierOffsetValue = 'undefined';
    let secondBarrierOffsetValue = 'undefined';

    if (block.getInput('BARRIER')) {
        const barrierOffsetType = block.getFieldValue('BARRIERTYPE_LIST');
        const value = Blockly.JavaScript.valueToCode(block, 'BARRIER') || '0';
        barrierOffsetValue = getBarrierValue(barrierOffsetType, value);
    }

    if (block.getInput('SECONDBARRIER')) {
        const barrierOffsetType = block.getFieldValue('SECONDBARRIERTYPE_LIST');
        const value = Blockly.JavaScript.valueToCode(block, 'SECONDBARRIER') || '0';
        secondBarrierOffsetValue = getBarrierValue(barrierOffsetType, value);
    }

    const code = `
        Bot.start({
        limitations: BinaryBotPrivateLimitations,
        duration: ${durationValue},
        duration_unit: '${durationType}',
        currency: '${currency}',
        amount: ${amount},
        prediction: ${predictionValue},
        barrierOffset: ${barrierOffsetValue},
        secondBarrierOffset: ${secondBarrierOffsetValue},
        });
    `;
    return code;
};
