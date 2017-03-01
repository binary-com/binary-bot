import CustomApi from 'binary-common-utils/lib/customApi'
import Observer, { observer as globalObserver } from 'binary-common-utils/lib/observer'
import WebSocket from 'ws'
import fs from 'fs'
import readline from 'readline'
import minimist from 'minimist'
import Interpreter from './Interpreter'

const args = minimist(process.argv.slice(2))

const lineReader = readline.createInterface({
  input: args._.length ?
    fs.createReadStream(args._[0]) :
    process.stdin,
})

let code = ''

lineReader.on('line', line => (code += `${line}\n`))

const observer = new Observer()
const api = (new CustomApi(observer, null, null, new WebSocket(
  process.env.ENDPOINT ||
    'wss://ws.binaryws.com/websockets/v3?l=en&app_id=0')))
const $scope = { observer, api }

globalObserver.register('Error', e => console.log(e)) // eslint-disable-line no-console

lineReader.on('close', () =>
  (new Interpreter($scope)).run(code)
    .then(v => console.log(v.data), e => console.log(e))) // eslint-disable-line no-console
