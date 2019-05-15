import { translate } from '../../../../../../../common/i18n';

Blockly.Blocks.controls_whileUntil = {
    init() {
        this.jsonInit({
            message0: translate('repeat %1 %2'),
            args0   : [
                {
                    type   : 'field_dropdown',
                    name   : 'MODE',
                    options: [[translate('while'), 'WHILE'], [translate('until'), 'until']],
                },
                {
                    type : 'input_value',
                    name : 'BOOL',
                    check: 'Boolean',
                },
            ],
            message1: translate('do %1'),
            args1   : [
                {
                    type: 'input_statement',
                    name: 'DO',
                },
            ],
            colour           : Blockly.Colours.Binary.colour,
            colourSecondary  : Blockly.Colours.Binary.colourSecondary,
            colourTertiary   : Blockly.Colours.Binary.colourTertiary,
            previousStatement: null,
            nextStatement    : null,
        });
    },
};

Blockly.JavaScript.controls_whileUntil = block => {
    const until = block.getFieldValue('MODE') === 'UNTIL';
    const order = until ? Blockly.JavaScript.ORDER_LOGICAL_NOT : Blockly.JavaScript.ORDER_NONE;

    let argument0 = Blockly.JavaScript.valueToCode(block, 'BOOL', order) || 'false';
    let branch = Blockly.JavaScript.statementToCode(block, 'DO');
    branch = Blockly.JavaScript.addLoopTrap(branch, block.id);

    if (until) {
        argument0 = `!${argument0}`;
    }

    const maxLoops = Blockly.JavaScript.variableDB_.getDistinctName('maxLoops', Blockly.Variables.NAME_TYPE);
    const currentLoop = Blockly.JavaScript.variableDB_.getDistinctName('currentLoop', Blockly.Variables.NAME_TYPE);

    return `
        var ${maxLoops} = 10000;
        var ${currentLoop} = 0;

        while (${argument0}) {
            ${branch}
            ${currentLoop}++;
            if (${currentLoop} > ${maxLoops}) {
                throw new Error("${translate('Infinite loop detected')}");
            }
        }\n`;
};
