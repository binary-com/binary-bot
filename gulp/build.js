import gulp from 'gulp';
import connect from 'gulp-connect';
import mustache from 'gulp-mustache-plus';
import { getManifest } from './revision';
import './static';
import './bundle';
import './webpack';

const getConfig = (prefix) => ({
  index: `<script src="js/${getManifest(`index${prefix}.js`)}"></script>`,
  bot: `<script src="js/${getManifest(`bot${prefix}.js`)}"></script>`,
  bundle_css: `<link href="css/${getManifest(`bundle${prefix}.css`)}" rel="stylesheet" />`,
  main_css: `<link href="css/${getManifest('main.css')}" rel="stylesheet" />`,
  bot_css: `<link href="css/${getManifest('bot.css')}" rel="stylesheet" />`,
  chart_css: `<link href="css/${getManifest('chart.css')}" rel="stylesheet" />`,
  fontello_css: `<link href="css/${getManifest('fontello.css')}" rel="stylesheet" />`,
  head: 'templates/partials/head.mustache',
  security: 'templates/partials/security.mustache',
  language: 'templates/partials/language.mustache',
});

const genHtml = (min) => gulp.src('templates/*.mustache')
  .pipe(mustache({}, {}, getConfig(min ? '.min' : '')))
  .pipe(gulp.dest('www'))
  .pipe(connect.reload());

gulp.task('build-dev-html', genHtml);
gulp.task('build-dev-js', ['webpack-dev'], genHtml);
gulp.task('build-dev-static', ['static'], genHtml);
gulp.task('build-min', ['static', 'webpack-prod', 'bundle-css-min', 'bundle-js'],
  () => genHtml(true));
gulp.task('build', ['bundle-css', 'bundle-js', 'build-dev-js', 'build-dev-static']);
