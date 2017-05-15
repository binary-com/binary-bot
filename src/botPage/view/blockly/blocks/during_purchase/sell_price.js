import { translate } from '../../../../../common/i18n';
import { insideDuringPurchase } from '../../relationChecker';

Blockly.Blocks.sell_price = {
    init: function init() {
        this.appendDummyInput().appendField(translate('Sell profit/loss'));
        this.setOutput(true, 'Number');
        this.setColour('#f2f2f2');
        this.setTooltip(translate('Returns the profit for sell at market.'));
        this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
    },
    onchange: function onchange(ev) {
        insideDuringPurchase(this, ev, translate('Sell profit/loss'));
    },
};
Blockly.JavaScript.sell_price = () => {
    const code = 'Bot.getSellPrice()';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
