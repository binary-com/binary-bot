// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#3qghes
import { translate } from '../../../../../common/i18n';
import config from '../../../../common/const';
import { expectValue } from '../shared';

Blockly.Blocks.macda = {
    init: function init() {
        this.appendDummyInput()
            .appendField(translate('MACD Array'))
            .appendField(new Blockly.FieldDropdown(config.macdFields), 'MACDFIELDS_LIST');
        this.appendValueInput('INPUT').setCheck('Array').appendField(translate('Input List'));
        this.appendValueInput('FAST_EMA_PERIOD').setCheck('Number').appendField(translate('Fast EMA Period'));
        this.appendValueInput('SLOW_EMA_PERIOD').setCheck('Number').appendField(translate('Slow EMA Period'));
        this.appendValueInput('SMA_PERIOD').setCheck('Number').appendField(translate('SMA Period (for Signal)'));
        this.setOutput(true, 'Array');
        this.setColour('#dedede');
        this.setTooltip(translate('Calculates Moving Average Convergence Divergence (MACD) list from a list'));
        this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
    },
};

Blockly.JavaScript.macda = block => {
    const macdField = block.getFieldValue('MACDFIELDS_LIST');
    const input = expectValue(block, 'INPUT');
    const fastEmaPeriod = expectValue(block, 'FAST_EMA_PERIOD');
    const slowEmaPeriod = expectValue(block, 'SLOW_EMA_PERIOD');
    const smaPeriod = expectValue(block, 'SMA_PERIOD');
    return [
        `Bot.macda(${input}, {
    fastEmaPeriod: ${fastEmaPeriod},
    slowEmaPeriod: ${slowEmaPeriod},
    smaPeriod: ${smaPeriod},
  }, ${macdField})`,
        Blockly.JavaScript.ORDER_NONE,
    ];
};
