import { observer as globalObserver } from 'binary-common-utils/lib/observer';
import { translate } from '../../../../../common/i18n';
import config from '../../../../common/const';
import { setBlockTextColor, findTopParentBlock, deleteBlockIfExists } from '../../utils';
import { defineContract } from '../images';
import { updatePurchaseChoices } from '../shared';
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

const decorateTrade = (trade, ev) => {
    if ([Blockly.Events.CREATE, Blockly.Events.CHANGE].includes(ev.type)) {
        setBlockTextColor(trade);
        if (!trade.isInFlyout) {
            const symbol = trade.getFieldValue('SYMBOL_LIST');
            const submarket = trade.getInput('SUBMARKET').connection.targetConnection;
            // eslint-disable-next-line no-underscore-dangle
            const needsMutation = submarket && submarket.sourceBlock_.type !== 'tradeOptions';

            if (symbol && !needsMutation) {
                globalObserver.emit('bot.init', symbol);
            }
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

Blockly.Blocks.trade = {
    init: function init() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage(defineContract, 15, 15, 'T'))
            .appendField(translate('(1) Define your trade contract'));
        marketDefPlaceHolders(this);
        this.appendStatementInput('INITIALIZATION').setCheck(null).appendField(`${translate('Run Once at Start')}:`);
        this.appendStatementInput('SUBMARKET').setCheck(null).appendField(`${translate('Define Trade Options')}:`);
        this.setPreviousStatement(true, null);
        this.setColour('#2a3052');
        this.setTooltip(
            translate('Define your trade contract and start the trade, add initializations here. (Runs on start)')
        );
        this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
    },
    onchange: function onchange(ev) {
        decorateTrade(this, ev);
        if (ev.group === 'BackwardCompatibility') {
            return;
        }
        replaceInitializationBlocks(this, ev);
        if (ev.blockId === this.id) {
            if (ev.element === 'field') {
                if (ev.name === 'MARKET_LIST') {
                    this.setFieldValue('', 'SUBMARKET_LIST');
                }
                if (ev.name === 'SUBMARKET_LIST') {
                    this.setFieldValue('', 'SYMBOL_LIST');
                }
                if (ev.name === 'SYMBOL_LIST') {
                    this.setFieldValue('', 'TRADETYPECAT_LIST');
                }
                if (ev.name === 'TRADETYPECAT_LIST') {
                    this.setFieldValue('', 'TRADETYPE_LIST');
                }
                if (ev.name === 'TRADETYPE_LIST') {
                    if (ev.newValue) {
                        this.setFieldValue('both', 'TYPE_LIST');
                    } else {
                        this.setFieldValue('', 'TYPE_LIST');
                    }
                }
            }
        }
    },
};

Blockly.JavaScript.trade = block => {
    const account = $('.account-id').first().attr('value');
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
    const shouldRestartOnError = block.getFieldValue('RESTARTONERROR') === 'TRUE';
    const code = `
    init = function init() {
      Bot.init('${account}', {
        symbol: '${block.getFieldValue('SYMBOL_LIST')}',
        contractTypes: ${JSON.stringify(contractTypeList)},
        candleInterval: '${candleIntervalValue}',
        shouldRestartOnError: ${shouldRestartOnError},
      });
      ${initialization.trim()}
    };
    start = function start() {
      ${tradeOptionsStatement.trim()}
    };
  `;
    return code;
};

export default () => {
    backwardCompatibility();
    tradeOptions();
};
