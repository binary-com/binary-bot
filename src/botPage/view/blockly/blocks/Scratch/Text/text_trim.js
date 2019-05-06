import { translate } from '../../../../../../common/i18n';

Blockly.Blocks.text_trim = {
    init() {
        this.jsonInit({
            message0: translate('trim spaces from %1 of %2'),
            args0   : [
                {
                    type   : 'field_dropdown',
                    name   : 'MODE',
                    options: [
                        [translate('both sides'), 'BOTH'],
                        [translate('left side'), 'LEFT'],
                        [translate('right side'), 'RIGHT'],
                    ],
                },
                {
                    type: 'input_value',
                    name: 'TEXT',
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

Blockly.JavaScript.text_trim = block => {
    const operators = {
        LEFT : '.replace(/^[\\s\\xa0]+/, \'\')',
        RIGHT: '.replace(/[\\s\\xa0]+$/, \'\')',
        BOTH : '.trim()',
    };

    const operator = operators[block.getFieldValue('MODE')];
    const text = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_MEMBER) || '\'\'';

    const code = `${text}${operator}`;
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
