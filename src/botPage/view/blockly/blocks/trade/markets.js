import { observer as globalObserver } from 'binary-common-utils/lib/observer'
import config from '../../../../common/const'
import { symbolApi } from '../../../shared'
import { findTopParentBlock } from '../../utils'
import { updateInputList } from './tools'

// Backward Compatibility Separate market blocks into one
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
          const recordUndo = Blockly.Events.recordUndo
          Blockly.Events.recordUndo = false
          Blockly.Events.setGroup('BackwardCompatibility')
          const market = Blockly.mainWorkspace.newBlock('market')
          market.initSvg()
          market.render()
          market.removeInput('MARKETDEFINITION')
          market.removeInput('TRADETYPEDEFINITION')
          market.removeInput('CONTRACT_TYPE')
          market.removeInput('CANDLE_INTERVAL')
          const symbol = symbols[this.type]
          const initializations = this.parentBlock_
          if (initializations) {
            if (initializations.nextConnection) {
              initializations.nextConnection.connect(market.previousConnection)
            } else {
              const statementConnection = initializations.getInput('SUBMARKET').connection
              statementConnection.connect(market.previousConnection)
            }
          }
          const parent = findTopParentBlock(market)
          if (parent) {
            parent.setFieldValue(symbol.market, 'MARKET_LIST')
            parent.setFieldValue(symbol.submarket, 'SUBMARKET_LIST')
            parent.setFieldValue(symbol.symbol, 'SYMBOL_LIST')
            globalObserver.emit('bot.init', symbol.symbol)
            if (this.getChildren().length) {
              const condition = this.getChildren()[0]
              const tradeType = condition.type
              const categories = config.conditionsCategory
              Object.keys(categories).forEach(cat => {
                if (categories[cat].indexOf(tradeType) >= 0) {
                  parent.setFieldValue(cat, 'TRADETYPECAT_LIST')
                  parent.setFieldValue(tradeType, 'TRADETYPE_LIST')
                }
              })
            }
          }
          updateInputList(market)
          if (this.getChildren().length) {
            const condition = this.getChildren()[0]
            const fieldList = ['DURATIONTYPE_LIST', 'CURRENCY_LIST',
              'BARRIEROFFSETTYPE_LIST', 'SECONDBARRIEROFFSETTYPE_LIST']
            fieldList.forEach(field => {
              const value = condition.getFieldValue(field)
              if (value) {
                market.setFieldValue(value, field)
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
          Blockly.Events.recordUndo = recordUndo
        }
      },
    }
    Blockly.JavaScript[k] = () => ''
  })
}
