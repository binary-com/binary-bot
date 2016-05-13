var gulp = require('gulp'),
		ghPages = require('gulp-gh-pages'),
		jshint = require('gulp-jshint'),
		webpack = require('gulp-webpack'),
		gp_rename = require('gulp-rename'),
		gp_uglify = require('gulp-uglify'),
		cleanCSS = require('gulp-clean-css'),
		gp_watch = require('gulp-watch'),
		concat = require('gulp-concat-util'),
		concatCss = require('gulp-concat-css'),
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

gulp.task('blockly-msg', function(){
	return gulp.src('node_modules/blockly/msg/**/*')
		.pipe(gulp.dest('www/js/blockly/msg'));
});

gulp.task('blockly-media', function(){
	return gulp.src('node_modules/blockly/media/*')
		.pipe(gulp.dest('www/js/blockly/media'));
});

gulp.task('blockly-js', function(){
	return gulp.src(['node_modules/blockly/{blockly_compressed,blocks_compressed,javascript_compressed}.js'])
		.pipe(concat('blockly.js'))
		.pipe(gulp.dest('www/js/blockly'));
});

gulp.task('blockly-js-min', function(){
	return gulp.src('www/js/blockly/blockly.js')
		.pipe(gp_rename('blockly.min.js'))
		.pipe(gp_uglify())
		.pipe(gulp.dest('www/js/blockly'));
});

gulp.task('blockly', ['blockly-msg', 'blockly-media', 'blockly-js'], function () {
});

gulp.task('webpack', ['lint', 'blockly'], function(){
	return webpack(require('./webpack.config.js'))
		.pipe(gulp.dest('www/js'));
});

gulp.task('build-bot-min', ['webpack'], function(){
	return gulp.src(['www/js/bot.js'])
		.pipe(gp_rename('bot.min.js'))
		.pipe(gp_uglify())
		.pipe(gulp.dest('www/js'));
});

gulp.task('build-index-min', ['webpack'], function(){
	return gulp.src(['www/js/index.js'])
		.pipe(gp_rename('index.min.js'))
		.pipe(gp_uglify())
		.pipe(gulp.dest('www/js'));
});

gulp.task('pack-css', function(){
	return gulp.src(['node_modules/{bootstrap/dist/css/bootstrap.min,tourist/tourist}.css'])
		.pipe(concatCss('bundle.css'))
		.pipe(gulp.dest('www/css'));
});

gulp.task('pack-css-min', function(){
	return gulp.src('www/css/bundle.css')
		.pipe(gp_rename('bundle.min.css'))
		.pipe(cleanCSS())
		.pipe(gulp.dest('www/css'));
});

gulp.task('build', ['i18n', 'pack-css', 'webpack'], function () {
});

gulp.task('build-min', ['build', 'build-bot-min', 'build-index-min', 'pack-css-min'], function () {
});

gulp.task('deploy', ['build-min'], function () {
	return gulp.src(['*.html', './www/**/*'])
		.pipe(ghPages());
});

gulp.task('watch', ['build'], function () {
	gp_watch(['src/**/*.js', 'www/xml/*.xml', '*.html'], function(){
		gulp.run(['build']);
	});
});

gulp.task('default', ['watch']);
