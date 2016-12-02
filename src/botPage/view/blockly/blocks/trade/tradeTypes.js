import config from '../../../../../common/const'
import { duration, payout, prediction, barrierOffset, secondBarrierOffset, candleInterval, contractTypes,
} from './components'

export default () => {
  Blockly.Blocks.allFields = {
    init: function init() {
      contractTypes(this)
      candleInterval(this)
      duration(this)
      payout(this)
      prediction(this)
      barrierOffset(this)
      secondBarrierOffset(this)
      this.setInputsInline(false)
      this.setPreviousStatement(true, 'Condition')
    },
  }
  for (const oppositesName of Object.keys(config.opposites)) {
    Blockly.Blocks[oppositesName.toLowerCase()] = {
      init: function init() {
        const optionNames = []
        for (const options of config.opposites[oppositesName]) {
          const optionName = options[Object.keys(options)[0]]
          optionNames.push(optionName)
        }
        contractTypes(this)
        candleInterval(this)
        duration(this)
        payout(this)
        if (config.hasPrediction.indexOf(oppositesName) > -1) {
          prediction(this)
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
      },
    }
    Blockly.JavaScript[oppositesName.toLowerCase()] = () => ''
  }
}
