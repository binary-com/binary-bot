import 'babel-polyfill'
import Observer, { observer as globalObserver } from 'binary-common-utils/lib/observer'
import fs from 'fs'
import readline from 'readline'
import minimist from 'minimist'
import WebSocket from 'ws'
import { LiveApi } from 'binary-live-api'
import Interpreter from './Interpreter'
import TicksService from '../common/TicksService'

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

const args = minimist(process.argv.slice(2))

const lineReader = readline.createInterface({
  input: args._.length ?
    fs.createReadStream(args._[0]) :
    process.stdin,
})

let code = ''

lineReader.on('line', line => (code += `${line}\n`))

const interpreter = createInterpreter()

globalObserver.register('Error', e => console.log(e)) // eslint-disable-line no-console

lineReader.on('close', () => interpreter.run(code)
  .then(v => console.log(v.data), e => console.log(e))) // eslint-disable-line no-console
