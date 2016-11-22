import gulp from 'gulp';
import watch from 'gulp-watch';
import ghPages from 'gulp-gh-pages';
import connect from 'gulp-connect';
import open from 'gulp-open';
import './gulp/i18n';
import './gulp/mock';
import './gulp/build';


gulp.task('connect', () => {
  connect.server({
    root: 'www',
    port: 8080,
    livereload: true,
  });
});

gulp.task('open', () => gulp.src('www/index.html')
  .pipe(open({
    uri: 'http://localhost:8080/',
  })));

gulp.task('serve', ['open', 'connect'], () => {
  watch(['www/*.html'])
    .pipe(connect.reload());
});

gulp.task('deploy', ['build-min'],
  () => gulp.src(['404.md', 'LICENSE', 'README.md', 'CNAME', './www/**', './beta/**', './translation/**'])
  .pipe(ghPages()));

gulp.task('test-deploy', ['build-min', 'serve'], () => {
});

gulp.task('watch-static', () => gulp.watch(['static/xml/**/*', 'static/*.html', 'static/css/*.scss'], {
  debounceTimeout: 1000,
}, ['build-dev-static']));

gulp.task('watch-html', () => gulp.watch(['templates/**/*'], {
  debounceTimeout: 1000,
}, ['build-dev-html']));

gulp.task('watch', ['serve', 'build', 'watch-static', 'watch-html']);

gulp.task('default', ['watch']);
