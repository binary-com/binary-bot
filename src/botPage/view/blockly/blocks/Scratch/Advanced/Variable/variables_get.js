import { translate } from '../../../../../../../common/i18n';

Blockly.Blocks.variables_get = {
    init() {
        this.jsonInit({
            type    : 'variables_get',
            message0: '%1',
            args0   : [
                {
                    type    : 'field_variable',
                    name    : 'VAR',
                    variable: translate('item'),
                },
            ],
            output         : null,
            outputShape    : Blockly.OUTPUT_SHAPE_ROUND,
            colour         : Blockly.Colours.Binary.colour,
            colourSecondary: Blockly.Colours.Binary.colourSecondary,
            colourTertiary : Blockly.Colours.Binary.colourTertiary,
            tooltip        : '',
        });
    },
};

Blockly.JavaScript.variables_get = block => {
    // eslint-disable-next-line no-underscore-dangle
    const code = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
