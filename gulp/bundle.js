const gulp = require('gulp');
const del = require('del');
const paths = require('vinyl-paths');
const rev = require('gulp-rev');
const through = require('through2');
const concat = require('gulp-concat-util');
const concatCss = require('gulp-concat-css');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const { addToManifest } = require('./revision');

gulp.task('clean-bundle', gulp.parallel(() => gulp.src('./www/js/bundle*').pipe(paths(del))));

gulp.task(
    'bundle-js',
    gulp.parallel(done => {
        gulp.src([
            './node_modules/blockly/blockly_compressed.js',
            './node_modules/blockly/blocks_compressed.js',
            './node_modules/blockly/javascript_compressed.js',
            './node_modules/blockly/msg/messages.js',
        ])
            .pipe(concat('bundle.js'))
            .pipe(rev())
            .pipe(through.obj(addToManifest))
            .pipe(gulp.dest('www/js/'))
            .on('end', () => done());
    })
);

gulp.task(
    'copy-js',
    gulp.parallel(done => {
        gulp.src(['./node_modules/@deriv/deriv-charts/dist/*.smartcharts.*']).pipe(gulp.dest('www/js/'));
        done();
    })
);

gulp.task(
    'bundle-css',
    gulp.parallel(done => {
        gulp.src([
            'node_modules/jquery-ui-css/jquery-ui.min.css',
            './node_modules/@deriv/deriv-charts/dist/smartcharts.css',
        ])
            .pipe(concatCss('bundle.css'))
            .pipe(rev())
            .pipe(through.obj(addToManifest))
            .pipe(gulp.dest('www/css'));
        done();
    })
);
