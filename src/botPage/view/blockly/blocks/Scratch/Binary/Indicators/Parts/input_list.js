import { translate } from '../../../../../../../../common/utils/tools';

Blockly.Blocks.input_list = {
    init() {
        this.requiredParentId = '';

        this.jsonInit({
            message0: translate('Input List %1'),
            args0   : [
                {
                    type : 'input_value',
                    name : 'INPUT_LIST',
                    check: 'Array',
                },
            ],
            colour           : Blockly.Colours.BinaryLessGray.colour,
            colourSecondary  : Blockly.Colours.BinaryLessGray.colourSecondary,
            colourTertiary   : Blockly.Colours.BinaryLessGray.colourTertiary,
            previousStatement: null,
            nextStatement    : null,
        });

        this.setMovable(false);
        this.setDeletable(false);
    },
    onchange(event) {
        if (!this.workspace || this.isInFlyout || this.workspace.isDragging()) {
            return;
        }

        const surroundParent = this.getSurroundParent();
        if (event.type === Blockly.Events.END_DRAG) {
            if (!this.requiredParentId && this.allowedParents.includes(surroundParent.type)) {
                this.requiredParentId = surroundParent.id;
            } else if (!surroundParent || surroundParent.id !== this.requiredParentId) {
                Blockly.Events.disable();
                this.unplug(false);

                const parentBlock = this.workspace.getAllBlocks().find(block => block.id === this.requiredParentId);

                if (parentBlock) {
                    const parentConnection = parentBlock.getLastConnectionInStatement('STATEMENT');
                    parentConnection.connect(this.previousConnection);
                } else {
                    this.dispose();
                }
                Blockly.Events.enable();
            }
        }
    },
    allowedParents: [
        'bb_statement',
        'bba_statement',
        'ema_statement',
        'emaa_statement',
        'macda_statement',
        'rsi_statement',
        'rsia_statement',
        'sma_statement',
        'smaa_statement',
    ],
};

Blockly.JavaScript.input_list = () => {};
