/* eslint-disable no-underscore-dangle */
import { translate } from '../../../../../common/i18n';
import { expectValue } from '../shared';

Blockly.Blocks.webhook = {
    init() {
        this.jsonInit({
            message0: translate('Webhook URL: %1'),
            args0   : [
                {
                    type: 'input_value',
                    name: 'WEBHOOK_URL',
                },
            ],
            colour           : '#dedede',
            previousStatement: null,
            nextStatement    : null,
            tooltip          : translate('Sends a POST request to a URL'),
        });

        this.itemCount_ = 1;
        this.updateShape_(false);
        this.setMutator(new Blockly.Mutator(['lists_create_with_item']));
    },
    /**
     * Create XML to represent list inputs.
     * @return {!Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom() {
        const container = document.createElement('mutation');
        container.setAttribute('items', this.itemCount_);
        return container;
    },
    /**
     * Parse XML to restore the list inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation(xmlElement) {
        this.itemCount_ = parseInt(xmlElement.getAttribute('items'));
        this.updateShape_(false);
    },
    /**
     * Populate the mutator's dialog with this block's components.
     * @param {!Blockly.Workspace} workspace Mutator's workspace.
     * @return {!Blockly.Block} Root block in mutator.
     * @this Blockly.Block
     */
    decompose(workspace) {
        const containerBlock = workspace.newBlock('lists_create_with_container');
        containerBlock.initSvg();

        let { connection } = containerBlock.getInput('STACK');
        for (let i = 0; i < this.itemCount_; i++) {
            const itemBlock = workspace.newBlock('lists_create_with_item');
            itemBlock.initSvg();
            connection.connect(itemBlock.previousConnection);
            connection = itemBlock.nextConnection;
        }
        return containerBlock;
    },
    /**
     * Reconfigure this block based on the mutator dialog's components.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    compose(containerBlock) {
        let itemBlock = containerBlock.getInputTargetBlock('STACK');
        // Count number of inputs.
        const connections = [];
        while (itemBlock) {
            connections.push(itemBlock.valueConnection_);
            itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
        }
        this.itemCount_ = connections.length;
        this.updateShape_(true);
    },
    /**
     * Modify this block to have the correct number of inputs.
     * @private
     * @this Blockly.Block
     */
    updateShape_(attachInput) {
        if (this.itemCount_ && this.getInput('EMPTY')) {
            this.removeInput('EMPTY');
        } else if (!this.itemCount_ && !this.getInput('EMPTY')) {
            this.appendDummyInput('EMPTY').appendField(translate('Empty payload'));
        }
        let i;
        for (i = 0; i < this.itemCount_; i++) {
            if (!this.getInput(`ADD${i}`)) {
                const input = this.appendValueInput(`ADD${i}`);

                if (i === 0) {
                    input.appendField(translate('Payload:'));
                }

                if (!attachInput) {
                    return;
                }
                const { connection } = input;
                const keypair = this.workspace.newBlock('key_value_pair', `keyvalue${i}`);
                keypair.initSvg();
                keypair.render();
                keypair.outputConnection.connect(connection);
            }
        }
        // Remove deleted inputs.
        while (this.getInput(`ADD${i}`)) {
            this.removeInput(`ADD${i}`);
            i++;
        }
    },
    onchange: function onchange(ev) {
        if (!this.workspace || this.isInFlyout || this.workspace.isDragging()) {
            return;
        }

        if (ev.type === Blockly.Events.MOVE) {
            for (let i = 0; i < this.itemCount_; i++) {
                const currentBlock = this.getInputTargetBlock(`ADD${i}`);
                if (currentBlock && currentBlock.type !== 'key_value_pair') {
                    currentBlock.unplug(true);
                }
            }
        }
    },
};

Blockly.JavaScript.webhook = block => {
    const url = expectValue(block, 'WEBHOOK_URL');

    if (!block.itemCount_) {
        return `Bot.sendWebhook(${url}, null);\n`;
    }

    const keypairs = new Array(block.itemCount_);
    for (let i = 0; i < block.itemCount_; i++) {
        keypairs[i] = Blockly.JavaScript.valueToCode(block, `ADD${i}`, Blockly.JavaScript.ORDER_ATOMIC) || null;
    }

    const params = keypairs
        .filter(item => item !== null)
        .map(item => {
            const regExp = /^{(.*?)}$/;
            return item && item.match(regExp)[1];
        });

    return `Bot.sendWebhook(${url}, {${params}});\n`;
};
