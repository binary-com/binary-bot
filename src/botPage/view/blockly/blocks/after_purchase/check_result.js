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
    onchange(event) {
        // insideAfterPurchase(this, ev, 'Check Result');

        if (event.type === Blockly.Events.END_DRAG) {
            // Ensure block is in `trade_definition` block
            const parentBlock = this.getParent();
            while (parentBlock !== null) {
                if (parentBlock.type === 'trade_definition') {
                    this.setDisabled(false);
                    return;
                }
            }

            $.notify('Woops, not in correct parent.');
            this.unplug();
            this.setDisabled(true);
        }
    },
};
Blockly.JavaScript.contract_check_result = block => {
    const checkWith = block.getFieldValue('CHECK_RESULT');
    const code = `Bot.isResult('${checkWith}')`;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
