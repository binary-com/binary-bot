import gulp from 'gulp';
import ghPages from 'gulp-gh-pages';
import webpack from 'gulp-webpack';
import gp_rename from 'gulp-rename';
import cleanCSS from 'gulp-clean-css';
import watch from 'gulp-debounced-watch';
import concat from 'gulp-concat-util';
import concatCss from 'gulp-concat-css';
import del from 'del';
import vinyl_paths from 'vinyl-paths';
import scanner from 'i18next-scanner';
import hash from 'sha1';
import mustache from 'gulp-mustache-plus';
import rev from 'gulp-rev';
import fs from 'fs';
import connect from 'gulp-connect';
import open from 'gulp-open';
import through from 'through2';
import path from 'path';
import insert from 'gulp-insert';
import mock from 'binary-mock-websocket';
import eslint from 'gulp-eslint';
import mocha from 'gulp-mocha';

const options = {
  lngs: ['zh_tw', 'de', 'id', 'zh_cn', 'it', 'vi', 'ar', 'pl', 'ru', 'pt', 'es', 'fr', 'en'], // supported languages
  resource: {
    loadPath: 'src/common/translations/{{lng}}.js',
    savePath: 'src/common/translations/{{lng}}.js',
    jsonIndent: 2,
  },
};

const customTransform = function _transform(file, enc, done) {
  const parser = this.parser;
  const content = fs.readFileSync(file.path, enc);

  parser.parseFuncFromString(content, {
    list: ['translator.translateText'],
  }, (key) => {
    const value = key;
    const defaultKey = hash(value);
    parser.set(defaultKey, value);
  });

  parser.parseAttrFromString(content, {
    list: ['data-i18n-text', 'i18n-text'],
  }, (key) => {
    const value = key;
    const defaultKey = hash(value);
    parser.set(defaultKey, value);
  });

  done();
};

const manifest = {};

const parseFilenameWithoutVersion = function parseFilenameWithoutVersion(chunk) {
  const oldFile = path.parse(chunk.revOrigPath);
  const filename = oldFile.base.slice(0, oldFile.base.indexOf('.'));
  const ext = oldFile.base.slice(oldFile.base.indexOf('.'));
  const newFileName = filename + '-' + chunk.revHash + ext;
  return {
    old: oldFile.base,
    new: newFileName,
  };
};

const parseFilenameWithVersion = function parseFilenameWithVersion(file) {
  const newFile = path.parse(file.path);
  const ext = newFile.ext;
  const filename = newFile.base.slice(0, newFile.base.indexOf('-'));
  return {
    old: filename + ext,
    new: newFile.base,
  };
};

const addToManifest = function addToManifest(chunk, enc, cb) {
  let map;
  if (!('revHash' in chunk)) {
    map = parseFilenameWithVersion(chunk);
  } else {
    map = parseFilenameWithoutVersion(chunk);
  }
  manifest[map.old] = map.new;
  return cb(null, chunk);
};

gulp.task('clean-css', () => gulp.src('./www/css/*-*.css')
  .pipe(vinyl_paths(del)));

gulp.task('static-css', ['clean-css'], () => gulp.src('static/css/*')
  .pipe(rev())
  .pipe(through.obj(addToManifest))
  .pipe(gulp.dest('./www/css')));

gulp.task('static', ['static-css'], () => gulp.src(['static/**', '!static/css/*'])
  .pipe(gulp.dest('./www')));


gulp.task('eslint', () => gulp.src(['./src/**/*.js', '!./src/common/mock/*', '!./src/calls.js'])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError()));

gulp.task('test', ['eslint'], () => gulp.src(['./src/**/__tests__/*.js'])
  .pipe(mocha({
    require: ['./src/common/mochaHelper.js'],
    reporter: 'dot',
  })));

gulp.task('i18n-xml', ['static'], () => gulp.src('www/xml/*.xml')
  .pipe(scanner(options, customTransform))
  .pipe(gulp.dest('./')));

gulp.task('i18n-html', ['i18n-xml'], () => gulp.src('templates/*.mustache')
  .pipe(scanner(options, customTransform))
  .pipe(gulp.dest('./')));

gulp.task('i18n-js', ['i18n-html'], () => gulp.src(['src/**/*.js', '!src/common/translations/*.js'])
  .pipe(scanner(options, customTransform))
  .pipe(gulp.dest('./')));

gulp.task('i18n', ['i18n-js'], () => gulp.src('./src/common/translations/*.js')
  .pipe(insert.wrap('module.exports = ', ';'))
  .pipe(gulp.dest('./src/common/translations')));

gulp.task('blockly-msg', ['static'], () => gulp.src('node_modules/blockly/msg/**')
  .pipe(gulp.dest('www/js/blockly/msg')));

gulp.task('blockly-media', ['static'], () => gulp.src('node_modules/blockly/media/**')
  .pipe(gulp.dest('www/js/blockly/media')));

gulp.task('blockly-js', ['static'], () => gulp.src([
  'node_modules/blockly/blockly_compressed.js',
  'node_modules/blockly/blocks_compressed.js',
  'node_modules/blockly/javascript_compressed.js',
])
  .pipe(concat('blockly.js'))
  .pipe(gulp.dest('www/js/blockly')));

gulp.task('blockly', ['blockly-msg', 'blockly-media', 'blockly-js'], () => {
});

gulp.task('bundle', ['blockly'], () => gulp.src([
  './node_modules/jquery/dist/jquery.min.js',
  './node_modules/underscore/underscore-min.js',
  './node_modules/backbone/backbone-min.js',
  './node_modules/tourist/tourist.min.js',
  './node_modules/notifyjs-browser/dist/notify.js',
])
  .pipe(concat('bundle.js'))
  .pipe(gulp.dest('www/js/')));

gulp.task('clean-webpack', () => gulp.src(['./www/js/*-*.{js,map}'])
  .pipe(vinyl_paths(del)));

gulp.task('webpack-dev', ['clean-webpack', 'test', 'bundle'], () => {
  process.env.NODE_ENV = 'development';
  return webpack(require('./webpack.config')) // eslint-disable-line global-require
    .pipe(gulp.dest('www/js'));
});

gulp.task('webpack-prod', ['clean-webpack', 'test', 'bundle'], () => {
  process.env.NODE_ENV = 'production';
  return webpack(require('./webpack.config')) // eslint-disable-line global-require
    .pipe(gulp.dest('www/js'));
});

gulp.task('revision-dev', ['webpack-dev'], () => gulp.src(['./www/js/*.js'])
  .pipe(rev())
  .pipe(through.obj(addToManifest))
  .pipe(gulp.dest('www/js')));

gulp.task('revision-prod', ['webpack-prod'], () => gulp.src(['./www/js/*.js'])
  .pipe(rev())
  .pipe(through.obj(addToManifest))
  .pipe(gulp.dest('www/js')));

gulp.task('pack-css', ['static'], () => gulp.src(['node_modules/{bootstrap/dist/css/bootstrap.min,tourist/tourist}.css'])
  .pipe(concatCss('bundle.css'))
  .pipe(rev())
  .pipe(through.obj(addToManifest))
  .pipe(gulp.dest('www/css')));

gulp.task('pack-css-min', ['pack-css'], () => gulp.src('www/css/bundle-*.css')
  .pipe(gp_rename('bundle.min.css'))
  .pipe(cleanCSS())
  .pipe(rev())
  .pipe(through.obj(addToManifest))
  .pipe(gulp.dest('www/css')));

gulp.task('mustache-dev', ['static', 'revision-dev', 'pack-css'], () => gulp.src('templates/*.mustache')
  .pipe(mustache({}, {}, {
    index: '<script src="js/' + manifest['index.js'] + '"></script>',
    bot: '<script src="js/' + manifest['bot.js'] + '"></script>',
    bundle_css: '<link href="css/' + manifest['bundle.css'] + '" rel="stylesheet" />',
    main_css: '<link href="css/' + manifest['main.css'] + '" rel="stylesheet" />',
    bot_css: '<link href="css/' + manifest['bot.css'] + '" rel="stylesheet" />',
    fontello_css: '<link href="css/' + manifest['fontello.css'] + '" rel="stylesheet" />',
    head: 'templates/partials/head.mustache',
    security: 'templates/partials/security.mustache',
    language: 'templates/partials/language.mustache',
  }))
  .pipe(gulp.dest('www')));

gulp.task('mustache-min', ['static', 'revision-prod', 'pack-css-min'], () => gulp.src('templates/*.mustache')
  .pipe(mustache({}, {}, {
    index: '<script src="js/' + manifest['index.min.js'] + '"></script>',
    bot: '<script src="js/' + manifest['bot.min.js'] + '"></script>',
    bundle_css: '<link href="css/' + manifest['bundle.min.css'] + '" rel="stylesheet" />',
    main_css: '<link href="css/' + manifest['main.css'] + '" rel="stylesheet" />',
    bot_css: '<link href="css/' + manifest['bot.css'] + '" rel="stylesheet" />',
    fontello_css: '<link href="css/' + manifest['fontello.css'] + '" rel="stylesheet" />',
    head: 'templates/partials/head.mustache',
    security: 'templates/partials/security.mustache',
    language: 'templates/partials/language.mustache',
  }))
  .pipe(gulp.dest('www')));

gulp.task('build', ['pack-css', 'revision-dev', 'mustache-dev'], () => gulp.src('www/**')
    .pipe(connect.reload()));

gulp.task('build-min', ['pack-css-min', 'revision-prod', 'mustache-min'], () => gulp.src('www/**')
    .pipe(connect.reload()));

gulp.task('connect', () => connect.server({
  root: 'www',
  port: 8080,
  livereload: true,
}));

gulp.task('open', () => gulp.src('www/index.html')
  .pipe(open({
    uri: 'http://localhost:8080/',
  })));

gulp.task('serve', ['open', 'connect'], () => watch(['www/*.html'], {
  debounceTimeout: 1000,
})
  .pipe(connect.reload()));

gulp.task('deploy', ['build-min'], () => gulp.src(['404.md', 'LICENSE', 'README.md', 'CNAME', './www/**', './beta/**'])
  .pipe(ghPages()));

gulp.task('test-deploy', ['build-min', 'serve'], () => {
});

gulp.task('watch', ['build', 'serve'], () => watch(['static/**', 'src/**/*.js', 'templates/**/*.mustache', '!./src/common/translations/*.js'], {
  debounceTimeout: 15000,
}, () => gulp.run(['build'])));

gulp.task('build-mock-testing', () => gulp.src('./src/common/calls.js', {
  read: false,
})
  .pipe(mock)
  .pipe(gulp.dest('./src/common/mock')));

gulp.task('build-mock-debug', () => gulp.src('./src/common/debugCalls.js', {
  read: false,
})
  .pipe(mock())
  .pipe(gulp.dest('./src/common/debugMock')));

gulp.task('default', ['watch']);
