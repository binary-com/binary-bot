import { translate } from '../../../../../../common/i18n';

Blockly.Blocks.math_random_int = {
    init() {
        this.jsonInit({
            message0: translate('random integer from %1 to %2'),
            args0   : [
                {
                    type : 'input_value',
                    name : 'FROM',
                    check: 'Number',
                },
                {
                    type : 'input_value',
                    name : 'TO',
                    check: 'Number',
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

Blockly.JavaScript.math_random_int = block => {
    const argument0 = Blockly.JavaScript.valueToCode(block, 'FROM', Blockly.JavaScript.ORDER_COMMA) || '0';
    const argument1 = Blockly.JavaScript.valueToCode(block, 'TO', Blockly.JavaScript.ORDER_COMMA) || '0';

    // eslint-disable-next-line no-underscore-dangle
    const functionName = Blockly.JavaScript.provideFunction_('mathRandomInt', [
        // eslint-disable-next-line no-underscore-dangle
        `function ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(a, b) {
            if (a > b) {
                // Swap a and b to ensure a is smaller.
                const c = a;
                a = b;
                b = c;
            }
            return Math.floor(Math.random() * (b - a + 1) + a);
        }`,
    ]);

    const code = `${functionName}(${argument0}, ${argument1})`;
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
