// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#pbvgpo
import { insideBeforePurchase } from '../../relationChecker';
import { translate } from '../../../../../common/i18n';
import { getPurchaseChoices } from '../shared';

Blockly.Blocks.purchase = {
    init: function init() {
        this.appendDummyInput()
            .appendField(translate('Purchase'))
            .appendField(new Blockly.FieldDropdown(getPurchaseChoices), 'PURCHASE_LIST');
        this.setPreviousStatement(true, 'Purchase');
        this.setColour('#f2f2f2');
        this.setTooltip(translate('Purchases a chosen contract.'));
        this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
    },
    onchange: function onchange(ev) {
        insideBeforePurchase(this, ev, 'Purchase');
    },
};
Blockly.JavaScript.purchase = block => {
    const purchaseList = block.getFieldValue('PURCHASE_LIST');
    const code = `Bot.purchase('${purchaseList}');
`;
    return code;
};
