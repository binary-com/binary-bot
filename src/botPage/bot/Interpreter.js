import JSInterpreter from 'js-interpreter'
import { observer as globalObserver } from 'binary-common-utils/lib/observer'
import Interface from './Interface'

const createAsync = (interpreter, func) =>
  interpreter.createAsyncFunction((arg, cb) =>
    func(interpreter.pseudoToNative(arg))
      .then(rv => (rv ? cb(interpreter.nativeToPseudo(rv)) : cb())))

export default class Interpreter {
  constructor($scope) {
    if (!$scope) { // valid usage for js only code
      return
    }
    this.$scope = $scope
    this.botIf = new Interface($scope)
    this.stopped = false
    this.observer = $scope.observer
  }
  run(code) {
    let initFunc

    if (this.botIf) {
      this.Bot = this.botIf.getInterface('Bot')

      const { isInside, watch, alert, sleep } = this.botIf.getInterface()

      initFunc = (interpreter, scope) => {
        interpreter.setProperty(scope, 'console',
          interpreter.nativeToPseudo({
            log(...args) { console.log(...args) }, // eslint-disable-line no-console
          }))
        interpreter.setProperty(scope, 'alert',
          interpreter.nativeToPseudo(alert))
        interpreter.setProperty(scope, 'Bot',
          interpreter.nativeToPseudo(this.Bot))
        interpreter.setProperty(scope, 'isInside',
          interpreter.nativeToPseudo(isInside))
        interpreter.setProperty(scope, 'watch',
          createAsync(interpreter, watch))
        interpreter.setProperty(scope, 'sleep',
          createAsync(interpreter, sleep))
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
    this.$scope.api.destroy()
    globalObserver.emit('bot.stop')
    this.stopped = true
  }
}
