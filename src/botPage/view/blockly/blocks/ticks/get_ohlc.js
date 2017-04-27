// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#szwuog
import { translate } from '../../../../../common/i18n';
import { mainScope } from '../../relationChecker';

Blockly.Blocks.get_ohlc = {
    init: function init() {
        this.appendValueInput('CANDLEINDEX')
            .setCheck('Number')
            .appendField(translate('in candle list'))
            .appendField(`${translate('get # from end')}`);
        this.setOutput(true, 'Candle');
        this.setInputsInline(true);
        this.setColour('#f2f2f2');
        this.setTooltip(translate('Get the nth recent candle'));
        this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
    },
    onchange: function onchange(ev) {
        mainScope(this, ev, 'Get Candle');
    },
};

Blockly.JavaScript.get_ohlc = block => {
    const index = Number(Blockly.JavaScript.valueToCode(block, 'CANDLEINDEX', Blockly.JavaScript.ORDER_ATOMIC)) || 1;
    return [`Bot.getOhlcFromEnd({ index: ${index} })`, Blockly.JavaScript.ORDER_ATOMIC];
};
