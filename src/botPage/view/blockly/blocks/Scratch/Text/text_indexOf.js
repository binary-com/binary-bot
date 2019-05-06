import { translate } from '../../../../../../common/i18n';

Blockly.Blocks.text_indexOf = {
    init() {
        this.jsonInit({
            message0: translate('in text %1 find %2 occurence of text %3'),
            args0   : [
                {
                    type: 'input_value',
                    name: 'VALUE',
                    // check: 'String', Rendering looks off when check is enabled.
                },
                {
                    type   : 'field_dropdown',
                    name   : 'END',
                    options: [[translate('first'), 'FIRST'], [translate('last'), 'LAST']],
                },
                {
                    type: 'input_value',
                    name: 'FIND',
                    // check: 'String',
                },
            ],
            output         : 'String',
            outputShape    : Blockly.OUTPUT_SHAPE_SQUARE,
            colour         : Blockly.Colours.Binary.colour,
            colourSecondary: Blockly.Colours.Binary.colourSecondary,
            colourTertiary : Blockly.Colours.Binary.colourTertiary,
        });
    },
};

Blockly.JavaScript.text_indexOf = block => {
    const functionName = block.getFieldValue('END') === 'FIRST' ? 'indexOf' : 'lastIndexOf';
    const substring = Blockly.JavaScript.valueToCode(block, 'FIND', Blockly.JavaScript.ORDER_NONE) || '\'\'';
    const text = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_MEMBER) || '\'\'';

    const code = `${text}.${functionName}(${substring})`;
    if (block.workspace.options.oneBasedIndex) {
        return [`${code} + 1`, Blockly.JavaScript.ORDER_ADDITION];
    }
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
