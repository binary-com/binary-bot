import gulp from 'gulp';
import fs from 'fs';
import hash from 'sha1';
import scanner from 'i18next-scanner';

const options = {
  lngs: ['en'], // supported languages
  resource: {
    loadPath: 'src/common/translations/{{lng}}/i10n.json',
    savePath: 'src/common/translations/{{lng}}/i10n.json',
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

gulp.task('i18n', ['i18n-html'],
  () => gulp.src(['src/**/*.js', '!src/common/translations/*.js'])
  .pipe(scanner(options, customTransform))
  .pipe(gulp.dest('./')));
