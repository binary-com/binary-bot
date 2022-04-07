const gulp = require('gulp');
const del = require('del');
const rev = require('gulp-rev');
const through = require('through2');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const { addToManifest } = require('./revision');

const gen = env => {
    process.env.NODE_ENV = env;
    const is_test_link = process.argv.indexOf('--test');
    if (is_test_link !== -1) {
        const branch_index = process.argv.indexOf('--branch');
        if (branch_index !== -1 && process.argv[branch_index + 1]) {
            process.env.BRANCH = process.argv[branch_index + 1];
        }
    }
    process.env.ARGS = process.argv
    return webpackStream(require('../webpack.config.web'), webpack).pipe(gulp.dest('www/js'));
};

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
