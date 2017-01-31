import Interpreter from 'js-interpreter'
import { observer } from 'binary-common-utils/lib/observer'
import BotApi from './BotApi'

const createAsync = (interpreter, func) =>
  interpreter.createAsyncFunction((arg, cb) =>
    func(interpreter.pseudoToNative(arg))
      .then(rv => (rv ? cb(interpreter.nativeToPseudo(rv)) : cb())))

export default class JSI {
  constructor(api) {
    this.botApi = new BotApi(api)
  }
  run(code) {
    const botIf = this.botApi.getInterface()

    const { isInside, wait, alert } = this.botApi.getInterface()

    const initFunc = (interpreter, scope) => {
      interpreter.setProperty(scope, 'console',
        interpreter.nativeToPseudo({ log(...args) { console.log(...args) } })) // eslint-disable-line no-console
      interpreter.setProperty(scope, 'alert',
        interpreter.nativeToPseudo(alert))
      interpreter.setProperty(scope, 'Bot',
        interpreter.nativeToPseudo(botIf))
      interpreter.setProperty(scope, 'isInside',
        interpreter.nativeToPseudo(isInside))
      interpreter.setProperty(scope, 'wait',
        createAsync(interpreter, wait))
    }

    return new Promise(r => {
      const interpreter = new Interpreter(code, initFunc)

      const loop = () => {
        if (!interpreter.run()) {
          observer.unregisterAll('CONTINUE')
          r(interpreter.value)
        }
      }

      observer.register('CONTINUE', loop)

      loop()
    })
  }
}
