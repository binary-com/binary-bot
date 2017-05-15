// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#xkasg4
import { translate } from '../../../../../common/i18n';
import { insideAfterPurchase } from '../../relationChecker';

Blockly.Blocks.trade_again = {
    init: function init() {
        this.appendDummyInput().appendField(translate('Trade Again'));
        this.setPreviousStatement(true, 'TradeAgain');
        this.setColour('#f2f2f2');
        this.setTooltip(translate('Runs the trade block again'));
        this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
    },
    onchange: function onchange(ev) {
        insideAfterPurchase(this, ev, 'Trade Again');
    },
};
Blockly.JavaScript.trade_again = () => 'return true;';
