import config from '../../../../../common/const'
import { symbolApi } from '../../../shared'
import { updateInputList } from '../../utils'

export default () => {
  const symbols = symbolApi.activeSymbols.getSymbols()
  Object.keys(symbols).forEach(k => {
    Blockly.Blocks[k] = {
      init: function init() {
        this.appendStatementInput('CONDITION')
          .setCheck('Condition')
        this.setPreviousStatement(true, null)
      },
      onchange: function onchange(ev) {
        if (ev.type === Blockly.Events.CREATE
          && ev.ids.indexOf(this.id) >= 0) {
          const parent = this.parentBlock_
          Blockly.Events.recordUndo = false
          Blockly.Events.setGroup('tradeTypeConvert')
          const market = Blockly.mainWorkspace.newBlock('market')
          market.initSvg()
          market.render()
          if (parent) {
            if (parent.nextConnection) {
              parent.nextConnection.connect(market.previousConnection)
            } else {
              const statementConnection = parent.getInput('SUBMARKET').connection
              statementConnection.connect(market.previousConnection)
            }
          }
          const symbol = symbols[this.type]
          market.setFieldValue(symbol.market, 'MARKET_LIST')
          market.setFieldValue(symbol.submarket, 'SUBMARKET_LIST')
          market.setFieldValue(symbol.symbol, 'SYMBOL_LIST')
          if (this.getChildren().length) {
            const condition = this.getChildren()[0]
            const tradeType = condition.type
            const categories = config.conditionsCategory
            Object.keys(categories).forEach(cat => {
              if (categories[cat].indexOf(tradeType) >= 0) {
                market.setFieldValue(cat, 'TRADETYPECAT_LIST')
                market.setFieldValue(tradeType, 'TRADETYPE_LIST')
                updateInputList(market)
              }
            })
            condition.inputList.forEach(input => {
              if (input.connection && input.connection.targetConnection) {
                market.getInput(input.name).connection.connect(input.connection.targetConnection)
              }
            })
          }
          this.dispose()
          Blockly.Events.setGroup(false)
          Blockly.Events.recordUndo = true
        }
      },
    }
    Blockly.JavaScript[k] = () => ''
  })
}
