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
    elevio_script   :
        '<script>!function(e,l,v,i,o,n){e[i]||(e[i]={}),e[i].account_id=n;var g,h;g=l.createElement(v),g.type="text/javascript",g.async=1,g.src=o+n,h=l.getElementsByTagName(v)[0],h.parentNode.insertBefore(g,h);e[i].q=[];e[i].on=function(z,y){e[i].q.push([z,y])}}(window,document,"script","_elev","https://cdn.elev.io/sdk/bootloader/v4/elevio-bootloader.js?cid=","5bbc2de0b7365");</script>',
    gtm_head  : '<!-- Google Tag Manager --> <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({\'gtm.start\': new Date().getTime(),event:\'gtm.js\'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!=\'dataLayer\'?\'&l=\'+l:\'\';j.async=true;j.src= \'https://www.googletagmanager.com/gtm.js?id=\'+i+dl;f.parentNode.insertBefore(j,f); })(window,document,\'script\',\'dataLayer\',\'GTM-P97C2DZ\');</script> <!-- End Google Tag Manager -->',
    gtm_iframe:
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
