import { translate } from '../../../../../../common/i18n';

Blockly.Blocks.math_trig = {
    init() {
        this.jsonInit({
            message0: translate('%1 %2'),
            args0   : [
                {
                    type   : 'field_dropdown',
                    name   : 'OP',
                    options: [
                        ['sin', 'SIN'],
                        ['cos', 'COS'],
                        ['tan', 'TAN'],
                        ['asin', 'ASIN'],
                        ['acos', 'ACOS'],
                        ['atan', 'ATAN'],
                    ],
                },
                {
                    type : 'input_value',
                    name : 'NUM',
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

Blockly.JavaScript.math_trig = Blockly.JavaScript.math_single;
