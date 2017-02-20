import Interpreter from 'js-interpreter'
import ContextManager from './ContextManager'
import BotApi from './BotApi'

const createAsync = (interpreter, func) =>
  interpreter.createAsyncFunction((arg, cb) =>
    func(interpreter.pseudoToNative(arg))
      .then(rv => (rv ? cb(interpreter.nativeToPseudo(rv)) : cb())))

export default class JSI {
  constructor($scope) {
    if (!$scope) { // valid usage for js only code
      return
    }
    this.botApi = new BotApi(
      Object.assign({}, $scope, { CM: new ContextManager($scope) }))
    this.stopped = false
    this.observer = $scope.observer
  }
  run(code) {
    let initFunc

    if (this.botApi) {
      this.Bot = this.botApi.getInterface('Bot')

      const { isInside, watch, alert, sleep } = this.botApi.getInterface()

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

    return new Promise((resolve, reject) => {
      const interpreter = new Interpreter(code, initFunc)

      if (this.observer) {
        this.observer.register('api.error', e => reject(e))
      }

      const loop = () => {
        try {
          if (this.stopped || !interpreter.run()) {
            if (this.observer) {
              this.observer.unregisterAll('CONTINUE')
            }
            resolve(interpreter.pseudoToNative(interpreter.value))
            return
          }
        } catch (e) {
          reject(e)
        }
        if (!this.observer.isRegistered('CONTINUE')) {
          this.observer.register('CONTINUE', () => setTimeout(loop, 0))
        }
      }

      loop()
    })
  }
  stop() {
    this.stopped = true
    this.Bot.stop()
  }
}
