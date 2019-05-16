import { translate } from '../../../../../common/i18n';

Blockly.Blocks.notify_telegram = {
    init() {
        this.jsonInit({
            message0: translate('Notify Telegram %1 Access Token: %2 Chat ID: %3 Message: %4'),
            args0   : [
                {
                    type: 'input_dummy',
                },
                {
                    type: 'input_value',
                    name: 'TELEGRAM_BOT_ID',
                },
                {
                    type: 'input_value',
                    name: 'TELEGRAM_CHAT_ID',
                },
                {
                    type: 'input_value',
                    name: 'TELEGRAM_MESSAGE',
                },
            ],
            colour           : '#dedede',
            inputsInline     : true,
            previousStatement: null,
            nextStatement    : null,
            tooltip          : translate('Sends a message to Telegram'),
        });
    },
};

Blockly.JavaScript.notify_telegram = block => {
    const botId = Blockly.JavaScript.valueToCode(block, 'TELEGRAM_BOT_ID') || '';
    const chatId = Blockly.JavaScript.valueToCode(block, 'TELEGRAM_CHAT_ID') || '';
    const message = Blockly.JavaScript.valueToCode(block, 'TELEGRAM_MESSAGE') || '';

    if (!botId || !chatId || !message) {
        return '';
    }

    const code = `Bot.notifyTelegram(${botId}, ${chatId}, ${message});\n`;
    return code;
};
