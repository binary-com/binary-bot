// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#u8i287
import { translate } from '../../../../../common/i18n';
import { insideAfterPurchase } from '../../relationChecker';
import config from '../../../../common/const';

Blockly.Blocks.read_details = {
    init: function init() {
        this.appendDummyInput()
            .appendField(translate('Contract Detail:'))
            .appendField(new Blockly.FieldDropdown(config.lists.DETAILS), 'DETAIL_INDEX');
        this.setOutput(true, null);
        this.setColour('#f2f2f2');
        this.setTooltip(translate('Reads a selected option from contract details list'));
        this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
    },
    onchange: function onchange(ev) {
        insideAfterPurchase(this, ev, 'Read Contract Details');
    },
};
Blockly.JavaScript.read_details = block => {
    const detailIndex = block.getFieldValue('DETAIL_INDEX');
    const code = `Bot.readDetails(${detailIndex})`;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
