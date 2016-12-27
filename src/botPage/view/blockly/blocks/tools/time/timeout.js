// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#wupwb4
import { translator } from '../../../../../../common/translator'
import { insideMainBlocks } from '../../../utils'
import { timeScope } from '../../../relationChecker'

Blockly.Blocks.timeout = {
  init: function init() {
    this.appendStatementInput('TIMEOUTSTACK')
      .setCheck(null)
    this.appendValueInput('SECONDS')
      .setCheck(null)
      .appendField(translator.translateText('Run After'))
    this.appendDummyInput()
      .appendField(translator.translateText('Second(s)'))
    this.setInputsInline(true)
    this.setPreviousStatement(true, null)
    this.setColour('#fef1cf')
    this.setTooltip(translator.translateText('Run the blocks inside after n seconds'))
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki')
  },
  onchange: function onchange(ev) {
    timeScope(this, ev, translator.translateText('Run After n Seconds'))
  },
}

Blockly.JavaScript.timeout = (block) => {
  const stack = Blockly.JavaScript.statementToCode(block, 'TIMEOUTSTACK')
  const seconds = Blockly.JavaScript.valueToCode(block, 'SECONDS', Blockly.JavaScript.ORDER_ATOMIC)
  return `
    Bot.setTimeout(function (){
      ${stack}
    }.bind(this), (${seconds ? `(${seconds}) *` : ''} 1000));
    ${insideMainBlocks(block) ? 'return;' : ''}
  `
}
