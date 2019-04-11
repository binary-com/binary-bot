import fs from 'fs';
import readline from 'readline';
import program from 'commander';
import { observer as globalObserver } from '../../common/utils/observer';
import { createInterpreter } from './CliTools';

const log = (...args) => console.log(`${new Date().toLocaleTimeString()}:`, ...args); // eslint-disable-line no-console

process.on('unhandledRejection', e => log('Unhandled Rejection:', e));

setInterval(() => {}, 2147483647); // Keep node alive

let filename;

program
    .usage('[filename]')
    .arguments('[filename]')
    .action(fn => {
        filename = fn;
    })
    .parse(process.argv);

const lineReader = readline.createInterface({
    input: filename ? fs.createReadStream(filename) : process.stdin,
});

let code = '';

const interpreter = createInterpreter();

globalObserver.register('Error', e => log(e));

globalObserver.register('Notify', ({ className, message }) => log(`${className.toUpperCase()}: ${message}`));

lineReader
    .on('line', line => {
        code += `${line}\n`;
    })
    .on('error', e => log(e))
    .on('close', () =>
        interpreter
            .run(code)
            .then(v => log(v.data))
            .catch(e => log(e))
    );
