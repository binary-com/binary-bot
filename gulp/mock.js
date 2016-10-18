import gulp from 'gulp';
import mock from 'binary-mock-websocket';

gulp.task('build-mock', () => gulp.src('./src/common/calls.js', {
  read: false,
})
  .pipe(mock)
  .pipe(gulp.dest('./src/common/mock')));

gulp.task('build-mock-debug', () => gulp.src('./src/common/debugCalls.js', {
  read: false,
})
  .pipe(mock())
  .pipe(gulp.dest('./src/common/debugMock')));

