import { translate } from '../../../../../common/i18n';
import { expectValue } from '../shared';

Blockly.Blocks.key_value_pair = {
    init() {
        this.jsonInit({
            message0: translate('Key: %1 Value: %2'),
            args0   : [
                {
                    type: 'field_input',
                    name: 'KEY',
                    text: 'default',
                },
                {
                    type: 'input_value',
                    name: 'VALUE',
                },
            ],
            colour : '#dedede',
            output : null,
            tooltip: translate('Payload for webhook'),
        });
    },
};

Blockly.JavaScript.key_value_pair = block => {
    const key = block.getFieldValue('KEY') || '';
    const value = expectValue(block, 'VALUE');

    if (!key || !value) {
        return '';
    }

    return [`{"${key}":${value}}`, Blockly.JavaScript.ORDER_ATOMIC];
};
