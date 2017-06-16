export default Interface =>
    class extends Interface {
        getTicksInterface() {
            return {
                getLastTick   : () => this.tradeEngine.getLastTick(),
                getLastDigit  : () => this.tradeEngine.getLastDigit(),
                getTicks      : () => this.tradeEngine.getTicks(),
                checkDirection: dir => this.tradeEngine.checkDirection(dir),
                getOhlcFromEnd: args => this.tradeEngine.getOhlcFromEnd(args),
                getOhlc       : args => this.tradeEngine.getOhlc(args),
            };
        }
    };
