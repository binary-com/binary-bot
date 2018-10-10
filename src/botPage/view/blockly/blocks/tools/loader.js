// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#tkcvmb
import { observer as globalObserver } from '../../../../../common/utils/observer';
import { translate } from '../../../../../common/i18n';
import { deleteBlocksLoadedBy, loadRemote, recoverDeletedBlock } from '../../utils';

Blockly.Blocks.loader = {
    init: function init() {
        this.appendDummyInput()
            .appendField(`${translate('Load Block From')}:`)
            .appendField(new Blockly.FieldTextInput('http://www.example.com/block.xml'), 'URL');
        this.setInputsInline(true);
        this.setColour('#dedede');
        this.setTooltip(translate('Load blocks from url'));
        this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
        this.loadedByMe = [];
        this.loadedVariables = [];
    },
    onchange: function onchange(ev) {
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

Blockly.JavaScript.loader = block =>
    block.loadedVariables.length
        ? // eslint-disable-next-line no-underscore-dangle
        `var ${block.loadedVariables.map(v => Blockly.JavaScript.variableDB_.safeName_(v)).toString()};`
        : '';
