// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#qx2zox
import { translate } from '../../../../../common/i18n';
import './sell_at_market';
import './check_sell';
import './sell_price';
import { configMainBlock, setBlockTextColor } from '../../utils';
import { sellContract } from '../images';

Blockly.Blocks.during_purchase = {
    init: function init() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage(sellContract, 25, 25, 'S'))
            .appendField(translate('(3) Watch and sell your purchased contract'));
        this.appendStatementInput('DURING_PURCHASE_STACK').setCheck('SellAtMarket');
        this.setColour('#2a3052');
        this.setTooltip(
            translate('Watch the purchased contract info and sell at market if available (Runs on contract update)')
        );
        this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
    },
    onchange: function onchange(ev) {
        if (ev.type === 'create') {
            setBlockTextColor(this);
        }
        configMainBlock(ev, 'during_purchase');
    },
};
Blockly.JavaScript.during_purchase = block => {
    const stack = Blockly.JavaScript.statementToCode(block, 'DURING_PURCHASE_STACK');
    const code = `BinaryBotPrivateDuringPurchase = function BinaryBotPrivateDuringPurchase(){
    ${stack}
  };
  `;
    return code;
};
