import config from '../../../../../../common/const';
import { translate } from '../../../../../../../common/utils/tools';
import { expectValue } from '../../../../../../../botPage/view/blockly/blocks/shared';

Blockly.Blocks.bb_statement = {
    init() {
        this.jsonInit({
            message0: translate('set %1 to Bollinger Bands %2 %3'),
            message1: '%1',
            args0   : [
                {
                    type    : 'field_variable',
                    name    : 'VARIABLE',
                    variable: 'bb',
                },
                {
                    type   : 'field_dropdown',
                    name   : 'BBRESULT_LIST',
                    options: config.bbResult,
                },
                {
                    type: 'input_dummy',
                },
            ],
            args1: [
                {
                    type : 'input_statement',
                    name : 'STATEMENT',
                    check: null,
                },
            ],
            colour           : Blockly.Colours.Binary.colour,
            colourSecondary  : Blockly.Colours.Binary.colourSecondary,
            colourTertiary   : Blockly.Colours.Binary.colourTertiary,
            tooltip          : translate('Calculates Bollinger Bands (BB) from a list with a period'),
            previousStatement: null,
            nextStatement    : null,
        });
    },
    onchange(event) {
        if (!this.workspace || this.isInFlyout || this.workspace.isDragging()) {
            return;
        }

        if (event.type === Blockly.Events.END_DRAG) {
            const blocksInStatement = this.getBlocksInStatement('STATEMENT');
            blocksInStatement.forEach(block => {
                if (!this.requiredParamBlocks.includes(block.type)) {
                    Blockly.Events.disable();
                    block.unplug(false);
                    Blockly.Events.enable();
                }
            });
        }
    },
    requiredParamBlocks: ['input_list', 'period', 'std_dev_multiplier_up', 'std_dev_multiplier_down'],
};

Blockly.JavaScript.bb_statement = block => {
    // eslint-disable-next-line no-underscore-dangle
    const varName = Blockly.JavaScript.variableDB_.getName(
        block.getFieldValue('VARIABLE'),
        Blockly.Variables.NAME_TYPE
    );
    const bbResult = block.getFieldValue('BBRESULT_LIST');
    const input = expectValue(block.getChildByType('input_list'), 'INPUT_LIST');
    const period = block.childValueToCode('period', 'PERIOD') || '10';
    const stdDevUp = block.childValueToCode('std_dev_multiplier_up', 'UPMULTIPLIER') || '5';
    const stdDevDown = block.childValueToCode('std_dev_multiplier_down', 'DOWNMULTIPLIER') || '5';

    const code = `${varName} = Bot.bb(${input}, { periods: ${period}, stdDevUp: ${stdDevUp}, stdDevDown: ${stdDevDown} }, ${bbResult});\n`;
    return code;
};
