import { translate } from '../../../../../../../common/i18n';

Blockly.Blocks.lists_indexOf = {
    init() {
        this.jsonInit({
            message0: translate('in list %1 find %2 occurence of item %3'),
            args0   : [
                {
                    type: 'input_value',
                    name: 'VALUE',
                },
                {
                    type   : 'field_dropdown',
                    name   : 'END',
                    options: [[translate('first'), 'FIRST'], [translate('last'), 'LAST']],
                },
                {
                    type: 'input_value',
                    name: 'FIND',
                },
            ],
            output         : 'Number',
            outputShape    : Blockly.OUTPUT_SHAPE_ROUND,
            colour         : Blockly.Colours.Binary.colour,
            colourSecondary: Blockly.Colours.Binary.colourSecondary,
            colourTertiary : Blockly.Colours.Binary.colourTertiary,
        });
    },
};

Blockly.JavaScript.lists_indexOf = block => {
    const operator = block.getFieldValue('END') === 'FIRST' ? 'indexOf' : 'lastIndexOf';
    const item = Blockly.JavaScript.valueToCode(block, 'FIND', Blockly.JavaScript.ORDER_NONE) || '\'\'';
    const list = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_MEMBER) || '\'\'';

    const code = `${list}.${operator}(${item})`;

    if (block.workspace.options.oneBasedIndex) {
        return [`${code} + 1`, Blockly.JavaScript.ORDER_ADDITION];
    }

    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
