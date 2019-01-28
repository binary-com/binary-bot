const gulp = require('gulp');
const plato = require('es6-plato');

const src = './src/**/*.js';
const outputDir = '/tmp/analysis';

const lintRules = {
    rules: {
        indent        : [2, 2],
        quotes        : [2, 'single'],
        semi          : [2, 'never'],
        'no-console'  : [1],
        curly         : ['error'],
        'no-dupe-keys': 2,
        'func-names'  : [1, 'always'],
        'max-len'     : [2],
    },
    env: {
        es6: true,
    },
    globals      : ['require'],
    parserOptions: {
        sourceType  : 'module',
        ecmaFeatures: {
            jsx    : true,
            modules: true,
        },
    },
};

const platoArgs = {
    title     : 'example',
    eslint    : lintRules,
    complexity: {},
};

function analysis() {
    return plato.inspect(src, outputDir, platoArgs);
}

gulp.task('analysis', gulp.series(analysis));
