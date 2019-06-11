// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#wupwb4
import { translate } from '../../../../../../common/i18n';
// import { dateToTimeString } from 'binary-utils/lib';
// import { disable } from '../../../utils';

Blockly.Blocks.totimestamp = {
    init: function init() {
        this.appendDummyInput();
        this.appendValueInput('DATETIME').appendField(translate('To Timestamp'));
        this.setInputsInline(true);
        this.setOutput(true, 'Number');
        this.setColour('#dedede');
        this.setTooltip(
            translate(
                'Converts a string representing a date/time string into seconds since Epoch. Input format: yyyy-mm-dd hh:mm:ss'
            )
        );
        // this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
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
