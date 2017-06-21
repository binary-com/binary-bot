import JSInterpreter from 'js-interpreter';
import { observer as globalObserver } from 'binary-common-utils/lib/observer';
import { createScope } from './CliTools';
import Interface from './Interface';

export default class Interpreter {
    constructor() {
        this.$scope = createScope();
        this.bot = new Interface(this.$scope);
        this.stopped = false;
        this.$scope.observer.register('REVERT', watchName => this.revert(watchName));
    }
    run(code) {
        let initFunc;

        if (this.bot) {
            const BotIf = this.bot.getInterface('Bot');

            const ticksIf = this.bot.getTicksInterface();

            const { watch, alert, prompt, sleep, console: customConsole } = this.bot.getInterface();

            initFunc = (interpreter, scope) => {
                interpreter.setProperty(scope, 'console', interpreter.nativeToPseudo(customConsole));

                interpreter.setProperty(scope, 'alert', interpreter.nativeToPseudo(alert));

                interpreter.setProperty(scope, 'prompt', interpreter.nativeToPseudo(prompt));

                const pseudoBotIf = interpreter.nativeToPseudo(BotIf);

                Object.entries(ticksIf).forEach(([name, f]) =>
                    interpreter.setProperty(pseudoBotIf, name, this.createAsync(interpreter, f))
                );

                interpreter.setProperty(pseudoBotIf, 'purchase', this.createAsync(interpreter, BotIf.purchase));

                interpreter.setProperty(pseudoBotIf, 'sellAtMarket', this.createAsync(interpreter, BotIf.sellAtMarket));

                interpreter.setProperty(scope, 'Bot', pseudoBotIf);

                interpreter.setProperty(
                    scope,
                    'watch',
                    this.createAsync(interpreter, watchName => {
                        const snapshot = this.interpreter.takeStateSnapshot();
                        if (watchName === 'before') {
                            this.beforeState = snapshot;
                        } else {
                            this.duringState = snapshot;
                        }

                        return watch(watchName);
                    })
                );
                interpreter.setProperty(scope, 'sleep', this.createAsync(interpreter, sleep));
            };
        }

        return new Promise((resolve, reject) => {
            globalObserver.register('Error', e => reject(e));

            try {
                this.interpreter = new JSInterpreter(code, initFunc);
            } catch (e) {
                globalObserver.emit('Error', e);
            }

            this.onFinish = resolve;
            this.loop();
        });
    }
    loop() {
        if (this.stopped || !this.interpreter.run()) {
            this.onFinish(this.interpreter.pseudoToNative(this.interpreter.value));
        }
    }
    revert(watchName) {
        this.interpreter.restoreStateSnapshot(watchName === 'before' ? this.beforeState : this.duringState);
        // eslint-disable-next-line no-underscore-dangle
        this.interpreter.paused_ = false;
        this.loop();
    }
    stop() {
        this.$scope.api.disconnect();
        globalObserver.emit('bot.stop');
        this.stopped = true;
    }
    createAsync(interpreter, func) {
        return interpreter.createAsyncFunction((...args) => {
            const callback = args.pop();

            func(...args.map(arg => interpreter.pseudoToNative(arg)))
                .then(rv => {
                    callback(interpreter.nativeToPseudo(rv));
                    this.loop();
                })
                .catch(e => globalObserver.emit('Error', e));
        });
    }
}
