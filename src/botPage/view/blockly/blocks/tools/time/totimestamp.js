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
    // const dString = Blockly.JavaScript.valueToCode(block, 'DATETIME', Blockly.JavaScript.ORDER_ATOMIC);
    // const code = `Bot.dateTimeStringToTimestamp('${dString}')`;
    // return [code, Blockly.JavaScript.ORDER_NONE];

    // YYYY-MM-DD HH:MM:SS format
    const dateString = Blockly.JavaScript.valueToCode(block, 'DATETIME', Blockly.JavaScript.ORDER_ATOMIC);

    // eslint-disable-next-line no-underscore-dangle
    const functionName = Blockly.JavaScript.provideFunction_('dateTimeStringToTimestamp', [
        // eslint-disable-next-line no-underscore-dangle
        `function ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(dateTimeString) {
            var p = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])\s(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]))/;
            if(p.test(dateTimeString)) {
                var date = new Date(dateTimeString);
            } else {
                return '${translate('Invalid date/time')}: ' + dateTimeString;
            }
            return date ? date.getTime() / 1000 : '${translate('Invalid date/time')}: ' + dateTimeString;
        }`,
    ]);

    const code = `${functionName}(${dateString})`;
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
