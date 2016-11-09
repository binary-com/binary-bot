// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#zr2375
import { bot } from '../../../../bot'

export default () => {
  const symbols = bot.symbol.activeSymbols.getSymbols()
  for (const k of Object.keys(symbols)) {
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
            if (parent) {
              const market = Blockly.mainWorkspace.newBlock('market')
              parent.nextConnection.connect(market.previousConnection)
              market.initSvg()
              market.render()
              const symbol = symbols[this.type]
              market.setFieldValue(symbol.market, 'MARKET_LIST')
              setTimeout(() => {
                market.setFieldValue(symbol.submarket, 'SUBMARKET_LIST')
                setTimeout(() => market.setFieldValue(symbol.symbol, 'SYMBOL_LIST'), 0)
              }, 0)
              if (this.getChildren().length) {
                const condition = this.getChildren()[0]
                console.log(condition.type)
                for (const input of condition.inputList) {
                  if (input.connection && input.connection.targetConnection) {
                    market.getInput(input.name).connection.connect(input.connection.targetConnection)
                  }
                }
              }
            }
            this.dispose()
            Blockly.Events.recordUndo = true
        }
      },
    }
    Blockly.JavaScript[k] = () => ''
  }
}
