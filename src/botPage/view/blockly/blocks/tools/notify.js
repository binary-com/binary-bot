// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#pmhydb
import { translate } from '../../../../../common/i18n';
import config from '../../../../common/const';
import { expectValue } from '../shared';

Blockly.Blocks.notify = {
    init: function init() {
        this.appendValueInput('MESSAGE')
            .setCheck(null)
            .appendField(translate('Notify'))
            .appendField(new Blockly.FieldDropdown(config.lists.NOTIFICATION_TYPE), 'NOTIFICATION_TYPE')
            .appendField(`${translate('with sound')}:`)
            .appendField(new Blockly.FieldDropdown(config.lists.NOTIFICATION_SOUND), 'NOTIFICATION_SOUND');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#dedede');
        this.setTooltip(translate('Creates notification'));
        this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
    },
};
Blockly.JavaScript.notify = block => {
    const notificationType = block.getFieldValue('NOTIFICATION_TYPE');
    const sound = block.getFieldValue('NOTIFICATION_SOUND');
    const message = expectValue(block, 'MESSAGE');
    const code = `Bot.notify({ className: '${notificationType}', message: ${message}, sound: '${sound}'});
`;
    return code;
};
