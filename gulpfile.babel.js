const gulp = require('gulp');
const watch = require('gulp-watch');
const ghPages = require('gulp-gh-pages-will');
const connect = require('gulp-connect');
const open = require('gulp-open');
require('./gulp/i18n');
require('./gulp/build');
require('./gulp/plato');

gulp.task(
    'connect',
    gulp.series(() => {
        connect.server({
            root      : 'www',
            port      : 8080,
            livereload: true,
        });
    })
);

gulp.task(
    'open',
    gulp.series(() =>
        gulp.src('www/index.html').pipe(
            open({
                uri: 'http://localhost:8080/',
            })
        )
    )
);

gulp.task(
    'serve',
    gulp.series('open', 'connect', () => {
        watch(['www/*.html']).pipe(connect.reload());
    })
);

gulp.task(
    'deploy',
    gulp.series('build-min', () =>
        gulp.src(['404.md', 'LICENSE', 'README.md', 'CNAME', './www/**', './branch/**', './old/**']).pipe(ghPages())
    )
);

gulp.task('test-deploy', gulp.series('build-min', 'serve', () => {}));

gulp.task(
    'watch-static',
    gulp.series(() =>
        gulp.watch(
            ['static/xml/**/*', 'static/*.html', 'static/css/*.scss'],
            {
                debounceTimeout: 1000,
            },
            ['build-dev-static']
        )
    )
);

gulp.task(
    'watch-html',
    gulp.series(() =>
        gulp.watch(
            ['templates/**/*'],
            {
                debounceTimeout: 1000,
            },
            ['build-dev-html']
        )
    )
);

gulp.task('watch', gulp.series('serve', 'build', 'watch-static', 'watch-html'));

gulp.task('default', gulp.series('watch'));
