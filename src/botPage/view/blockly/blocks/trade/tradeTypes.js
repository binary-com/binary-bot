// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#orvwcx

import config from '../../../../../common/const'
import { condition } from '../../relationChecker'
import { translator } from '../../../../../common/translator'
import {
  duration, payout, prediction,
  barrierOffset, secondBarrierOffset, candleInterval,
  contractTypes,
} from './components'

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
    }
    Blockly.JavaScript[oppositesName.toLowerCase()] = () => ''
  }
}
