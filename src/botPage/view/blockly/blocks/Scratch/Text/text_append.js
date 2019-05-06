import { translate } from '../../../../../../common/i18n';

Blockly.Blocks.text_append = {
    init() {
        this.jsonInit({
            message0: translate('to %1 append text %2'),
            args0   : [
                {
                    type    : 'field_variable',
                    name    : 'VAR',
                    variable: translate('text'),
                },
                {
                    type: 'input_value',
                    name: 'TEXT',
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

/**
 * Enclose the provided value in 'String(...)' function.
 * Leave string literals alone.
 * @param {string} value Code evaluating to a value.
 * @return {string} Code evaluating to a string.
 * @private
 */
Blockly.JavaScript.text.forceString_ = function(value) {
    if (Blockly.JavaScript.text.forceString_.strRegExp.test(value)) {
        return value;
    }
    return `String(${value})`;
};

/**
 * Regular expression to detect a single-quoted string literal.
 */
Blockly.JavaScript.text.forceString_.strRegExp = /^\s*'([^']|\\')*'\s*$/;

Blockly.JavaScript.text_append = block => {
    const varName = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    const value = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_NONE) || '\'\'';

    const code = `${varName} += ${Blockly.JavaScript.text.forceString_(value)};\n`;
    return code;
};
