var gulp = require('gulp'),
		jshint = require('gulp-jshint'),
		webpack = require('gulp-webpack'),
		gp_rename = require('gulp-rename'),
		gp_uglify = require('gulp-uglify'),
		gp_watch = require('gulp-watch'),
		concat = require('gulp-concat-util'),
		vinylPaths = require('vinyl-paths'),
		del = require('del'),
		scanner = require('i18next-scanner'),
		hash = require('sha1'),
		fs = require('fs');

var options = {
	attr: {
		list: ['data-i18n', 'i18n'],
		extensions: ['.html', '.htm']
	},
	func: {
		list: ['i18next.t', 'i18n.t', 't'],
		extensions: ['.js', '.jsx']
	},
	lngs: ['zh_tw', 'de', 'id', 'zh_cn', 'it', 'vi', 'ar', 'pl', 'ru', 'pt', 'es', 'fr', 'en'], // supported languages
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
		list: ['i18n._', 'i18next._', '_'],
	}, function (key) {
		var value = key;
		var defaultKey = hash(value);
		parser.set(defaultKey, value);
	});

	parser.parseAttrFromString(content, {
		list: ['data-i18n-text', 'i18n-text'],
	}, function (key) {
		var value = key;
		var defaultKey = hash(value);
		parser.set(defaultKey, value);
	});

	done();
};

gulp.task('lint', function() {
	return gulp.src(['./src/**/*.js', "!./src/**/*.min.js"])
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('clean_i18n', function () {
	return del(['www/i18n/*.json']);
});

gulp.task('i18n', ['clean_i18n'], function () {
	return gulp.src(['src/**/*.js', 'www/xml/*.xml', '*.html'])
		.pipe(scanner(options, customTransform))
		.pipe(gulp.dest('./'));
});

gulp.task('vendor', ['lint'], function(){
	return gulp.src(['src/vendor/**/*.js'])
		.pipe(gulp.dest('www/js/vendor'));
});

gulp.task('webpack', ['vendor'], function(){
	return webpack(require('./webpack.config.js'))
		.pipe(gulp.dest('www/js'));
});

gulp.task('build-bot', ['webpack'], function(){
	return gulp.src(['www/js/bot.js'])
		.pipe(gp_rename('bot.min.js'))
		.pipe(gp_uglify())
		.pipe(gulp.dest('www/js'));
});

gulp.task('build-index', ['webpack'], function(){
	return gulp.src(['www/js/index.js'])
		.pipe(gp_rename('index.min.js'))
		.pipe(gp_uglify())
		.pipe(gulp.dest('www/js'));
});

gulp.task('build_all', ['i18n', 'build-bot', 'build-index'], function () {
});

gulp.task('watch', ['build_all'], function () {
	gp_watch(['src/**/*.js', 'www/xml/*.xml', '*.html', '*.js'], function(){
		gulp.run(['build_all']);
	});
});

gulp.task('default', ['watch']);
