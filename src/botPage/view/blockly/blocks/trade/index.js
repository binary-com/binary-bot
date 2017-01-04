import { translate } from '../../../../../common/i18n'
import { BlocklyError } from '../../../../../common/error'
import './barrierOffset'
import markets from './markets'
import market from './market'
import tradeTypes from './tradeTypes'
import { setBlockTextColor, findTopParentBlock, deleteBlockIfExists } from '../../utils'
import { defineContract } from '../images'

const backwardCompatibility = (block) => {
  setTimeout(() => {
    Blockly.Events.recordUndo = false
    Blockly.Events.setGroup('tradeConvert')
    const parent = block.getParent()
    if (parent) {
      const submarketConnection = block.getInput('SUBMARKET').connection
      const targetConnection = submarketConnection.targetConnection
      if (targetConnection) {
        parent.nextConnection.connect(targetConnection)
      }
      const ancestor = findTopParentBlock(parent)
      submarketConnection.connect((ancestor || parent).previousConnection)
    }
    block.setPreviousStatement(false)
    Blockly.Events.setGroup(false)
    Blockly.Events.recordUndo = true
  }, 0)
}

Blockly.Blocks.trade = {
  init: function init() {
    this.appendDummyInput()
      .appendField(new Blockly.FieldImage(defineContract, 15, 15, 'T'))
      .appendField(translate('(1) Define your trade contract'))
    this.appendStatementInput('SUBMARKET')
      .setCheck(null)
    this.setPreviousStatement(true, null)
    this.setColour('#2a3052')
    this.setTooltip(translate('Define your trade contract and start the trade, add initializations here. (Runs on start)'))
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki')
  },
  onchange: function onchange(ev) {
    if (ev.type === 'create') {
      setBlockTextColor(this)
      for (const blockId of ev.ids) {
        const block = Blockly.mainWorkspace.getBlockById(blockId)
        if (block) {
          if (block.type === 'trade') {
            if (!deleteBlockIfExists(block)) {
              backwardCompatibility(block)
            }
          }
        }
      }
    }
  },
}

Blockly.JavaScript.trade = (block) => {
  const account = $('.account-id').first().attr('value')
  if (!account) {
    return new BlocklyError(translate('Please login.')).emit()
  }
  const initialization = Blockly.JavaScript.statementToCode(block, 'SUBMARKET')
  // TODO: Assemble JavaScript into code variable.
  const code = `
  var getTradeOptions;
  try {
    ${initialization.trim()}
    trade = function trade(again){
      Blockly.mainWorkspace.highlightBlock('${block.id}')
      if (typeof getTradeOptions !== 'undefined') {
        Bot.start('${account.trim()}', getTradeOptions(),
        typeof before_purchase === 'undefined' ? function(){} : before_purchase,
        typeof during_purchase === 'undefined' ? function(){} : during_purchase,
        typeof after_purchase === 'undefined' ? function(){} : after_purchase,
        again,
        tick_analysis_list, limitations);
      }
    };
  } catch (e) {
    if (e.name !== 'BlocklyError') {
      Bot.notifyError(e);
      throw e;
    }
  }
  `
  return code
}

export default () => {
  markets()
  market()
  tradeTypes()
}
