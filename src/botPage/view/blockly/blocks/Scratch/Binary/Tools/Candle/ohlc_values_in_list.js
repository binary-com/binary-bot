import config from '../../../../../../../common/const';
import { translate } from '../../../../../../../../common/utils/tools';

Blockly.Blocks.ohlc_values_in_list = {
    init() {
        this.jsonInit({
            message0: translate('Make a list of %1 values from candles list %2'),
            args0   : [
                {
                    type   : 'field_dropdown',
                    name   : 'OHLCFIELD_LIST',
                    options: config.ohlcFields,
                },
                {
                    type   : 'field_dropdown',
                    name   : 'OHLCLIST',
                    options: config.candleIntervals,
                },
            ],
            output         : 'Array',
            outputShape    : Blockly.OUTPUT_SHAPE_ROUND,
            colour         : Blockly.Colours.Binary.colour,
            colourSecondary: Blockly.Colours.Binary.colourSecondary,
            colourTertiary : Blockly.Colours.Binary.colourTertiary,
            tooltip        : translate('Returns a list of the selected candle values'),
        });
    },
};

Blockly.JavaScript.ohlc_values_in_list = block => {
    const ohlcList = Blockly.JavaScript.valueToCode(block, 'OHLCLIST') || '[]';
    const ohlcField = block.getFieldValue('OHLCFIELD_LIST');

    const code = `Bot.candleValues(${ohlcList}, '${ohlcField}')`;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
