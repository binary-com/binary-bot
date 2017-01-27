import Interpreter from 'js-interpreter'
import botApi, {
  wait, waitUntil, initPromise, isInside,
} from './botApi'

const createAsync = (interpreter, func) =>
  interpreter.createAsyncFunction((arg, cb) =>
    func(interpreter.pseudoToNative(arg)).then(rv => (
      rv ?
        cb(interpreter.nativeToPseudo(rv)) :
        cb()
    ))
  )

const initFunc = (interpreter, scope) => {
  interpreter.setProperty(scope, 'console',
    interpreter.nativeToPseudo(console))
  interpreter.setProperty(scope, 'isInside',
    interpreter.nativeToPseudo(isInside))
  interpreter.setProperty(scope, 'Bot',
    interpreter.nativeToPseudo(botApi))
  interpreter.setProperty(scope, 'wait',
    createAsync(interpreter, wait))
  interpreter.setProperty(scope, 'waitUntil',
    createAsync(interpreter, waitUntil))
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
