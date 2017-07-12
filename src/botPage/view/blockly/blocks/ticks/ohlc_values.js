// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#2jo335
import config from '../../../../common/const';
import { mainScope } from '../../relationChecker';
import { translate } from '../../../../../common/i18n';
import candleInterval, { getGranularity } from './candleInterval';

Blockly.Blocks.ohlc_values = {
    init: function init() {
        this.appendDummyInput()
            .appendField(translate('Make a List of'))
            .appendField(new Blockly.FieldDropdown(config.ohlcFields), 'OHLCFIELD_LIST')
            .appendField(translate('values in candles list'));
        candleInterval(this);
        this.setOutput(true, 'Array');
        this.setColour('#f2f2f2');
        this.setTooltip(translate('Returns a list of the selected candle values'));
        this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
    },
    onchange: function onchange(ev) {
        mainScope(this, ev, 'Candles List');
    },
};

Blockly.JavaScript.ohlc_values = block => {
    const ohlcField = block.getFieldValue('OHLCFIELD_LIST');

    return [
        `Bot.getOhlc({ field: '${ohlcField}', granularity: ${getGranularity(block)} })`,
        Blockly.JavaScript.ORDER_ATOMIC,
    ];
};
