import config from '../../../../common/const';
import { translate } from '../../../../../common/i18n';

export default function candleInterval(block) {
    block
        .appendDummyInput()
        .appendField(`${translate('with interval')}:`)
        .appendField(new Blockly.FieldDropdown(config.candleIntervals), 'CANDLEINTERVAL_LIST');

    block.setInputsInline(true);
}

export const getGranularity = block => {
    const granularity = block.getFieldValue('CANDLEINTERVAL_LIST');
    return granularity === 'default' ? 'undefined' : granularity;
};
