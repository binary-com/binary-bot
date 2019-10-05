import { observer as globalObserver } from '../../../../../common/utils/observer';
import { translate } from '../../../../../common/i18n';
import config from '../../../../common/const';
import { setBlockTextColor, findTopParentBlock, deleteBlockIfExists } from '../../utils';
import { defineContract } from '../images';
import { updatePurchaseChoices, fieldGeneratorMapping, dependentFieldMapping } from '../shared';
import { marketDefPlaceHolders } from './tools';
import backwardCompatibility from './backwardCompatibility';
import tradeOptions from './tradeOptions';

const bcMoveAboveInitializationsDown = block => {
    Blockly.Events.recordUndo = false;
    Blockly.Events.setGroup('BackwardCompatibility');
    const parent = block.getParent();
    if (parent) {
        const initializations = block.getInput('INITIALIZATION').connection;
        const ancestor = findTopParentBlock(parent);
        parent.nextConnection.disconnect();
        initializations.connect((ancestor || parent).previousConnection);
    }
    block.setPreviousStatement(false);
    Blockly.Events.setGroup(false);
    Blockly.Events.recordUndo = true;
};

const decorateTrade = ev => {
    const trade = Blockly.mainWorkspace.getBlockById(ev.blockId);
    if (!trade || trade.type !== 'trade') {
        return;
    }
    if ([Blockly.Events.CHANGE, Blockly.Events.MOVE, Blockly.Events.CREATE].includes(ev.type)) {
        const symbol = trade.getFieldValue('SYMBOL_LIST');
        if (symbol) {
            globalObserver.emit('bot.init', symbol);
        }

        const type = trade.getFieldValue('TRADETYPE_LIST');
        if (type) {
            const oppositesName = type.toUpperCase();
            const contractType = trade.getFieldValue('TYPE_LIST');
            if (oppositesName && contractType) {
                updatePurchaseChoices(contractType, oppositesName);
            }
        }
    }
};

const replaceInitializationBlocks = (trade, ev) => {
    if (ev.type === Blockly.Events.CREATE) {
        ev.ids.forEach(blockId => {
            const block = Blockly.mainWorkspace.getBlockById(blockId);

            if (block && block.type === 'trade' && !deleteBlockIfExists(block)) {
                bcMoveAboveInitializationsDown(block);
            }
        });
    }
};

const forceUpdateField = (trade, fieldName) => {
    Blockly.Events.fire(new Blockly.Events.Change(trade, 'field', fieldName, '', trade.getFieldValue(fieldName)));
};

const setDefaultFields = (trade, parentFieldName) => {
    if (!Object.keys(dependentFieldMapping).includes(parentFieldName)) return;
    const childFieldName = dependentFieldMapping[parentFieldName];
    const [[, defaultValue]] = fieldGeneratorMapping[childFieldName](trade)();
    trade.setFieldValue(defaultValue, childFieldName);
    if (childFieldName === 'TRADETYPECAT_LIST') forceUpdateField(trade, 'TRADETYPECAT_LIST');
};

const resetTradeFields = (trade, ev) => {
    if (ev.blockId === trade.id) {
        if (ev.element === 'field') {
            setDefaultFields(trade, ev.name);
            if (ev.name === 'TRADETYPE_LIST') {
                if (ev.newValue) {
                    trade.setFieldValue('both', 'TYPE_LIST');
                } else {
                    trade.setFieldValue('', 'TYPE_LIST');
                }
            }
        }
    }
};

Blockly.Blocks.trade = {
    init: function init() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage(defineContract, 25, 25, 'T'))
            .appendField(translate('(1) Define your trade contract'));
        marketDefPlaceHolders(this);
        this.appendDummyInput().appendField(`${translate('Run Once at Start')}:`);
        this.appendStatementInput('INITIALIZATION').setCheck(null);
        this.appendDummyInput().appendField(`${translate('Define Trade Options')}:`);
        this.appendStatementInput('SUBMARKET').setCheck(null);
        this.setColour('#2a3052');
        this.setTooltip(
            translate('Define your trade contract and start the trade, add initializations here. (Runs on start)')
        );
        this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
    },
    onchange: function onchange(ev) {
        setBlockTextColor(this);
        if (ev.group !== 'BackwardCompatibility') {
            replaceInitializationBlocks(this, ev);
            resetTradeFields(this, ev);
        }

        if (ev.type === Blockly.Events.BLOCK_CREATE && ev.group !== 'load' && ev.ids.includes(this.id)) {
            const marketField = this.getField('MARKET_LIST');
            marketField.setValue('');
            marketField.setValue(marketField.menuGenerator_[0][1]); // eslint-disable-line
        }

        decorateTrade(ev);
    },
};

Blockly.JavaScript.trade = block => {
    const account = $('.account-id')
        .first()
        .attr('value');
    if (!account) {
        throw Error('Please login');
    }
    const initialization = Blockly.JavaScript.statementToCode(block, 'INITIALIZATION');
    const tradeOptionsStatement = Blockly.JavaScript.statementToCode(block, 'SUBMARKET');
    const candleIntervalValue = block.getFieldValue('CANDLEINTERVAL_LIST');
    const contractTypeSelector = block.getFieldValue('TYPE_LIST');
    const oppositesName = block.getFieldValue('TRADETYPE_LIST').toUpperCase();
    const contractTypeList =
        contractTypeSelector === 'both'
            ? config.opposites[oppositesName].map(k => Object.keys(k)[0])
            : [contractTypeSelector];
    const timeMachineEnabled = block.getFieldValue('TIME_MACHINE_ENABLED') === 'TRUE';
    const shouldRestartOnError = block.getFieldValue('RESTARTONERROR') === 'TRUE';
    const code = `
    BinaryBotPrivateInit = function BinaryBotPrivateInit() {
      Bot.init('${account}', {
        symbol: '${block.getFieldValue('SYMBOL_LIST')}',
        contractTypes: ${JSON.stringify(contractTypeList)},
        candleInterval: '${candleIntervalValue}',
        shouldRestartOnError: ${shouldRestartOnError},
        timeMachineEnabled: ${timeMachineEnabled},
      });
      ${initialization.trim()}
    };
    BinaryBotPrivateStart = function BinaryBotPrivateStart() {
      ${tradeOptionsStatement.trim()}
    };
  `;
    return code;
};

export default () => {
    backwardCompatibility();
    tradeOptions();
};
