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
                'Convert a string representing a date/time string into seconds since Epoch. Input format: yyyy-mm-dd hh:mm:ss'
            )
        );
        // this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
    },
};

Blockly.JavaScript.todatetime = block => {
    const timestamp = Blockly.JavaScript.valueToCode(block, 'TIMESTAMP', Blockly.JavaScript.ORDER_ATOMIC);
    const code = `Bot.timestampToDateTimeString(${timestamp})`;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
