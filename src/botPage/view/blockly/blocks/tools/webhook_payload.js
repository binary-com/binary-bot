import { translate } from '../../../../../common/i18n';
import { expectValue } from '../shared';

Blockly.Blocks.webhook_payload = {
    init() {
        this.jsonInit({
            message0: translate('Key : %1 Value : %2'),
            args0   : [
                {
                    type: 'field_input',
                    name: 'WEBHOOK_KEY',
                    text: 'default',
                },
                {
                    type : 'input_value',
                    name : 'WEBHOOK_VALUE',
                    check: ['Number', 'String'],
                },
            ],
            colour           : '#dedede',
            previousStatement: null,
            nextStatement    : null,
            tooltip          : translate('Payload for webhook'),
        });
    },
};

Blockly.JavaScript.webhook_payload = block => {
    const key = block.getFieldValue('WEBHOOK_KEY') || '';
    let value = expectValue(block, 'WEBHOOK_VALUE');

    if (!key || !value) {
        return '';
    }

    if (typeof value !== 'string') {
        value = value.toString();
    }

    return `'${key}':${value},`;
};
