// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#szwuog
import config from '../../../../common/const';
import { translate } from '../../../../../common/i18n';
import { mainScope } from '../../relationChecker';
import candleInterval, { getGranularity } from './candleInterval';

Blockly.Blocks.read_ohlc = {
    init: function init() {
        this.appendValueInput('CANDLEINDEX')
            .setCheck('Number')
            .appendField(translate('In candles list read '))
            .appendField(new Blockly.FieldDropdown(config.ohlcFields), 'OHLCFIELD_LIST')
            .appendField(translate('# from end'));
        candleInterval(this);
        this.setOutput(true, 'Number');
        this.setInputsInline(true);
        this.setColour('#f2f2f2');
        this.setTooltip(translate('Read the selected candle value in the nth recent candle'));
        this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
    },
    onchange: function onchange(ev) {
        mainScope(this, ev, 'Read Candle Field');
    },
};

Blockly.JavaScript.read_ohlc = block => {
    const ohlcField = block.getFieldValue('OHLCFIELD_LIST');
    const index = Blockly.JavaScript.valueToCode(block, 'CANDLEINDEX', Blockly.JavaScript.ORDER_ATOMIC) || 1;

    return [
        `Bot.getOhlcFromEnd({ field: '${ohlcField}', index: ${index}, granularity: ${getGranularity(block)} })`,
        Blockly.JavaScript.ORDER_ATOMIC,
    ];
};
