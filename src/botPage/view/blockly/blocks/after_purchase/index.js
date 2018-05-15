// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#i7qkfj
import { translate } from '../../../../../common/i18n';
import './check_result';
import './read_details';
import './trade_again';
import { configMainBlock, setBlockTextColor } from '../../utils';
import { finishSign } from '../images';

Blockly.Blocks.after_purchase = {
    init: function init() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage(finishSign, 25, 25, 'F'))
            .appendField(translate('(4) Get your trade result and trade again'));
        this.appendStatementInput('AFTERPURCHASE_STACK').setCheck('TradeAgain');
        this.setColour('#2a3052');
        this.setTooltip(
            translate('Get the previous trade information and result, then trade again (Runs on trade finish)')
        );
        this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
    },
    onchange: function onchange(ev) {
        if (ev.type === 'create') {
            setBlockTextColor(this);
        }
        configMainBlock(ev, 'after_purchase');
    },
};
Blockly.JavaScript.after_purchase = block => {
    const stack = Blockly.JavaScript.statementToCode(block, 'AFTERPURCHASE_STACK');
    const code = `BinaryBotPrivateAfterPurchase = function BinaryBotPrivateAfterPurchase(){
    ${stack}
    return false;
  };
  `;
    return code;
};
