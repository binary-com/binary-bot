export default Interface =>
    class extends Interface {
        getTicksInterface() {
            return {
                getLastTick     : (...args) => this.tradeEngine.getLastTick(...args),
                getLastDigit    : (...args) => this.tradeEngine.getLastDigit(...args),
                getTicks        : (...args) => this.tradeEngine.getTicks(...args),
                checkDirection  : (...args) => this.tradeEngine.checkDirection(...args),
                getOhlcFromEnd  : (...args) => this.tradeEngine.getOhlcFromEnd(...args),
                getOhlc         : (...args) => this.tradeEngine.getOhlc(...args),
                getLastDigitList: (...args) => this.tradeEngine.getLastDigitList(...args),
            };
        }
    };
