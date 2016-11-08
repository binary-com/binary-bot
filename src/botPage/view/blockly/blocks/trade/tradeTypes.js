// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#orvwcx

import config from '../../../../../common/const'
import { condition } from '../../relationChecker'
import { translator } from '../../../../../common/translator'
import {
  duration, payout, prediction,
  barrierOffset, secondBarrierOffset, candleInterval,
  contractTypes,
} from './components'
import { BlocklyError } from '../../../../../common/error'

export default () => {
  for (const oppositesName of Object.keys(config.opposites)) {
    Blockly.Blocks[oppositesName.toLowerCase()] = {
      init: function init() {
        const optionNames = []
        for (const options of config.opposites[oppositesName]) {
          const optionName = options[Object.keys(options)[0]]
          optionNames.push(optionName)
        }
        contractTypes(this, config.opposites[oppositesName])
        candleInterval(this)
        duration(this, oppositesName)
        payout(this, oppositesName)
        if (config.hasPrediction.indexOf(oppositesName) > -1) {
          prediction(this, oppositesName)
        } else {
          this.removeInput('PREDICTION')
        }
        if (config.hasBarrierOffset.indexOf(oppositesName) > -1) {
          barrierOffset(this)
        } else {
          this.removeInput('BARRIEROFFSET')
        }
        if (config.hasSecondBarrierOffset.indexOf(oppositesName) > -1) {
          barrierOffset(this)
          secondBarrierOffset(this)
        } else {
          this.removeInput('SECONDBARRIEROFFSET')
        }
        this.setInputsInline(false)
        this.setPreviousStatement(true, 'Condition')
        this.setColour('#f2f2f2')
        this.setTooltip(`${translator.translateText('Provides the trade types:')
        } ${optionNames[0]}/${optionNames[1]}`)
        this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki')
      },
      onchange: function onchange(ev) {
        condition(this, ev)
      },
    }
    Blockly.JavaScript[oppositesName.toLowerCase()] = function tradeType(block) { // eslint-disable-line no-loop-func, max-len
      const durationValue = Blockly.JavaScript.valueToCode(block,
        'DURATION', Blockly.JavaScript.ORDER_ATOMIC)
      const candleIntervalValue = block.getFieldValue('CANDLEINTERVAL_LIST')
      const contractTypeSelector = block.getFieldValue('TYPE_LIST')
      const durationType = block.getFieldValue('DURATIONTYPE_LIST')
      const payouttype = block.getFieldValue('PAYOUTTYPE_LIST')
      const currency = block.getFieldValue('CURRENCY_LIST')
      const amount = Blockly.JavaScript.valueToCode(block,
        'AMOUNT', Blockly.JavaScript.ORDER_ATOMIC)
      let predictionValue
      let barrierOffsetValue
      let secondBarrierOffsetValue
      if (config.hasPrediction.indexOf(oppositesName) > -1) {
        predictionValue = Blockly.JavaScript.valueToCode(block,
          'PREDICTION', Blockly.JavaScript.ORDER_ATOMIC)
        if (predictionValue === '') {
          return new BlocklyError(translator.translateText('All trade types are required')).emit()
        }
      }
      if (config.hasBarrierOffset.indexOf(oppositesName) > -1 ||
        config.hasSecondBarrierOffset.indexOf(oppositesName) > -1) {
        barrierOffsetValue = Blockly.JavaScript.valueToCode(block,
          'BARRIEROFFSET', Blockly.JavaScript.ORDER_ATOMIC)
        if (barrierOffsetValue === '') {
          return new BlocklyError(translator.translateText('All trade types are required')).emit()
        }
      }
      if (config.hasSecondBarrierOffset.indexOf(oppositesName) > -1) {
        secondBarrierOffsetValue = Blockly.JavaScript.valueToCode(block,
          'SECONDBARRIEROFFSET', Blockly.JavaScript.ORDER_ATOMIC)
        if (secondBarrierOffsetValue === '') {
          return new BlocklyError(translator.translateText('All trade types are required')).emit()
        }
      }
      if (oppositesName === '' || durationValue === '' ||
        payouttype === '' || currency === '' || amount === '') {
        return new BlocklyError(translator.translateText('All trade types are required')).emit()
      }
      const contractTypeList = contractTypeSelector === 'both' ?
        config.opposites[oppositesName].map((k) => Object.keys(k)[0]) :
        [contractTypeSelector]
      const code = `{
      contractTypes: '${JSON.stringify(contractTypeList)}',
      candleInterval: '${candleIntervalValue}',
      duration: ${durationValue},
      duration_unit: '${durationType}',
      basis: '${payouttype}',
      currency: '${currency}',
      amount: ${amount},
      ${((config.hasPrediction.indexOf(oppositesName) > -1 && predictionValue !== '')
        ? `prediction: ${predictionValue},` : '')}
      ${((config.hasSecondBarrierOffset.indexOf(oppositesName) > -1
        || (config.hasBarrierOffset.indexOf(oppositesName) > -1 && barrierOffsetValue !== ''))
        ? `barrierOffset: ${barrierOffsetValue},` : '')}
      ${((config.hasSecondBarrierOffset.indexOf(oppositesName) > -1 && secondBarrierOffsetValue !== '')
        ? `secondBarrierOffset: ${secondBarrierOffsetValue},` : '')}
      }`
      return code
    }
  }
}
