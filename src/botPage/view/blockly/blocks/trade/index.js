import { observer } from 'binary-common-utils/lib/observer'
import { translator } from '../../../../../common/translator'
import { BlocklyError } from '../../../../../common/error'
import './barrierOffset'
import markets from './markets'
import market from './market'
import config from '../../../../../common/const'
import tradeTypes from './tradeTypes'
import { setBlockTextColor, findTopParentBlock, deleteBlockIfExists } from '../../utils'

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
      .appendField(translator.translateText('(1) Define your contract here'))
    this.appendStatementInput('SUBMARKET')
      .setCheck(null)
    this.setPreviousStatement(true, null)
    this.setColour('#2a3052')
    this.setTooltip(translator.translateText('Use this block to choose markets and trade types.')); // eslint-disable-line max-len
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki')
  },
  onchange: function onchange(ev) {
    if (ev.type === 'create') {
      this.select()
      setBlockTextColor(this)
      for (const blockId of ev.ids) {
        const block = Blockly.mainWorkspace.getBlockById(blockId)
        if (block) {
          if (block.type === 'trade') {
            if (!deleteBlockIfExists(block)) {
              backwardCompatibility(block)
            }
          }
          if (block.type === 'market') {
            observer.emit('tour:market_created')
          }
          if (config.conditions.indexOf(block.type) >= 0) {
            observer.emit('tour:condition_created')
          }
          if (block.type === 'math_number') {
            observer.emit('tour:number')
          }
          if (block.type === 'purchase') {
            observer.emit('tour:purchase_created')
          }
          if (block.type === 'trade_again') {
            observer.emit('tour:trade_again_created')
          }
        }
      }
    }
  },
}

Blockly.JavaScript.trade = (block) => {
  const account = $('.account-id').first().attr('value')
  if (!account) {
    return new BlocklyError(translator.translateText('Please login.')).emit()
  }
  const initialization = Blockly.JavaScript.statementToCode(block, 'SUBMARKET')
  // TODO: Assemble JavaScript into code variable.
  const code = `
  var getTradeOptions;
  try {
    ${initialization.trim()}
    trade = function trade(again){
      var block = Blockly.mainWorkspace.getBlockById('${block.id}')
      if (block) {
        block.select()
      }
      if (typeof getTradeOptions !== 'undefined') {
        Bot.start('${account.trim()}', getTradeOptions(),
        typeof before_purchase === 'undefined' ? function(){} : before_purchase,
        typeof during_purchase === 'undefined' ? function(){} : during_purchase,
        typeof after_purchase === 'undefined' ? function(){} : after_purchase,
        again,
        tick_analysis_list);
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
