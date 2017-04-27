// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#2jo335
import { translate } from '../../../../../common/i18n';
import { insideDuringPurchase } from '../../relationChecker';

Blockly.Blocks.check_sell = {
    init: function init() {
        this.appendDummyInput().appendField(translate('Sell is available'));
        this.setOutput(true, 'Boolean');
        this.setColour('#f2f2f2');
        this.setTooltip(translate('True if sell at market is available'));
        this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
    },
    onchange: function onchange(ev) {
        insideDuringPurchase(this, ev, translate('Sell is available'));
    },
};

Blockly.JavaScript.check_sell = () => {
    const code = 'Bot.isSellAvailable()';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
