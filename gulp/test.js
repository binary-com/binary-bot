import gulp from 'gulp';
import eslint from 'gulp-eslint';
import mocha from 'gulp-mocha';

gulp.task('eslint', () => gulp.src(['./src/**/*.js', '!./src/common/mock/*', '!./src/calls.js'])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError()));

gulp.task('test', ['eslint'], () => gulp.src(['./src/**/__tests__/*.js'])
  .pipe(mocha({
    require: ['./src/common/mochaHelper.js'],
    reporter: 'progress',
  })));

