import { translate } from '../../../../../common/i18n';
import config from '../../../../common/const';
import { symbolApi } from '../../../shared';
import { setInputList, marketDefPlaceHolders, marketToTradeOption } from './tools';
import { duration, payout, prediction, barrierOffsetGenerator } from './components';

const isBlockCreationEvent = (ev, block) => ev.type === Blockly.Events.CREATE && ev.ids.indexOf(block.id) >= 0;

export default () => {
    // Backward Compatibility Separate market blocks into one
    const symbols = symbolApi.activeSymbols.getSymbols();

    Object.keys(symbols).forEach(k => {
        Blockly.Blocks[k] = {
            init: function init() {
                this.appendStatementInput('CONDITION').setCheck('Condition');
                this.setPreviousStatement(true, null);
            },
            onchange: function onchange(ev) {
                if (isBlockCreationEvent(ev, this)) {
                    marketToTradeOption(this, symbols[this.type]);
                }
            },
        };
        Blockly.JavaScript[k] = () => '';
    });

    // Replace market with tradeOptions
    Blockly.Blocks.market = {
        init: function init() {
            marketDefPlaceHolders(this);
            setInputList(this);
            this.setPreviousStatement(true, 'TradeOptions');
            this.setColour('#f2f2f2');
        },
        onchange: function onchange(ev) {
            if (isBlockCreationEvent(ev, this)) {
                marketToTradeOption(this);
            }
        },
    };
    Blockly.JavaScript.market = () => '';

    // Backward Compatibility Convert condition (a.k.a tradeType) blocks to market style
    Blockly.Blocks.allFields = {
        init: function init() {
            duration(this);
            payout(this);
            prediction(this);
            barrierOffsetGenerator('BARRIEROFFSET', this);
            barrierOffsetGenerator('SECONDBARRIEROFFSET', this);
            this.setInputsInline(false);
            this.setPreviousStatement(true, 'Condition');
        },
    };
    Object.keys(config.opposites).forEach(oppositesName => {
        Blockly.Blocks[oppositesName.toLowerCase()] = {
            init: function init() {
                const optionNames = [];
                config.opposites[oppositesName].forEach(options => {
                    const optionName = options[Object.keys(options)[0]];
                    optionNames.push(optionName);
                });
                duration(this);
                payout(this);
                prediction(this);
                barrierOffsetGenerator('BARRIEROFFSET', this);
                barrierOffsetGenerator('SECONDBARRIEROFFSET', this);
                this.setInputsInline(false);
                this.setPreviousStatement(true, 'Condition');
            },
        };
        Blockly.JavaScript[oppositesName.toLowerCase()] = () => '';
    });
};

Blockly.Blocks.barrier_offset = {
    init: function init() {
        this.appendValueInput('BARRIEROFFSET_IN')
            .setCheck('Number')
            .appendField(new Blockly.FieldDropdown(config.barrierTypes), 'BARRIEROFFSETTYPE_LIST');
        this.setInputsInline(false);
        this.setOutput(true, 'Number');
        this.setColour('#dedede');
        this.setTooltip(translate('Add sign to a number to make a Barrier Offset.'));
        this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
    },
};

Blockly.JavaScript.barrier_offset = () => '';
