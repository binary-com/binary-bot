import 'babel-polyfill'
import Observer, { observer as globalObserver } from 'binary-common-utils/lib/observer'
import fs from 'fs'
import readline from 'readline'
import program from 'commander'
import WebSocket from 'ws'
import { LiveApi } from 'binary-live-api'
import Interpreter from './Interpreter'
import TicksService from '../common/TicksService'

const log = (...args) =>
  console.log(`${new Date().toLocaleTimeString()}:`, ...args) // eslint-disable-line no-console

export const createScope = () => {
  const observer = new Observer()
  const api = new LiveApi({
    connection: new WebSocket(process.env.ENDPOINT ||
      'wss://ws.binaryws.com/websockets/v3?l=en&app_id=1169'),
  })

  const ticksService = new TicksService(api)

  return { observer, api, ticksService }
}

export const createInterpreter = () => new Interpreter(createScope())

let filename

program.version('8.0.3')
  .usage('[filename]')
  .arguments('[filename]')
  .action(fn => {
    filename = fn
  })
  .parse(process.argv)

const lineReader = readline.createInterface({
  input: filename ? fs.createReadStream(filename) : process.stdin,
})

let code = ''

const interpreter = createInterpreter()

globalObserver.register('Error', e => log(e)) // eslint-disable-line no-console

lineReader
  .on('line', line => (code += `${line}\n`))
  .on('error', e => log(e))
  .on('close', () => interpreter.run(code)
    .then(v => log(v.data)).catch(e => log(e)))
