import Interpreter from 'js-interpreter'
import botApi, { wait, initPromise } from './botApi'

const initFunc = (interpreter, scope) => {
  interpreter.setProperty(scope, 'console',
    interpreter.nativeToPseudo(console))
  interpreter.setProperty(scope, 'Bot',
    interpreter.nativeToPseudo(botApi))
  interpreter.setProperty(scope, 'wait',
    interpreter.createAsyncFunction((arg = 0, cb) =>
      wait(interpreter.pseudoToNative(arg)).then(rv => (
        rv ?
          cb(interpreter.nativeToPseudo(rv)) :
          cb()
      ))
    ))
}

export default class JSI {
  constructor(code, done) {
    this.code = code
    this.done = done
  }
  start() {
    initPromise.then(() => {
      const interpreter = new Interpreter(this.code, initFunc)

      const interpreterLoop = setInterval(() => {
        if (!interpreter.step()) {
          this.done(interpreter.value)
          clearInterval(interpreterLoop)
        }
      }, 0)
    })
  }
}
