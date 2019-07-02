import { translate } from '../../../../../../common/i18n';

Blockly.Blocks.totimestamp = {
    init: function init() {
        this.appendDummyInput();
        this.appendValueInput('DATETIME').appendField(translate('To Timestamp'));
        this.setInputsInline(true);
        this.setOutput(true, 'Number');
        this.setColour('#dedede');
        this.setTooltip(
            translate(
                'Converts a string representing a date/time string into seconds since Epoch. Example: 2019-01-01 21:03:45 GMT+0800 will be converted to 1546347825. Time and time zone offset are optional.'
            )
        );
    },
};

Blockly.JavaScript.totimestamp = block => {
    const dateString = Blockly.JavaScript.valueToCode(block, 'DATETIME', Blockly.JavaScript.ORDER_ATOMIC);
    // eslint-disable-next-line no-underscore-dangle
    const functionName = Blockly.JavaScript.provideFunction_('dateTimeStringToTimestamp', [
        // eslint-disable-next-line no-underscore-dangle
        `function ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(dateTimeString) {
            return Bot.toTimestamp(dateTimeString);
        }`,
    ]);

    const code = `${functionName}(${dateString})`;
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
