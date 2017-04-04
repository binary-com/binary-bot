import { findTopParentBlock } from '../../utils'
import { setInputList, updateInputList, marketDefPlaceHolders,
  moveMarketDefsToMainBlock } from './tools'

export default () => {
  Blockly.Blocks.market = {
    init: function init() {
      marketDefPlaceHolders(this)
      setInputList(this)
      this.setPreviousStatement(true, 'TradeOptions')
      this.setColour('#f2f2f2')
    },
    onchange: function onchange(ev) {
      if (ev.type === Blockly.Events.CREATE && ev.ids.indexOf(this.id) >= 0) {
        const recordUndo = Blockly.Events.recordUndo
        const dispose = () => {
          this.dispose()
          Blockly.Events.setGroup(false)
          Blockly.Events.recordUndo = recordUndo
        }

        Blockly.Events.recordUndo = false
        Blockly.Events.setGroup('BackwardCompatibility')

        const tradeOptions = Blockly.mainWorkspace.newBlock('tradeOptions')
        tradeOptions.initSvg()
        tradeOptions.render()
        const trade = findTopParentBlock(this)
        if (trade.type !== 'trade') {
          dispose()
          return
        }
        const parent = this.getParent()
        if (parent) {
          const parentIsStatement = !parent.nextConnection
          if (parentIsStatement) {
            trade.getInput('SUBMARKET').connection.connect(tradeOptions.previousConnection)
          } else {
            trade.getInput('INITIALIZATION').connection.connect(trade.getInput('SUBMARKET').connection.targetConnection)
            trade.getInput('SUBMARKET').connection.connect(tradeOptions.previousConnection)
          }
        }
        updateInputList(tradeOptions)
        moveMarketDefsToMainBlock(this)
        dispose()
      }
    },
  }
  Blockly.JavaScript.market = () => ''
}
