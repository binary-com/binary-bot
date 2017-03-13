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
    this.observer = $scope.observer
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

        interpreter.setProperty(scope, 'Bot', pseudoBotIf)

        interpreter.setProperty(scope, 'isInside',
          interpreter.nativeToPseudo(isInside))
        interpreter.setProperty(scope, 'watch',
          this.createAsync(interpreter, watch))
        interpreter.setProperty(scope, 'sleep',
          this.createAsync(interpreter, sleep))
      }
    }

    return new Promise(resolve => {
      const interpreter = new JSInterpreter(code, initFunc)

      const loop = () => {
        if (this.stopped || !interpreter.run()) {
          if (this.observer) {
            this.observer.unregisterAll('CONTINUE')
          }
          resolve(interpreter.pseudoToNative(interpreter.value))
          return
        }
        if (!this.observer.isRegistered('CONTINUE')) {
          this.observer.register('CONTINUE', () => setTimeout(loop, 0))
        }
      }

      loop()
    })
  }
  stop() {
    this.$scope.api.disconnect()
    globalObserver.emit('bot.stop')
    this.stopped = true
  }
  createAsync(interpreter, func) {
    return interpreter.createAsyncFunction((...args) => {
      const callback = args.pop()

      return func(...args.map(arg => interpreter.pseudoToNative(arg)))
        .then(rv => {
          callback(interpreter.nativeToPseudo(rv))
          this.observer.emit('CONTINUE')
        })
    })
  }
}
