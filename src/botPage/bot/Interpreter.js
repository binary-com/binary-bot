import JSInterpreter from 'js-interpreter'
import { observer as globalObserver } from 'binary-common-utils/lib/observer'
import Interface from './Interface'

export default class Interpreter {
  constructor($scope) {
    if (!$scope) { // valid usage for js only code
      return
    }
    this.$scope = $scope
    this.bot = new Interface($scope)
    this.stopped = false
    $scope.observer.register('REVERT', () => this.revert())
  }
  run(code) {
    let initFunc

    if (this.bot) {
      const BotIf = this.bot.getInterface('Bot')

      const ticksIf = this.bot.getTicksInterface()

      const { isInside, watch, alert, sleep } = this.bot.getInterface()

      initFunc = (interpreter, scope) => {
        interpreter.setProperty(scope, 'console',
          interpreter.nativeToPseudo({
            log(...args) { console.log(...args) }, // eslint-disable-line no-console
          }))
        interpreter.setProperty(scope, 'alert',
          interpreter.nativeToPseudo(alert))

        const pseudoBotIf = interpreter.nativeToPseudo(BotIf)

        Object.entries(ticksIf).forEach(([name, f]) =>
          interpreter.setProperty(pseudoBotIf, name,
            this.createAsync(interpreter, f)))

        interpreter.setProperty(pseudoBotIf, 'purchase',
          this.createAsync(interpreter, BotIf.purchase))

        interpreter.setProperty(scope, 'Bot', pseudoBotIf)

        interpreter.setProperty(scope, 'isInside',
          interpreter.nativeToPseudo(isInside))
        interpreter.setProperty(scope, 'watch',
          this.createAsync(interpreter, watchName => {
            if (watchName === 'before') {
              this.state = this.interpreter.takeStateSnapshot()
            }

            return watch(watchName)
          }))
        interpreter.setProperty(scope, 'sleep',
          this.createAsync(interpreter, sleep))
      }
    }

    return new Promise(resolve => {
      this.interpreter = new JSInterpreter(code, initFunc)

      this.onFinish = resolve
      this.loop()
    })
  }
  loop() {
    if (this.stopped || !this.interpreter.run()) {
      this.onFinish(this.interpreter.pseudoToNative(this.interpreter.value))
    }
  }
  revert() {
    this.interpreter.restoreStateSnapshot(this.state)
    this.interpreter.paused_ = false
    this.loop()
  }
  stop() {
    this.$scope.api.disconnect()
    globalObserver.emit('bot.stop')
    this.stopped = true
  }
  createAsync(interpreter, func) {
    return interpreter.createAsyncFunction((...args) => {
      const callback = args.pop()

      func(...args.map(arg => interpreter.pseudoToNative(arg)))
        .then(rv => {
          callback(interpreter.nativeToPseudo(rv))
          this.loop()
        })
    })
  }
}
