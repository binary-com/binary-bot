import gulp from 'gulp';
import fs from 'fs';
import hash from 'sha1';
import scanner from 'i18next-scanner';
import insert from 'gulp-insert';

const options = {
  lngs: ['zh_tw', 'de', 'id', 'zh_cn', 'it', 'vi',
    'pl', 'ru', 'pt', 'es', 'fr', 'en'], // supported languages
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

gulp.task('i18n-xml', ['static'], () => gulp.src('www/xml/*.xml')
  .pipe(scanner(options, customTransform))
  .pipe(gulp.dest('./')));

gulp.task('i18n-html', ['i18n-xml'], () => gulp.src('templates/*.mustache')
  .pipe(scanner(options, customTransform))
  .pipe(gulp.dest('./')));

gulp.task('i18n-js', ['i18n-html'],
  () => gulp.src(['src/**/*.js', '!src/common/translations/*.js'])
  .pipe(scanner(options, customTransform))
  .pipe(gulp.dest('./')));

gulp.task('i18n', ['i18n-js'], () => gulp.src('./src/common/translations/*.js')
  .pipe(insert.wrap('module.exports = ', ';'))
  .pipe(gulp.dest('./src/common/translations')));
