import config from '../../../../common/const';
import { insideAfterPurchase } from '../../relationChecker';
import { translate } from '../../../../../common/i18n';

Blockly.Blocks.contract_check_result = {
    init: function init() {
        this.appendDummyInput()
            .appendField(translate('Result is'))
            .appendField(new Blockly.FieldDropdown(config.lists.CHECK_RESULT), 'CHECK_RESULT');
        this.setOutput(true, 'Boolean');
        this.setColour('#f2f2f2');
        this.setTooltip(translate('True if the result matches the selection'));
        this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
    },
    onchange: function onchange(ev) {
        insideAfterPurchase(this, ev, 'Check Result');
    },
};
Blockly.JavaScript.contract_check_result = block => {
    const checkWith = block.getFieldValue('CHECK_RESULT');
    const code = `Bot.isResult('${checkWith}')`;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
