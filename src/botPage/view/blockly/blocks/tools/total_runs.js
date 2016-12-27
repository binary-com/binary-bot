// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#3bwqd4
import { translator } from '../../../../../common/translator'

Blockly.Blocks.total_runs = {
  init: function init() {
    this.appendDummyInput()
      .appendField(translator.translateText('No. Of Runs'))
    this.setOutput(true, 'Number')
    this.setColour('#dedede')
    this.setTooltip(translator.translateText('Returns the number of runs since the beginning'))
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki')
  },
}
Blockly.JavaScript.total_runs = () => ['Bot.getTotalRuns()', Blockly.JavaScript.ORDER_ATOMIC]
