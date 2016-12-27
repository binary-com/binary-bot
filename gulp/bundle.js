import gulp from 'gulp';
import del from 'del';
import paths from 'vinyl-paths';
import rev from 'gulp-rev';
import through from 'through2';
import concat from 'gulp-concat-util';
import concatCss from 'gulp-concat-css';
import rename from 'gulp-rename';
import cleanCSS from 'gulp-clean-css';
import { addToManifest } from './revision';

gulp.task('clean-bundle', () => gulp.src('./www/js/bundle*')
  .pipe(paths(del)));

gulp.task('jquery-copy', () => gulp.src('./node_modules/jquery/dist/jquery.min.js')
  .pipe(concat('jquery.js'))
  .pipe(rev())
  .pipe(through.obj(addToManifest))
  .pipe(gulp.dest('www/js/')));

gulp.task('bundle-js', ['jquery-copy'], () => gulp.src([
  './node_modules/jquery/dist/jquery.min.js',
  './node_modules/blockly/blockly_compressed.js',
  './node_modules/blockly/blocks_compressed.js',
  './node_modules/blockly/javascript_compressed.js',
])
  .pipe(concat('bundle.js'))
  .pipe(rev())
  .pipe(through.obj(addToManifest))
  .pipe(gulp.dest('www/js/')));

gulp.task('bundle-css',
  () => gulp.src(['node_modules/{bootstrap/dist/css/bootstrap.min,tourist/tourist}.css'])
  .pipe(concatCss('bundle.css'))
  .pipe(rev())
  .pipe(through.obj(addToManifest))
  .pipe(gulp.dest('www/css')));

gulp.task('bundle-css-min', ['bundle-css'], () => gulp.src('www/css/bundle-*.css')
  .pipe(rename('bundle.min.css'))
  .pipe(cleanCSS())
  .pipe(rev())
  .pipe(through.obj(addToManifest))
  .pipe(gulp.dest('www/css')));
