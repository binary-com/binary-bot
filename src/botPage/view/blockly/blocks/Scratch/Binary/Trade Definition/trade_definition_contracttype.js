import { translate } from '../../../../../../../common/utils/tools';
import { oppositesToDropdown } from '../../../../utils';
import config from '../../../../../../common/const';

Blockly.Blocks.trade_definition_contracttype = {
    init() {
        this.jsonInit({
            type    : 'trade_definition',
            message0: 'Contract Type: %1',
            args0   : [
                {
                    type   : 'field_dropdown',
                    name   : 'TYPE_LIST',
                    options: [['', '']],
                },
            ],
            previousStatement: 'trade_definition',
            nextStatement    : 'trade_definition',
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

        const getContractTypes = () => {
            const tradeTypeBlock = topParentBlock.getChildByType('trade_definition_tradetype');
            const tradeType = tradeTypeBlock && tradeTypeBlock.getFieldValue('TRADETYPE_LIST');
            if (tradeType) {
                return [[translate('Both'), 'both'], ...oppositesToDropdown(config.opposites[tradeType.toUpperCase()])];
            }
            return [['', '']];
        };

        const updateTypeList = (useDefault = true) => {
            const typeList = this.getField('TYPE_LIST');
            const typeListArgs = [getContractTypes()];
            if (useDefault) {
                typeListArgs.push(typeList.getValue());
            }
            typeList.updateOptions(...typeListArgs);
        };

        if (event.type === Blockly.Events.BLOCK_CHANGE) {
            if (event.name === 'TRADETYPE_LIST') {
                updateTypeList();
            }
        } else if (event.type === Blockly.Events.BLOCK_CREATE) {
            if (event.ids.includes(this.id)) {
                updateTypeList();
            }
        }
    },
    enforceParent: Blockly.Blocks.trade_definition_market.enforceParent,
};
Blockly.JavaScript.trade_definition_contracttype = () => '';
