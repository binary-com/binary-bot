import gulp from 'gulp';
import del from 'del';
import paths from 'vinyl-paths';
import rev from 'gulp-rev';
import through from 'through2';
import { addToManifest } from './revision';

gulp.task('clean-css', () => gulp.src(['./www/css/*-*.css', '!./www/css/bundle-*'])
  .pipe(paths(del)));

gulp.task('static-css', ['clean-css'], () => gulp.src('static/css/*')
  .pipe(rev())
  .pipe(through.obj(addToManifest))
  .pipe(gulp.dest('./www/css')));

gulp.task('static', ['static-css'], () => gulp.src(['static/**', '!static/css/*'])
  .pipe(gulp.dest('./www')));

