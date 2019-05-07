import { translate } from '../../../../../../common/i18n';

Blockly.Blocks.text_changeCase = {
    init() {
        this.jsonInit({
            message0: translate('to %1 %2'),
            args0   : [
                {
                    type   : 'field_dropdown',
                    name   : 'CASE',
                    options: [
                        [translate('UPPER CASE'), 'UPPERCASE'],
                        [translate('lower case'), 'LOWERCASE'],
                        [translate('Title Case'), 'TITLECASE'],
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

Blockly.JavaScript.text_changeCase = block => {
    const operators = {
        UPPERCASE: '.toUpperCase()',
        LOWERCASE: '.toLowerCase()',
        TITLECASE: null,
    };
    const operator = operators[block.getFieldValue('CASE')];
    const textOrder = operator ? Blockly.JavaScript.ORDER_MEMBER : Blockly.JavaScript.ORDER_NONE;
    const text = Blockly.JavaScript.valueToCode(block, 'TEXT', textOrder) || '\'\'';

    let code;

    if (operator) {
        code = `${text}${operator}`;
    } else {
        // eslint-disable-next-line no-underscore-dangle
        const functionName = Blockly.JavaScript.provideFunction_('textToTitleCase', [
            // eslint-disable-next-line no-underscore-dangle
            `function ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(str) {
                return str.toLowerCase().split(' ').map(function(word) {
                    return word.replace(word[0], word[0].toUpperCase());
                }).join(' ');
            }`,
        ]);
        code = `${functionName}(${text})`;
    }

    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
