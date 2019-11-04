import { translate } from '../../../../../common/i18n';

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
            tooltip: translate('Returns a string representation of a key value pair'),
        });
    },
};

Blockly.JavaScript.key_value_pair = block => {
    const key = block.getFieldValue('KEY') || '';
    const value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC) || null;

    if (!key) {
        return '';
    }

    return [`{"${key}":${value}}`, Blockly.JavaScript.ORDER_ATOMIC];
};
