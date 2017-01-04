// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#3qghes
import { translate } from '../../../../../../common/i18n'
import config from '../../../../../../common/const'

Blockly.Blocks.bba = {
  init: function init() {
    this.appendDummyInput()
      .appendField(translate('Bollinger Bands Array'))
      .appendField(new Blockly.FieldDropdown(config.bbResult), 'BBRESULT_LIST')
    this.appendValueInput('INPUT')
      .setCheck('Array')
      .appendField(translate('Input List'))
    this.appendValueInput('PERIOD')
      .setCheck('Number')
      .appendField(translate('Period'))
    this.appendValueInput('UPMULTIPLIER')
      .setCheck('Number')
      .appendField(translate('Std. Dev. Up Multiplier'))
    this.appendValueInput('DOWNMULTIPLIER')
      .setCheck('Number')
      .appendField(translate('Std. Dev. Down Multiplier'))
    this.setOutput(true, 'Array')
    this.setColour('#dedede')
    this.setTooltip(translate('Calculates Bollinger Bands (BB) list from a list with a period'))
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki')
  },
}

Blockly.JavaScript.bba = (block) => {
  const bbResult = block.getFieldValue('BBRESULT_LIST')
  const input = Blockly.JavaScript.valueToCode(block,
      'INPUT', Blockly.JavaScript.ORDER_ATOMIC) || '[]'
  const period = Blockly.JavaScript.valueToCode(block,
      'PERIOD', Blockly.JavaScript.ORDER_ATOMIC) || '0'
  const stdDevUp = Blockly.JavaScript.valueToCode(block,
      'UPMULTIPLIER', Blockly.JavaScript.ORDER_ATOMIC) || '1'
  const stdDevDown = Blockly.JavaScript.valueToCode(block,
      'DOWNMULTIPLIER', Blockly.JavaScript.ORDER_ATOMIC) || '1'
  const code = `(Bot.math.indicators.bollingerBandsArray(Bot.expect.notEmptyArray(${
  input}), { periods: Bot.expect.indicatorPeriod(${input}, ${period
  }), stdDevUp: Bot.expect.number('${translate('Std. Dev. Up Multiplier')
  }', ${stdDevUp}), stdDevDown: Bot.expect.number('${translate('Std. Dev. Down Multiplier')
  }', ${stdDevDown}) }).map(function(el){return el[${bbResult}]}))`
  return [code, Blockly.JavaScript.ORDER_NONE]
}
