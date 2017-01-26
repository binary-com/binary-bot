import CustomApi from 'binary-common-utils/lib/customApi'
import Observer from 'binary-common-utils/lib/observer'
import fs from 'fs'
import readline from 'readline'
import minimist from 'minimist'
import JSI from './jsi'

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

lineReader.on('close', () =>
  (new JSI($scope)).run(code)
    .then(v => console.log(v.data))) // eslint-disable-line no-console
