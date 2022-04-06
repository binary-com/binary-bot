const gulp = require('gulp');
const del = require('del');
const rev = require('gulp-rev');
const through = require('through2');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const { addToManifest } = require('./revision');
const path = require('path');
const fs = require('fs');
const ini = require('ini');

const gen = env => {
    process.env.NODE_ENV = env;
    const is_test_link = process.argv.indexOf('--test');
    if (is_test_link !== -1) {
        const branch_index = process.argv.indexOf('--branch');
        if (branch_index !== -1 && process.argv[branch_index + 1]) {
            process.env.BRANCH = process.argv[branch_index + 1];
            process.env.PROJECT_NAME = getProjectName(); // gets project name from the .git/config
        }
    }
    process.env.ARGS = process.argv
    return webpackStream(require('../webpack.config.web'), webpack).pipe(gulp.dest('www/js'));
};

function getProjectName() {
    const config_dir = path.resolve(process.cwd(), '.git/config');
    if (!config_dir) return ''
    const config = fs.readFileSync(config_dir, 'utf8');
    const input = injectInclude(config, process.cwd());
    const output = parseIni(input, { path: process.cwd() });
    const origin = output[getKey(output)];
    const url_arr = origin.url.split(path.sep);
    const url = url_arr.pop();
    const name = path.basename(url, path.extname(url)) || '';
    console.log('Project Name: ', name);
    return name;
}

function injectInclude(input, cwd) {
    let lines = input.split('\n').filter(line => line.trim() !== '');
    let len = lines.length;
    let res = [];

    for (let i = 0; i < len; i++) {
        let line = lines[i];
        if (line.indexOf('[include]') === 0) {
            let filepath = lines[i + 1].replace(/^\s*path\s*=\s*/, '');
            let fp = path.resolve(cwd, expand(filepath));
            res.push(fs.readFileSync(fp));
        } else {
            res.push(line);
        }
    }
    return res.join('\n');
}

function parseIni(str, options) {
    let opts = Object.assign({}, options);

    str = str.replace(/\[(\S+) "(.*)"\]/g, (m, $1, $2) => {
        return $1 && $2 ? `[${$1} "${$2.split('.').join('\\.')}"]` : m;
    });

    let config = ini.parse(str);
    if (opts.expandKeys === true) {
        return parse.expandKeys(config);
    }
    return config;
}

function getKey(obj) {
    if (obj.hasOwnProperty('remote "origin"')) {
        return 'remote "origin"';
    }
    let keys = Object.keys(obj);
    return keys.find(key => /^remote /.test(key));
}

const addRev = () =>
    gulp
        .src(['./www/js/{bot,index}*.js'])
        .pipe(rev())
        .pipe(through.obj(addToManifest))
        .pipe(gulp.dest('www/js'));

gulp.task(
    'clean-webpack',
    gulp.series(done => {
        del(['./www/js/*']).then(() => done());
    })
);

gulp.task(
    'webpack-gen-dev',
    gulp.series('clean-webpack', done => {
        gen('development');
        done();
    })
);

gulp.task(
    'webpack-gen-prod',
    gulp.series('clean-webpack', done => {
        gen('production').on('end', () => done());
    })
);

gulp.task(
    'webpack-dev',
    gulp.series('webpack-gen-dev', done => {
        addRev();
        done();
    })
);

gulp.task(
    'webpack-prod',
    gulp.series('webpack-gen-prod', done => {
        addRev();
        done();
    })
);
