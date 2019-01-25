const gulp = require('gulp');
const del = require('del');
const paths = require('vinyl-paths');
const rev = require('gulp-rev');
const through = require('through2');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const addToManifest = require('./revision').addToManifest;

gulp.task(
    'clean-css',
    gulp.series(() => gulp.src(['./www/css/*-*.css', '!./www/css/bundle-*', 'static/css/*.css*']).pipe(paths(del)))
);

gulp.task(
    'sass',
    gulp.series('clean-css', () =>
        gulp
            .src(['static/css/bot.scss', 'static/css/index.scss'])
            .pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
            .pipe(rev())
            .pipe(through.obj(addToManifest))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./static/css'))
    )
);

gulp.task('static-css', gulp.series('sass', () => gulp.src('static/css/*.css*').pipe(gulp.dest('./www/css'))));

gulp.task('static', gulp.series('static-css', () => gulp.src(['static/**', '!static/css/*']).pipe(gulp.dest('./www'))));

gulp.task(
    'copy-jquery-img',
    gulp.series(() => gulp.src('node_modules/jquery-ui-css/images/*').pipe(gulp.dest('www/css/images')))
);

gulp.task(
    'copy-binary-style-css',
    gulp.series(() => gulp.src('node_modules/binary-style/binary.css').pipe(gulp.dest('www/css')))
);

gulp.task(
    'copy-binary-style-img',
    gulp.series(() => gulp.src('node_modules/binary-style/src/images/**').pipe(gulp.dest('www/image/binary-style')))
);
