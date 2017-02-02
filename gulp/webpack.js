import gulp from 'gulp';
import del from 'del';
import paths from 'vinyl-paths';
import rev from 'gulp-rev';
import through from 'through2';
import webpackStream from 'webpack-stream';
import webpack from 'webpack'
import { addToManifest } from './revision';

const gen = (env) => {
  process.env.NODE_ENV = env;
  return webpackStream(require('../webpack.config'), webpack)
    .pipe(gulp.dest('www/js'));
};

const addRev = () => gulp.src(['./www/js/{bot,index}*.js'])
  .pipe(rev())
  .pipe(through.obj(addToManifest))
  .pipe(gulp.dest('www/js'));

gulp.task('clean-webpack', () => gulp.src(['./www/js/{bot,index}*'])
  .pipe(paths(del)));

gulp.task('webpack-gen-dev', ['clean-webpack'], () => gen('development'));
gulp.task('webpack-gen-prod', ['clean-webpack'], () => gen('production'));
gulp.task('webpack-dev', ['webpack-gen-dev'], addRev);
gulp.task('webpack-prod', ['webpack-gen-prod'], addRev);

