var gulp = require('gulp');
var watch = require('gulp-watch');
var scanner = require('i18next-scanner');
var hash = require('sha1');
var fs = require('fs');

var options = {
	attr: {
		list: ['data-i18n'],
		extensions: ['.html', '.htm']
	},
	func: {
		list: ['i18next.t', 'i18n.t', 't'],
		extensions: ['.js', '.jsx']
	},
	lngs: ['en', 'id'], // supported languages
	resource: {
		loadPath: 'www/i18n/{{lng}}.json',
		savePath: 'www/i18n/{{lng}}.json',
		jsonIndent: 2
	}
}

var customTransform = function _transform(file, enc, done) {
	var parser = this.parser;
	var content = fs.readFileSync(file.path, enc);

	parser.parseFuncFromString(content, {
		list: ['i18n._', 'i18next._', '_']
	}, function (key) {
		var value = key;
		var defaultKey = hash(value);
		parser.set(defaultKey, value);
	});

	done();
};

gulp.task('i18n', function () {
	return gulp.src(['www/js/**/*.js', '*.html'])
		.pipe(scanner(options, customTransform))
		.pipe(gulp.dest('./'));
});

gulp.task('watch', function () {
	watch(['www/js/**/*.js', '*.html'], function(){
		gulp.run(['i18n']);
	});
});
