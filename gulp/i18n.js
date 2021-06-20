const del = require('del');
const fs = require('fs');
const gulp = require('gulp');
const hash = require('sha1');
const paths = require('vinyl-paths');
const remoteSrc = require('gulp-remote-src');
const rename = require('gulp-rename');
const scanner = require('i18next-scanner');
require('./static');

const options = {
    lngs    : ['en'], // supported languages
    resource: {
        loadPath  : 'src/common/translations/{{lng}}/i10n.json',
        savePath  : 'src/common/translations/{{lng}}/i10n.json',
        jsonIndent: 2,
    },
};

const customTransform = function _transform(file, enc, done) {
    const parser = this.parser;
    const content = fs.readFileSync(file.path, enc);

    parser.parseFuncFromString(
        content,
        {
            list: ['translate'],
        },
        key => {
            const value = key;
            const defaultKey = hash(value);
            parser.set(defaultKey, value);
        }
    );

    parser.parseAttrFromString(
        content,
        {
            list: ['data-i18n-text', 'i18n-text', 'data-i18n-title'],
        },
        key => {
            const value = key;
            const defaultKey = hash(value);
            parser.set(defaultKey, value);
        }
    );

    done();
};

gulp.task(
    'clean-i18n',
    gulp.series(() => gulp.src(['src/common/translations/en/*']).pipe(paths(del)))
);

gulp.task(
    'i18n-xml',
    gulp.series('clean-i18n', 'static', () =>
        gulp
            .src('www/xml/*.xml')
            .pipe(scanner(options, customTransform))
            .pipe(gulp.dest('./'))
    )
);

gulp.task(
    'i18n-html',
    gulp.series('i18n-xml', () =>
        gulp
            .src('templates/*.mustache')
            .pipe(scanner(options, customTransform))
            .pipe(gulp.dest('./'))
    )
);

gulp.task(
    'i18n',
    gulp.series('i18n-html', () =>
        gulp
            .src(['src/**/*.js', 'src/**/*.jsx', '!src/common/translations/*.js'])
            .pipe(scanner(options, customTransform))
            .pipe(gulp.dest('./'))
    )
);

gulp.task(
    'pull-blockly-translations',
    gulp.series(done => {
        const blocklyLanguages = ['en', 'id', 'it', 'vi', 'pl', 'ru', 'pt', 'es', 'fr', 'zh-hans', 'zh-hant'];
        remoteSrc(
            blocklyLanguages.map(lang => `${lang}.js?_=${Date.now()}`),
            {
                base: 'https://blockly-demo.appspot.com/static/msg/js/',
            }
        )
            .pipe(rename(path => (path.extname = '.js')))
            .pipe(gulp.dest('www/translations'));
        done();
    })
);
