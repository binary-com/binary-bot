import { translate } from '../../../../../common/i18n';
import { expectValue } from '../shared';

Blockly.Blocks.webhook = {
    init() {
        this.jsonInit({
            message0: translate('Webhook URL : %1'),
            args0   : [
                {
                    type: 'input_value',
                    name: 'WEBHOOK_URL',
                },
            ],
            message1: translate('Payload : %1'),
            args1   : [
                {
                    type: 'input_statement',
                    name: 'WEBHOOK_PAYLOAD',
                },
            ],
            colour           : '#dedede',
            previousStatement: null,
            nextStatement    : null,
            tooltip          : translate('Send payload to URL'),
        });
    },
    onchange: function onchange(ev) {
        if (!this.workspace || this.isInFlyout || this.workspace.isDragging()) {
            return;
        }

        if (ev.type === Blockly.Events.MOVE) {
            let currentBlock = this.getInputTargetBlock('WEBHOOK_PAYLOAD');

            while (currentBlock !== null) {
                if (currentBlock.type !== 'webhook_payload') {
                    currentBlock.unplug(true);
                }

                currentBlock = currentBlock.getNextBlock();
            }
        }
    },
};

Blockly.JavaScript.webhook = block => {
    const url = expectValue(block, 'WEBHOOK_URL');
    let payload = Blockly.JavaScript.statementToCode(block, 'WEBHOOK_PAYLOAD') || '';

    if (!url || !payload) {
        return '';
    }

    // JSON does not aceept single quote
    payload = payload.replace(/'/g, '"');

    const code = `Bot.sendWebhook(${url}, {${payload.trim().slice(0, -1)}});\n`;
    return code;
};
