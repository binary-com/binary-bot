// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#db8gmg
import { translator } from '../../../../../common/translator'
import config from '../../../../../common/const'
import { BlocklyError } from '../../../../../common/error'
import { marketDropdown, tradeTypeDropdown, restartOnError } from './components'
import { updatePurchaseChoices, updateInputList, setInputList } from '../../utils'
import { insideTrade } from '../../relationChecker'

const bcBarrierOffset = (market, inputName) => {
  const barrier = market.getInput(inputName)
  if (barrier) {
    const barrierOffset = barrier.connection.targetBlock()
    if (barrierOffset && barrierOffset.type === 'barrier_offset') {
      market.setFieldValue(
        barrierOffset.getFieldValue('BARRIEROFFSETTYPE_LIST')
        , `${inputName}TYPE_LIST`)
      const number = barrierOffset.getInput('BARRIEROFFSET_IN').connection.targetBlock()
      if (number) {
        barrier.connection.connect(number.outputConnection)
      }
      barrierOffset.dispose()
    }
  }
}

export default () => {
  Blockly.Blocks.market = {
    init: function init() {
      marketDropdown(this)
      tradeTypeDropdown(this)
      setInputList(this)
      restartOnError(this)
      this.setPreviousStatement(true, 'Market')
      this.setColour('#f2f2f2')
    },
    onchange: function onchange(ev) {
      insideTrade(this, ev, translator.translateText('Market'))
      if (ev.type === Blockly.Events.CREATE) {
        updateInputList(this)
      }
      if (ev.group === 'tradeTypeConvert') {
        return
      }
      if (ev.type === Blockly.Events.MOVE) {
        bcBarrierOffset(this, 'BARRIEROFFSET')
        bcBarrierOffset(this, 'SECONDBARRIEROFFSET')
      }
      if (ev.blockId === this.id && ev.element === 'field') {
        if (ev.name === 'MARKET_LIST') {
          this.setFieldValue('', 'SUBMARKET_LIST')
        }
        if (ev.name === 'SUBMARKET_LIST') {
          this.setFieldValue('', 'SYMBOL_LIST')
        }
        if (ev.name === 'SYMBOL_LIST') {
          this.setFieldValue('', 'TRADETYPECAT_LIST')
        }
        if (ev.name === 'TRADETYPECAT_LIST') {
          this.setFieldValue('', 'TRADETYPE_LIST')
        }
        if (ev.name === 'TRADETYPE_LIST') {
          if (ev.newValue) {
            updateInputList(this)
            this.setFieldValue('both', 'TYPE_LIST')
            this.setFieldValue(config.durationTypes[
              ev.newValue.toUpperCase()][0][1], 'DURATIONTYPE_LIST')
          } else {
            this.setFieldValue('', 'TYPE_LIST')
            this.setFieldValue('', 'DURATIONTYPE_LIST')
          }
        }
      }
      const oppositesName = this.getFieldValue('TRADETYPE_LIST').toUpperCase()
      const contractType = this.getFieldValue('TYPE_LIST')
      if (oppositesName && contractType) {
        updatePurchaseChoices(contractType, oppositesName)
      }
    },
  }
  Blockly.JavaScript.market = (block) => {
    const durationValue = Blockly.JavaScript.valueToCode(block,
      'DURATION', Blockly.JavaScript.ORDER_ATOMIC)
    const candleIntervalValue = block.getFieldValue('CANDLEINTERVAL_LIST')
    const contractTypeSelector = block.getFieldValue('TYPE_LIST')
    const durationType = block.getFieldValue('DURATIONTYPE_LIST')
    const payouttype = block.getFieldValue('PAYOUTTYPE_LIST')
    const currency = block.getFieldValue('CURRENCY_LIST')
    const amount = Blockly.JavaScript.valueToCode(block,
      'AMOUNT', Blockly.JavaScript.ORDER_ATOMIC)
    const oppositesName = block.getFieldValue('TRADETYPE_LIST').toUpperCase()
    const shouldRestartOnError = block.getFieldValue('RESTARTONERROR') === 'TRUE'
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
      const barrierOffsetType = block.getFieldValue('BARRIEROFFSETTYPE_LIST')
      barrierOffsetValue = Blockly.JavaScript.valueToCode(block,
        'BARRIEROFFSET', Blockly.JavaScript.ORDER_ATOMIC)
      if (barrierOffsetValue === '') {
        return new BlocklyError(translator.translateText('All trade types are required')).emit()
      }
      barrierOffsetValue = `${barrierOffsetType}${barrierOffsetValue}`
    }
    if (config.hasSecondBarrierOffset.indexOf(oppositesName) > -1) {
      const barrierOffsetType = block.getFieldValue('SECONDBARRIEROFFSETTYPE_LIST')
      secondBarrierOffsetValue = Blockly.JavaScript.valueToCode(block,
        'SECONDBARRIEROFFSET', Blockly.JavaScript.ORDER_ATOMIC)
      if (secondBarrierOffsetValue === '') {
        return new BlocklyError(translator.translateText('All trade types are required')).emit()
      }
      secondBarrierOffsetValue = `${barrierOffsetType}${secondBarrierOffsetValue}`
    }
    if (oppositesName === '' || durationValue === '' ||
      payouttype === '' || currency === '' || amount === '') {
      return new BlocklyError(translator.translateText('All trade types are required')).emit()
    }
    const contractTypeList = contractTypeSelector === 'both' ?
      config.opposites[oppositesName].map((k) => Object.keys(k)[0]) :
      [contractTypeSelector]
    const code = `
      getTradeOptions = function getTradeOptions() {
        var tradeOptions = {}
        tradeOptions = {
          contractTypes: '${JSON.stringify(contractTypeList)}',
          candleInterval: '${candleIntervalValue}',
          duration: ${durationValue},
          duration_unit: '${durationType}',
          basis: '${payouttype}',
          currency: '${currency}',
          amount: ${amount},
          restartOnError: ${shouldRestartOnError},
          ${((config.hasPrediction.indexOf(oppositesName) > -1 && predictionValue !== '')
      ? `prediction: ${predictionValue},` : '')}
          ${((config.hasSecondBarrierOffset.indexOf(oppositesName) > -1
    || (config.hasBarrierOffset.indexOf(oppositesName) > -1 && barrierOffsetValue !== ''))
      ? `barrierOffset: ${barrierOffsetValue},` : '')}
          ${((config.hasSecondBarrierOffset.indexOf(oppositesName) > -1 && secondBarrierOffsetValue !== '')
      ? `secondBarrierOffset: ${secondBarrierOffsetValue},` : '')}
        }
        tradeOptions.symbol = '${block.getFieldValue('SYMBOL_LIST')}'
        return tradeOptions
      }
      `
    return code
  }
}
