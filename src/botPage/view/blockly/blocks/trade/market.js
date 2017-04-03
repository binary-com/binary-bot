// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#db8gmg
import { translate } from '../../../../../common/i18n'
import config from '../../../../common/const'
import { insideTrade } from '../../relationChecker'
import { findTopParentBlock } from '../../utils'
import { setInputList, updateInputList, marketDefPlaceHolders,
  moveMarketDefsToMainBlock } from './tools'

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
      marketDefPlaceHolders(this)
      setInputList(this)
      this.setPreviousStatement(true, 'TradeOptions')
      this.setColour('#f2f2f2')
    },
    onchange: function onchange(ev) {
      insideTrade(this, ev, translate('Trade Options'))
      if (ev.group === 'BackwardCompatibility') {
        return
      }
      moveMarketDefsToMainBlock(this)
      if (([Blockly.Events.CREATE, Blockly.Events.CHANGE]).includes(ev.type)) {
        updateInputList(this)
      }
      if (ev.type === Blockly.Events.MOVE) {
        bcBarrierOffset(this, 'BARRIEROFFSET')
        bcBarrierOffset(this, 'SECONDBARRIEROFFSET')
      }
      if (ev.name === 'TRADETYPE_LIST') {
        if (ev.newValue) {
          updateInputList(this)
          this.setFieldValue(config.durationTypes[
            ev.newValue.toUpperCase()][0][1], 'DURATIONTYPE_LIST')
        } else {
          this.setFieldValue('', 'DURATIONTYPE_LIST')
        }
      }
    },
  }
  Blockly.JavaScript.market = (block) => {
    const durationValue = Blockly.JavaScript.valueToCode(block,
      'DURATION', Blockly.JavaScript.ORDER_ATOMIC)
    const durationType = block.getFieldValue('DURATIONTYPE_LIST')
    const currency = block.getFieldValue('CURRENCY_LIST')
    const amount = Blockly.JavaScript.valueToCode(block,
      'AMOUNT', Blockly.JavaScript.ORDER_ATOMIC)
    const tradeDefBlock = findTopParentBlock(block)
    if (!tradeDefBlock) {
      return ''
    }
    const oppositesName = tradeDefBlock.getFieldValue('TRADETYPE_LIST').toUpperCase()
    let predictionValue = 'undefined'
    let barrierOffsetValue = 'undefined'
    let secondBarrierOffsetValue = 'undefined'
    if (config.hasPrediction.indexOf(oppositesName) > -1) {
      predictionValue = Blockly.JavaScript.valueToCode(block,
        'PREDICTION', Blockly.JavaScript.ORDER_ATOMIC)
    }
    if (config.hasBarrierOffset.indexOf(oppositesName) > -1 ||
      config.hasSecondBarrierOffset.indexOf(oppositesName) > -1) {
      const barrierOffsetType = block.getFieldValue('BARRIEROFFSETTYPE_LIST')
      barrierOffsetValue = Blockly.JavaScript.valueToCode(block,
        'BARRIEROFFSET', Blockly.JavaScript.ORDER_ATOMIC)
      barrierOffsetValue = `${barrierOffsetType}${barrierOffsetValue}`
    }
    if (config.hasSecondBarrierOffset.indexOf(oppositesName) > -1) {
      const barrierOffsetType = block.getFieldValue('SECONDBARRIEROFFSETTYPE_LIST')
      secondBarrierOffsetValue = Blockly.JavaScript.valueToCode(block,
        'SECONDBARRIEROFFSET', Blockly.JavaScript.ORDER_ATOMIC)
      secondBarrierOffsetValue = `${barrierOffsetType}${secondBarrierOffsetValue}`
    }
    const code = `
      start = function start() {
        Bot.start({
          limitations: limitations,
          duration: ${durationValue},
          duration_unit: '${durationType}',
          currency: '${currency}',
          amount: ${amount},
          prediction: ${predictionValue},
          barrierOffset: ${barrierOffsetValue},
          secondBarrierOffset: ${secondBarrierOffsetValue},
        });
      }
      `
    return code
  }
}
