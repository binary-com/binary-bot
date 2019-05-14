import { loadRemote } from '../../../../../utils';
import { observer as globalObserver } from '../../../../../../../../common/utils/observer';
import { translate } from '../../../../../../../../common/utils/tools';

Blockly.Blocks.loader = {
    init() {
        this.loadedByMe = [];
        this.loadedVariables = [];
        this.currentUrl = '';

        this.jsonInit({
            message0: translate('Load block from: %1'),
            args0   : [
                {
                    type: 'field_input',
                    name: 'URL',
                    text: 'http://www.example.com/block.xml',
                },
            ],
            colour         : Blockly.Colours.Binary.colour,
            colourSecondary: Blockly.Colours.Binary.colourSecondary,
            colourTertiary : Blockly.Colours.Binary.colourTertiary,
            tooltip        : translate('Load blocks from URL'),
        });

        const urlField = this.getField('URL');
        // eslint-disable-next-line no-underscore-dangle
        urlField.onFinishEditing_ = newValue => this.onFinishEditingUrl(newValue);
    },
    onFinishEditingUrl(newValue) {
        if (this.currentUrl === newValue) {
            return;
        }

        if (this.disabled) {
            const hasKnownUrl = this.workspace
                .getAllBlocks()
                .some(block => block.type === 'loader' && block.id !== this.id && block.currentUrl === this.currentUrl);
            if (hasKnownUrl) {
                this.setDisabled(false);
            }
        }

        const { recordUndo } = Blockly.Events;
        Blockly.Events.recordUndo = false;

        loadRemote(this)
            .then(() => {
                Blockly.Events.recordUndo = recordUndo;
                globalObserver.emit('ui.log.success', translate('Blocks are loaded successfully'));
            })
            .catch(errorMsg => {
                Blockly.Events.recordUndo = recordUndo;
                globalObserver.emit('ui.log.error', errorMsg);
            });

        this.currentUrl = this.getFieldValue('URL');
    },
    onchange(event) {
        if (event.type === Blockly.Events.BLOCK_CREATE && event.ids.includes(this.id)) {
            this.currentUrl = this.getFieldValue('URL');
            this.workspace.getAllBlocks().forEach(block => {
                if (block.type === 'loader' && block.id !== this.id) {
                    if (block.currentUrl === this.currentUrl) {
                        this.setDisabled(true);
                    }
                }
            });
        }
    },
};

Blockly.JavaScript.loader = block => {
    if (block.loadedVariables.length) {
        // eslint-disable-next-line no-underscore-dangle
        return `var ${block.loadedVariables.map(v => Blockly.JavaScript.variableDB_.safeName_(v)).toString()}`;
    }
    return '';
};
