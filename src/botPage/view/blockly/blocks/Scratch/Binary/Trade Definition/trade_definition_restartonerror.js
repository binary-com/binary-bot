Blockly.Blocks.trade_definition_restartonerror = {
    init() {
        this.jsonInit({
            message0: 'Restart last trade on error (bot ignores the unsuccessful trade): %1',
            args0   : [
                {
                    type : 'input_value',
                    name : 'RESTARTONERROR',
                    check: 'Boolean',
                },
            ],
            colour           : Blockly.Colours.BinaryLessPurple.colour,
            colourSecondary  : Blockly.Colours.Binary.colourSecondary,
            colourTertiary   : Blockly.Colours.BinaryLessPurple.colourTertiary,
            previousStatement: null,
            nextStatement    : null,
        });

        this.setMovable(false);
        this.setDeletable(false);
    },
    onchange(event) {
        const allowedEvents = [Blockly.Events.BLOCK_CREATE, Blockly.Events.BLOCK_CHANGE, Blockly.Events.END_DRAG];
        if (!this.workspace || this.isInFlyout || !allowedEvents.includes(event.type) || this.workspace.isDragging()) {
            return;
        }

        if (event.type === Blockly.Events.END_DRAG) {
            this.enforceParent();
        }
    },
    enforceParent: Blockly.Blocks.trade_definition_market.enforceParent,
};
Blockly.JavaScript.trade_definition_restartonerror = () => {};
