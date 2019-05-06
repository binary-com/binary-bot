import config from '../../../../../../../common/const';
import { translate } from '../../../../../../../../common/utils/tools';

Blockly.Blocks.read_ohlc_obj = {
    init() {
        this.jsonInit({
            message0: translate('Read %1 value in candle %2'),
            args0   : [
                {
                    type   : 'field_dropdown',
                    name   : 'OHLCFIELD_LIST',
                    options: config.ohlcFields,
                },
                {
                    type: 'input_value',
                    name: 'OHLCOBJ',
                },
            ],
            output         : 'Number',
            outputShape    : Blockly.OUTPUT_SHAPE_ROUND,
            colour         : Blockly.Colours.Binary.colour,
            colourSecondary: Blockly.Colours.Binary.colourSecondary,
            colourTertiary : Blockly.Colours.Binary.colourTertiary,
            tooltip        : translate('Read a field in a candle (read from the Candles list)'),
        });
    },
};

Blockly.JavaScript.read_ohlc_obj = block => {
    const ohlcField = block.getFieldValue('OHLCFIELD_LIST');
    const ohlcObj = Blockly.JavaScript.valueToCode(block, 'OHLCOBJ') || '{}';

    const code = `Bot.candleField(${ohlcObj}, '${ohlcField}');`;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
