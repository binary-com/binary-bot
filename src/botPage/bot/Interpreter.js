import JSInterpreter from 'js-interpreter';
import { observer as globalObserver } from 'binary-common-utils/lib/observer';
import { createScope } from './CliTools';
import Interface from './Interface';

const botInitialized = bot => bot && bot.tradeEngine.options;
const botStarted = bot => botInitialized(bot) && bot.tradeEngine.tradeOptions;
const shouldRestartOnError = bot => botInitialized(bot) && bot.tradeEngine.options.shouldRestartOnError;
const timeMachineEnabled = bot => botInitialized(bot) && bot.tradeEngine.options.timeMachineEnabled;

export default class Interpreter {
    constructor() {
        this.init();
    }
    init() {
        this.$scope = createScope();
        this.bot = new Interface(this.$scope);
        this.stopped = false;
        this.$scope.observer.register('REVERT', watchName =>
            this.revert(watchName === 'before' ? this.beforeState : this.duringState)
        );
    }
    run(code) {
        const initFunc = (interpreter, scope) => {
            const BotIf = this.bot.getInterface('Bot');
            const ticksIf = this.bot.getTicksInterface();
            const { alert, prompt, sleep, console: customConsole } = this.bot.getInterface();

            interpreter.setProperty(scope, 'console', interpreter.nativeToPseudo(customConsole));

            interpreter.setProperty(scope, 'alert', interpreter.nativeToPseudo(alert));

            interpreter.setProperty(scope, 'prompt', interpreter.nativeToPseudo(prompt));

            const pseudoBotIf = interpreter.nativeToPseudo(BotIf);

            Object.entries(ticksIf).forEach(([name, f]) =>
                interpreter.setProperty(pseudoBotIf, name, this.createAsync(interpreter, f))
            );

            interpreter.setProperty(
                pseudoBotIf,
                'start',
                interpreter.nativeToPseudo((...args) => {
                    const { start } = BotIf;
                    if (shouldRestartOnError(this.bot)) {
                        this.startState = interpreter.takeStateSnapshot();
                    }
                    start(...args);
                })
            );

            interpreter.setProperty(pseudoBotIf, 'purchase', this.createAsync(interpreter, BotIf.purchase));

            interpreter.setProperty(pseudoBotIf, 'sellAtMarket', this.createAsync(interpreter, BotIf.sellAtMarket));

            interpreter.setProperty(scope, 'Bot', pseudoBotIf);

            interpreter.setProperty(
                scope,
                'watch',
                this.createAsync(interpreter, watchName => {
                    const { watch } = this.bot.getInterface();

                    if (timeMachineEnabled(this.bot)) {
                        const snapshot = this.interpreter.takeStateSnapshot();
                        if (watchName === 'before') {
                            this.beforeState = snapshot;
                        } else {
                            this.duringState = snapshot;
                        }
                    }

                    return watch(watchName);
                })
            );

            interpreter.setProperty(scope, 'sleep', this.createAsync(interpreter, sleep));
        };

        return new Promise((resolve, reject) => {
            const onError = e => {
                if (this.stopped) {
                    return;
                }
                if (!shouldRestartOnError(this.bot) || !botStarted(this.bot)) {
                    reject(e);
                    return;
                }
                globalObserver.emit('Error', e);
                const { initArgs, tradeOptions } = this.bot.tradeEngine;
                this.stop();
                this.init();
                this.$scope.observer.register('Error', onError);
                this.bot.tradeEngine.init(...initArgs);
                this.bot.tradeEngine.start(tradeOptions);
                this.revert(this.startState);
            };

            this.$scope.observer.register('Error', onError);

            this.interpreter = new JSInterpreter(code, initFunc);

            this.onFinish = resolve;
            this.loop();
        });
    }
    loop() {
        if (this.stopped || !this.interpreter.run()) {
            this.onFinish(this.interpreter.pseudoToNative(this.interpreter.value));
        }
    }
    revert(state) {
        this.interpreter.restoreStateSnapshot(state);
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
                .catch(e => this.$scope.observer.emit('Error', e));
        });
    }
}
