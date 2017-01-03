// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#wupwb4
import { translate } from '../../../../../../common/i18n'
import { insideMainBlocks } from '../../../utils'
import { timeScope } from '../../../relationChecker'

Blockly.Blocks.timeout = {
  init: function init() {
    this.appendStatementInput('TIMEOUTSTACK')
      .setCheck(null)
    this.appendValueInput('SECONDS')
      .setCheck(null)
      .appendField(translate('Run After'))
    this.appendDummyInput()
      .appendField(translate('Second(s)'))
    this.setInputsInline(true)
    this.setPreviousStatement(true, null)
    this.setColour('#fef1cf')
    this.setTooltip(translate('Run the blocks inside after n seconds'))
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki')
  },
  onchange: function onchange(ev) {
    timeScope(this, ev, translate('Run After n Seconds'))
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
