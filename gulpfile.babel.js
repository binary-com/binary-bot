'use strict';
var gulp = require('gulp'),
    ghPages = require('gulp-gh-pages'),
		webpack = require('gulp-webpack'),
		gp_rename = require('gulp-rename'),
		cleanCSS = require('gulp-clean-css'),
    watch = require('gulp-debounced-watch'),
		concat = require('gulp-concat-util'),
		concatCss = require('gulp-concat-css'),
		del = require('del'),
		vinyl_paths = require('vinyl-paths'),
		scanner = require('i18next-scanner'),
		hash = require('sha1'),
		mustache = require('gulp-mustache-plus'),
		rev = require('gulp-rev'),
		fs = require('fs'),
		connect = require('gulp-connect'),
		open = require('gulp-open'),
		through = require('through2'),
		path = require('path'),
		insert = require('gulp-insert'),
		mock = require('binary-mock-websocket'),
		mocha = require('gulp-mocha');

var options = {
	lngs: ['zh_tw', 'de', 'id', 'zh_cn', 'it', 'vi', 'ar', 'pl', 'ru', 'pt', 'es', 'fr', 'en'], // supported languages
	resource: {
		loadPath: 'src/common/translations/{{lng}}.js',
		savePath: 'src/common/translations/{{lng}}.js',
		jsonIndent: 2
	}
};

var customTransform = function _transform(file, enc, done) {
	var parser = this.parser;
	var content = fs.readFileSync(file.path, enc);

	parser.parseFuncFromString(content, {
		list: ['translator.translateText'],
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

var manifest = {};

var parseFilenameWithoutVersion = function parseFilenameWithoutVersion(chunk) {
	var oldFile = path.parse(chunk.revOrigPath);
	var filename = oldFile.base.slice(0, oldFile.base.indexOf('.'));
	var ext = oldFile.base.slice(oldFile.base.indexOf('.'));
	var newFileName = filename + '-' + chunk.revHash + ext;
	return {
		old: oldFile.base,
		new: newFileName
	};
};

var parseFilenameWithVersion = function parseFilenameWithVersion(file) {
	var newFile = path.parse(file.path);
	var ext = newFile.ext;
	var filename = newFile.base.slice(0, newFile.base.indexOf('-'));
	return {
		old: filename + ext,
		new: newFile.base
	};
};

var addToManifest = function addToManifest(chunk, enc, cb) {
	var map;
	if ( !chunk.hasOwnProperty('revHash') ) {
		map = parseFilenameWithVersion(chunk);
	} else {
		map = parseFilenameWithoutVersion(chunk);
	}
	manifest[map.old] = map.new;
	return cb(null, chunk);
};

gulp.task('clean-css', function() {
	return gulp.src('./www/css/*-*.css')
		.pipe(vinyl_paths(del));
});

gulp.task('static-css', ['clean-css'], function() {
	return gulp.src('static/css/*')
		.pipe(rev())
		.pipe(through.obj(addToManifest))
		.pipe(gulp.dest('./www/css'));
});

gulp.task('static', ['static-css'], function() {
	return gulp.src(['static/**', '!static/css/*'])
		.pipe(gulp.dest('./www'));
});

gulp.task('test', function() {
    return gulp.src(['./src/**/__tests__/*.js'])
			.pipe(mocha({
        require: ['./src/common/mochaHelper.js'],
				reporter: 'dot'
			}));
});

gulp.task('i18n-xml', ['static'], function () {
	return gulp.src('www/xml/*.xml')
		.pipe(scanner(options, customTransform))
		.pipe(gulp.dest('./'));
});

gulp.task('i18n-html', ['i18n-xml'], function () {
	return gulp.src('templates/*.mustache')
		.pipe(scanner(options, customTransform))
		.pipe(gulp.dest('./'));
});

gulp.task('i18n-js', ['i18n-html'], function () {
	return gulp.src(['src/**/*.js', '!src/common/translations/*.js'])
		.pipe(scanner(options, customTransform))
		.pipe(gulp.dest('./'));
});

gulp.task('i18n', ['i18n-js'], function () {
	return gulp.src('./src/common/translations/*.js')
		.pipe(insert.wrap('module.exports = ', ';'))
		.pipe(gulp.dest('./src/common/translations'));
});

gulp.task('blockly-msg', ['static'], function(){
	return gulp.src('node_modules/blockly/msg/**')
		.pipe(gulp.dest('www/js/blockly/msg'));
});

gulp.task('blockly-media', ['static'], function(){
	return gulp.src('node_modules/blockly/media/**')
		.pipe(gulp.dest('www/js/blockly/media'));
});

gulp.task('blockly-js', ['static'], function(){
	return gulp.src([
		'node_modules/blockly/blockly_compressed.js', 
		'node_modules/blockly/blocks_compressed.js',
		'node_modules/blockly/javascript_compressed.js'
		])
		.pipe(concat('blockly.js'))
		.pipe(gulp.dest('www/js/blockly'));
});

gulp.task('blockly', ['blockly-msg', 'blockly-media', 'blockly-js'], function () {
});

gulp.task('bundle', ['blockly'], function () {
	return gulp.src([
		'./node_modules/jquery/dist/jquery.min.js', 
		'./node_modules/underscore/underscore-min.js', 
		'./node_modules/backbone/backbone-min.js', 
		'./node_modules/tourist/tourist.min.js',
		'./node_modules/notifyjs-browser/dist/notify.js'
		])
		.pipe(concat('bundle.js'))
		.pipe(gulp.dest('www/js/'));
});

gulp.task('clean-webpack', function() {
	return gulp.src(['./www/js/*-*.{js,map}'])
		.pipe(vinyl_paths(del));
});

gulp.task('webpack', ['clean-webpack', 'test', 'bundle'], function(){
	return webpack(require('./webpack.config.js'))
		.pipe(gulp.dest('www/js'));
});

gulp.task('revision', ['webpack'], function(){
	return gulp.src(['./www/js/*.js'])
    .pipe(rev())
		.pipe(through.obj(addToManifest))
		.pipe(gulp.dest('www/js'));
});

gulp.task('pack-css', ['static'], function(){
	return gulp.src(['node_modules/{bootstrap/dist/css/bootstrap.min,tourist/tourist}.css'])
		.pipe(concatCss('bundle.css'))
		.pipe(rev())
		.pipe(through.obj(addToManifest))
		.pipe(gulp.dest('www/css'));
});

gulp.task('pack-css-min', function(){
	return gulp.src('www/css/bundle-*.css')
		.pipe(gp_rename('bundle.min.css'))
		.pipe(cleanCSS())
		.pipe(rev())
		.pipe(through.obj(addToManifest))
		.pipe(gulp.dest('www/css'));
});

gulp.task('mustache-dev', ['static', 'revision', 'pack-css'], function(){
	return gulp.src('templates/*.mustache')
		.pipe(mustache({},{},{
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
		.pipe(gulp.dest('www'));
});

gulp.task('mustache-min', ['static', 'revision', 'pack-css-min'], function(){
	return gulp.src('templates/*.mustache')
		.pipe(mustache({},{},{
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
		.pipe(gulp.dest('www'));
});

gulp.task('build', ['pack-css', 'revision', 'mustache-dev'], function () {
	gulp.src('www/**')
		.pipe(connect.reload());
});

gulp.task('build-min', ['build', 'pack-css-min', 'mustache-min'], function () {
	gulp.src('www/**')
		.pipe(connect.reload());
});

gulp.task('connect', function () {
	connect.server({
		root: 'www',
		port: 8080,
		livereload: true
	});
});

gulp.task('open', function(){
	gulp.src('www/index.html')
		.pipe(open({uri: 'http://localhost:8080/'}));
});

gulp.task('serve', ['open', 'connect'], function () {
	watch(['www/*.html'], {debounceTimeout: 1000})
		.pipe(connect.reload());
});

gulp.task('deploy', ['build-min'], function () {
	return gulp.src(['404.md', 'LICENSE', 'README.md', 'CNAME', './www/**', './beta/**'])
		.pipe(ghPages());
});

gulp.task('test-deploy', ['build-min', 'serve'], function () {
});

gulp.task('watch', ['build', 'serve'], function () {
	watch(['static/**', 'src/**/*.js', 'templates/**/*.mustache', '!./src/common/translations/*.js'], {debounceTimeout: 15000}, function(){
		gulp.run(['build']);
  });
});

gulp.task('build-mock-testing', function() {
	return gulp.src('./src/common/calls.js', {read: false})
		.pipe(mock)
		.pipe(gulp.dest('./src/common/mock'));
});

gulp.task('build-mock-debug', function() {
	return gulp.src('./src/common/debugCalls.js', {read: false})
		.pipe(mock())
		.pipe(gulp.dest('./src/common/debugMock'));
});

gulp.task('default', ['watch']);
