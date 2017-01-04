import gulp from 'gulp'
import del from 'del'
import paths from 'vinyl-paths'
import rev from 'gulp-rev'
import through from 'through2'
import sass from 'gulp-sass'
import sourcemaps from 'gulp-sourcemaps'
import {
    addToManifest,
} from './revision'

gulp.task('clean-css', () => gulp.src(['./www/css/*-*.css', '!./www/css/bundle-*', 'static/css/*.css*'])
    .pipe(paths(del)))

gulp.task('sass', ['clean-css'], () => gulp.src(['static/css/bot.scss', 'static/css/index.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(rev())
    .pipe(through.obj(addToManifest))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./static/css')))

gulp.task('static-css', ['sass'], () => gulp.src('static/css/*.css*')
    .pipe(gulp.dest('./www/css')))

gulp.task('static', ['static-css'], () => gulp.src(['static/**', '!static/css/*'])
    .pipe(gulp.dest('./www')))
