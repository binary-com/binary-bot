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

lineReader.on('close', () =>
  (new JSI(code, v => console.log(v.data))).start())
