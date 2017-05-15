// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#pbvgpo
import { translate } from '../../../../../common/i18n';
import { insideDuringPurchase } from '../../relationChecker';

Blockly.Blocks.sell_at_market = {
    init: function init() {
        this.appendDummyInput().appendField(translate('Sell at market'));
        this.setPreviousStatement(true, 'SellAtMarket');
        this.setColour('#f2f2f2');
        this.setTooltip(translate('Sell at market.'));
        this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
    },
    onchange: function onchange(ev) {
        insideDuringPurchase(this, ev, translate('Sell at market'));
    },
};
Blockly.JavaScript.sell_at_market = () => 'Bot.sellAtMarket();\n';
