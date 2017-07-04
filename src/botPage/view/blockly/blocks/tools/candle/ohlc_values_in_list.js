// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#2jo335
import config from '../../../../../common/const';
import { translate } from '../../../../../../common/i18n';
import { expectValue } from '../../shared';

Blockly.Blocks.ohlc_values_in_list = {
    init: function init() {
        this.appendValueInput('OHLCLIST')
            .appendField(translate('Make a list of'))
            .appendField(new Blockly.FieldDropdown(config.ohlcFields), 'OHLCFIELD_LIST')
            .appendField(translate('values from candles list'));
        this.setOutput(true, 'Array');
        this.setColour('#dedede');
        this.setTooltip(translate('Returns a list of the selected candle values'));
        this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
    },
};

Blockly.JavaScript.ohlc_values_in_list = block => {
    const ohlcList = expectValue(block, 'OHLCLIST');
    const ohlcField = block.getFieldValue('OHLCFIELD_LIST');
    return [`Bot.candleValues(${ohlcList}, '${ohlcField}')`, Blockly.JavaScript.ORDER_ATOMIC];
};
