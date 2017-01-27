import Interpreter from 'js-interpreter'
import BotApi from './BotApi'

const createAsync = (interpreter, func) =>
  interpreter.createAsyncFunction((arg, cb) =>
    func(interpreter.pseudoToNative(arg)).then(rv => (
      rv ?
        cb(interpreter.nativeToPseudo(rv)) :
        cb()
    ))
  )

export default class JSI {
  constructor(api) {
    this.botApi = new BotApi(api)
  }
  run(code) {
    const initFunc = (interpreter, scope) => {
      interpreter.setProperty(scope, 'console',
        interpreter.nativeToPseudo(console))
      interpreter.setProperty(scope, 'isInside',
        interpreter.nativeToPseudo(this.botApi.isInside))
      interpreter.setProperty(scope, 'Bot',
        interpreter.nativeToPseudo(this.botApi.getInterface()))
      interpreter.setProperty(scope, 'wait',
        createAsync(interpreter, this.botApi.wait))
      interpreter.setProperty(scope, 'waitUntil',
        createAsync(interpreter, this.botApi.waitUntil))
    }

    return new Promise(r => {
      this.botApi.initPromise.then(() => {
        const interpreter = new Interpreter(code, initFunc)

        const interpreterLoop = setInterval(() => {
          if (!interpreter.step()) {
            r(interpreter.value)
            clearInterval(interpreterLoop)
          }
        }, 0)
      })
    })
  }
}
