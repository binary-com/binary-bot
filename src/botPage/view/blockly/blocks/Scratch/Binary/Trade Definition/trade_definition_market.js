import { fieldGeneratorMapping } from '../../../shared';

Blockly.Blocks.trade_definition_market = {
    init() {
        this.jsonInit({
            message0: 'Market: %1 Submarket: %2 Symbol: %3',
            args0   : [
                {
                    type   : 'field_dropdown',
                    name   : 'MARKET_LIST',
                    options: fieldGeneratorMapping.MARKET_LIST,
                },
                {
                    type   : 'field_dropdown',
                    name   : 'SUBMARKET_LIST',
                    options: [['', '']],
                },
                {
                    type   : 'field_dropdown',
                    name   : 'SYMBOL_LIST',
                    options: [['', '']],
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

        const topParentBlock = this.getTopParent();
        if (!topParentBlock || topParentBlock.type !== 'trade_definition') {
            this.enforceParent();
            return;
        }

        const updateMarketLists = (fields, useDefault = true) => {
            fields.forEach(field => {
                const list = this.getField(field);
                const listArgs = [fieldGeneratorMapping[field](this)()];
                if (useDefault) {
                    listArgs.push(list.getValue());
                }
                list.updateOptions(...listArgs);
            });
        };

        if (event.type === Blockly.Events.BLOCK_CREATE) {
            if (event.ids.includes(this.id)) {
                updateMarketLists(['SUBMARKET_LIST', 'SYMBOL_LIST']);
            }
        } else if (event.type === Blockly.Events.BLOCK_CHANGE) {
            if (event.blockId === this.id) {
                if (event.name === 'MARKET_LIST') {
                    updateMarketLists(['SUBMARKET_LIST']);
                } else if (event.name === 'SUBMARKET_LIST') {
                    updateMarketLists(['SYMBOL_LIST']);
                }
            }
        }
    },
    enforceParent() {
        if (!this.isDescendantOf('trade_definition')) {
            Blockly.Events.disable();
            this.unplug(true);
            this.dispose();
            Blockly.Events.enable();
        }
    },
};

Blockly.JavaScript.trade_definition_market = () => {};
