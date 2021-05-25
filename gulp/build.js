const gulp = require('gulp');
const connect = require('gulp-connect');
const mustache = require('gulp-mustache');
const { getManifest } = require('./revision');
require('./static');
require('./bundle');
require('./webpack');

const getConfig = prefix => ({
    index           : `<script src="js/${prefix ? getManifest(`index${prefix}.js`) : 'index.js'}"></script>`,
    bot             : `<script src="js/${prefix ? getManifest(`bot${prefix}.js`) : 'bot.js'}"></script>`,
    bundle          : `<script src="js/${getManifest('bundle.js')}"></script>`,
    bundle_css      : `<link href="css/${getManifest('bundle.css')}" rel="stylesheet" />`,
    index_css       : `<link href="css/${getManifest('index.css')}" rel="stylesheet" />`,
    bot_css         : `<link href="css/${getManifest('bot.css')}" rel="stylesheet" />`,
    binary_style_img: 'image/binary-style',
    gtm_iframe      :
        '<!-- Google Tag Manager (noscript) --> <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P97C2DZ" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript> <!-- End Google Tag Manager (noscript) -->',
});

const genHtml = min =>
    gulp
        .src('templates/*.mustache')
        .pipe(mustache({}, { extension: '.html' }, getConfig(min === true ? '.min' : '')))
        .pipe(gulp.dest('./www'))
        .pipe(connect.reload());

gulp.task(
    'build-dev-html',
    gulp.series(done => {
        genHtml(false);
        done();
    })
);

gulp.task(
    'build-dev-js',
    gulp.series('webpack-dev', done => {
        genHtml(false);
        done();
    })
);

gulp.task(
    'build-dev-static',
    gulp.series('static', done => {
        genHtml(false);
        done();
    })
);

gulp.task(
    'build-min',
    gulp.series(
        'static',
        'webpack-prod',
        'bundle-css',
        'bundle-js',
        'copy-jquery-img',
        'copy-binary-style-css',
        'copy-binary-style-img',
        'copy-js',
        'pull-blockly-translations',
        done => {
            genHtml(true);
            done();
        }
    )
);

gulp.task(
    'build',
    gulp.parallel(
        'bundle-css',
        'bundle-js',
        'build-dev-js',
        'build-dev-static',
        'copy-jquery-img',
        'copy-binary-style-css',
        'copy-binary-style-img',
        'copy-js',
        'pull-blockly-translations'
    )
);
