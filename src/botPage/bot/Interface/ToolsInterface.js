import CandleInterface from './CandleInterface'
import MiscInterface from './MiscInterface'
import IndicatorsInterface from './IndicatorsInterface'

export default Interface =>
  class extends IndicatorsInterface(MiscInterface(CandleInterface(Interface))) {
    getToolsInterface() {
      return {
        ...this.getTimeInterface(),
        ...this.getCandleInterface(),
        ...this.getMiscInterface(),
        ...this.getIndicatorsInterface(),
      }
    }
    getTimeInterface() {
      return {
        getTime: () => parseInt((new Date().getTime()) / 1000, 10),
      }
    }
  }
