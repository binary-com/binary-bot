import { deleteBlocksLoadedBy, loadRemote, recoverDeletedBlock } from '../../../../../utils';
import { observer as globalObserver } from '../../../../../../../../common/utils/observer';
import { translate } from '../../../../../../../../common/utils/tools';

Blockly.Blocks.loader = {
    init() {
        this.loadedByMe = [];
        this.loadedVariables = [];

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
    },
    onchange(ev) {
        if (!this.isInFlyout && ev.type === 'change' && ev.element === 'disabled' && ev.blockId === this.id) {
            if (ev.newValue === true) {
                deleteBlocksLoadedBy(this.id);
            } else {
                const loader = Blockly.mainWorkspace.getBlockById(ev.blockId);
                if (loader && loader.loadedByMe) {
                    loader.loadedByMe.forEach(blockId =>
                        recoverDeletedBlock(Blockly.mainWorkspace.getBlockById(blockId))
                    );
                }
            }
        }

        if (
            !this.isInFlyout &&
            (ev.type === 'change' && ev.element === 'field') &&
            ev.blockId === this.id &&
            !this.disabled
        ) {
            const { recordUndo } = Blockly.Events;

            Blockly.Events.recordUndo = false;
            deleteBlocksLoadedBy(this.id);
            loadRemote(this).then(
                () => {
                    Blockly.Events.recordUndo = recordUndo;
                    globalObserver.emit('ui.log.success', translate('Blocks are loaded successfully'));
                },
                e => {
                    Blockly.Events.recordUndo = recordUndo;
                    throw e;
                }
            );
        }
    },
};

Blockly.JavaScript.loader = block => {
    if (block.loadedVariables.length) {
        return `var ${block.loadedVariables.map(v => Blockly.JavaScript.variableDB_.safeName_(v)).toString()}`;
    }
    return '';
};
