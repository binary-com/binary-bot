const AppIdMap = Object.freeze({
    production: Object.freeze({
        'bot.deriv.com': '29864',
        'bot.deriv.me': '29864', // todo: change when will be registered
    }),
    staging: Object.freeze({
        'staging-bot.deriv.com': '29934',
    }),
    dev: Object.freeze({
        localhost: '16014',
        'localbot.binary.sx': '16014',
    }),
});
export default AppIdMap;
