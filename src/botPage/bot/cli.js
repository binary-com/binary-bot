import { observer as globalObserver } from 'binary-common-utils/lib/observer'
import fs from 'fs'
import readline from 'readline'
import minimist from 'minimist'
import { createInterpreter } from './shared'

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
