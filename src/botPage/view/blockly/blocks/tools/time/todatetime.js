// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#wupwb4
import { translate } from '../../../../../../common/i18n';
// import { disable } from '../../../utils';

Blockly.Blocks.todatetime = {
    init: function init() {
        this.appendDummyInput();
        this.appendValueInput('TIMESTAMP').appendField(translate('To Date/Time'));
        this.setInputsInline(true);
        this.setOutput(true, 'String');
        this.setColour('#dedede');
        this.setTooltip(
            translate(
                'Converts a string representing a date/time string into seconds since Epoch. Input format: yyyy-mm-dd hh:mm:ss'
            )
        );
        // this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
    },
};

Blockly.JavaScript.todatetime = block => {
    // const timestamp = Blockly.JavaScript.valueToCode(block, 'TIMESTAMP', Blockly.JavaScript.ORDER_ATOMIC);
    // const code = `Bot.timestampToDateTimeString(${timestamp})`;
    // return [code, Blockly.JavaScript.ORDER_ATOMIC];

    const timestamp = Blockly.JavaScript.valueToCode(block, 'TIMESTAMP', Blockly.JavaScript.ORDER_ATOMIC);

    // eslint-disable-next-line no-underscore-dangle
    const functionName = Blockly.JavaScript.provideFunction_('timestampToDateString', [
        // eslint-disable-next-line no-underscore-dangle
        `function ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(timestamp) {
            var dateTime;
            if(typeof timestamp == 'number') {
                dateTime = new Date(timestamp * 1000);
            }
            return [
                dateTime.getFullYear().toString(),
                dateTime.getMonth()+1 < 10 ? '0' + (dateTime.getMonth()+1) : dateTime.getMonth()+1,
                dateTime.getDate() < 10 ? '0' + dateTime.getDate() : dateTime.getDate()
            ].join('-') + ' ' + 
            [
                dateTime.getHours() < 10 ? '0' + dateTime.getHours() : dateTime.getHours(),
                dateTime.getMinutes() < 10 ? '0' + dateTime.getMinutes() : dateTime.getMinutes(),
                dateTime.getSeconds() < 10 ? '0' + dateTime.getSeconds() : dateTime.getSeconds()
            ].join(':');
        }`,
    ]);

    const code = `${functionName}(${timestamp})`;
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
