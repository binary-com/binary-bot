const gulp = require('gulp');
const del = require('del');
const paths = require('vinyl-paths');
const rev = require('gulp-rev');
const through = require('through2');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const { addToManifest } = require('./revision');

const gen = env => {
    process.env.NODE_ENV = env;
    return webpackStream(require('../webpack.config.web'), webpack).pipe(gulp.dest('www/js'));
};

const addRev = () =>
    gulp
        .src(['./www/js/{bot,index}*.js'])
        .pipe(rev())
        .pipe(through.obj(addToManifest))
        .pipe(gulp.dest('www/js'));

gulp.task('clean-webpack', gulp.series(() => gulp.src(['./www/js/{bot,index}*']).pipe(paths(del))));

gulp.task('webpack-gen-dev', gulp.series('clean-webpack', () => gen('development')));
gulp.task('webpack-gen-prod', gulp.series('clean-webpack', () => gen('production')));
gulp.task('webpack-dev', gulp.series('webpack-gen-dev', addRev));
gulp.task('webpack-prod', gulp.series('webpack-gen-prod', addRev));
