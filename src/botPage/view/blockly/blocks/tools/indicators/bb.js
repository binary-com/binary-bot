// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#3qghes
import { translator } from '../../../../../../common/translator'
import config from '../../../../../../common/const'

Blockly.Blocks.bb = {
  init: function init() {
    this.appendDummyInput()
      .appendField(translator.translateText('Bollinger Bands'))
      .appendField(new Blockly.FieldDropdown(config.bbResult), 'BBRESULT_LIST')
    this.appendValueInput('INPUT')
      .setCheck('Array')
      .appendField(translator.translateText('Input List'))
    this.appendValueInput('PERIOD')
      .setCheck('Number')
      .appendField(translator.translateText('Period'))
    this.appendValueInput('UPMULTIPLIER')
      .setCheck('Number')
      .appendField(translator.translateText('Std. Dev. Up Multiplier'))
    this.appendValueInput('DOWNMULTIPLIER')
      .setCheck('Number')
      .appendField(translator.translateText('Std. Dev. Down Multiplier'))
    this.setOutput(true, 'Number')
    this.setColour('#dedede')
    this.setTooltip(translator.translateText('Calculates Bollinger Bands (BB) from a list with a period'))
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki')
  },
}

Blockly.JavaScript.bb = (block) => {
  const bbResult = block.getFieldValue('BBRESULT_LIST')
  const input = Blockly.JavaScript.valueToCode(block,
      'INPUT', Blockly.JavaScript.ORDER_ATOMIC) || '[]'
  const period = Blockly.JavaScript.valueToCode(block,
      'PERIOD', Blockly.JavaScript.ORDER_ATOMIC) || '0'
  const stdDevUp = Blockly.JavaScript.valueToCode(block,
      'UPMULTIPLIER', Blockly.JavaScript.ORDER_ATOMIC) || '1'
  const stdDevDown = Blockly.JavaScript.valueToCode(block,
      'DOWNMULTIPLIER', Blockly.JavaScript.ORDER_ATOMIC) || '1'
  const code = `(Bot.math.indicators.bollingerBands(Bot.expect.notEmptyArray(${
  input}), { periods: Bot.expect.indicatorPeriod(${input}, ${period
  }), stdDevUp: Bot.expect.number('${translator.translateText('Std. Dev. Up Multiplier')
  }', ${stdDevUp}), stdDevDown: Bot.expect.number('${translator.translateText('Std. Dev. Down Multiplier')
  }', ${stdDevDown}) })[${bbResult}])`
  return [code, Blockly.JavaScript.ORDER_NONE]
}
