// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#pbvgpo
import { insideBeforePurchase } from '../../relationChecker';
import { translate } from '../../../../../common/i18n';
import { getPurchaseChoices } from '../shared';

Blockly.Blocks.ask_price = {
    init: function init() {
        this.appendDummyInput()
            .appendField(translate('Ask Price'))
            .appendField(new Blockly.FieldDropdown(() => getPurchaseChoices()), 'PURCHASE_LIST');
        this.setOutput(true, 'Number');
        this.setColour('#f2f2f2');
        this.setTooltip(translate('Ask Price for selected proposal'));
        this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
    },
    onchange: function onchange(ev) {
        insideBeforePurchase(this, ev, 'Ask Price');
    },
};
Blockly.JavaScript.ask_price = block => {
    const purchaseList = block.getFieldValue('PURCHASE_LIST');
    const code = `Bot.getAskPrice('${purchaseList}')`;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
