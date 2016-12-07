// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#qx2zox
import { translator } from '../../../../../common/translator'
import './sell_at_market'
import './check_sell'
import './sell_price'
import { configMainBlock, setBlockTextColor } from '../../utils'

Blockly.Blocks.during_purchase = {
  init: function init() {
    this.appendDummyInput()
      .appendField(translator.translateText('(3) things to do when trade is in progress'))
    this.appendStatementInput('DURING_PURCHASE_STACK')
      .setCheck('SellAtMarket')
    this.setColour('#2a3052')
    this.setTooltip(translator.translateText('Sell at market before a trade is finished')); // eslint-disable-line max-len
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki')
  },
  onchange: function onchange(ev) {
    if (ev.type === 'create') {
      setBlockTextColor(this)
    }
    configMainBlock(ev, 'during_purchase')
  },
}
Blockly.JavaScript.during_purchase = (block) => {
  const stack = Blockly.JavaScript.statementToCode(block, 'DURING_PURCHASE_STACK')
  const code = `during_purchase = function during_purchase(){
    try {
      Blockly.mainWorkspace.getBlockById('${block.id}').select()
      ${stack}
    } catch (e) { 
      if (e.name !== 'BlocklyError') {
        Bot.notifyError(e);
        throw e;
      }
    }
  };
  `
  return code
}
