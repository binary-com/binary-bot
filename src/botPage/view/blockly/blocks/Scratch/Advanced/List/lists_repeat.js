import { translate } from '../../../../../../../common/i18n';

Blockly.Blocks.lists_repeat = {
    init() {
        this.jsonInit({
            message0: translate('set %1 to item %2 repeated %3 times'),
            args0   : [
                {
                    type    : 'field_variable',
                    name    : 'VARIABLE',
                    variable: translate('list'),
                },
                {
                    type: 'input_value',
                    name: 'ITEM',
                },
                {
                    type: 'input_value',
                    name: 'NUM',
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

Blockly.JavaScript.lists_repeat = block => {
    // eslint-disable-next-line no-underscore-dangle
    const varName = Blockly.JavaScript.variableDB_.getName(
        block.getFieldValue('VARIABLE'),
        Blockly.Variables.NAME_TYPE
    );
    // eslint-disable-next-line no-underscore-dangle
    const functionName = Blockly.JavaScript.provideFunction_('listsRepeat', [
        // eslint-disable-next-line no-underscore-dangle
        `function ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(value, n) {
            var array = [];
            for (var i = 0; i < n; i++) {
                array[i] = value;
            }
            return array;
        }`,
    ]);

    const element = Blockly.JavaScript.valueToCode(block, 'ITEM', Blockly.JavaScript.ORDER_COMMA) || 'null';
    const repeatCount = Blockly.JavaScript.valueToCode(block, 'NUM', Blockly.JavaScript.ORDER_COMMA) || '0';

    const code = `${varName} = ${functionName}(${element}, ${repeatCount});\n`;
    return code;
};
