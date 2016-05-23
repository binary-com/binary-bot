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
		vinyl_paths = require('vinyl-paths'),
		scanner = require('i18next-scanner'),
		hash = require('sha1'),
		mustache = require('gulp-mustache-plus'),
		rev = require('gulp-rev'),
		fs = require('fs')
		connect = require('gulp-connect')
		open = require('gulp-open')
		through = require('through2')
		path = require('path')
		;

var options = {
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

var manifest = {};
var addToManifest = function addToManifest(chunk, enc, cb) {
	var oldFile = path.parse(chunk.revOrigPath);
	var filename = oldFile.base.slice(0, oldFile.base.indexOf('.'));
	var ext = oldFile.base.slice(oldFile.base.indexOf('.'));
	var newFileName = filename + '-' + chunk.revHash + ext;
	manifest[oldFile.base] = newFileName;
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

gulp.task('lint', function() {
	return gulp.src(['./src/**/*.js', '!./src/**/*.min.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
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

gulp.task('i18n', ['i18n-html'], function () {
	return gulp.src('src/**/*.js')
		.pipe(scanner(options, customTransform))
		.pipe(gulp.dest('./'));
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
	return gulp.src(['node_modules/blockly/{blockly_compressed,blocks_compressed,javascript_compressed}.js'])
		.pipe(concat('blockly.js'))
		.pipe(gulp.dest('www/js/blockly'));
});

gulp.task('blockly', ['blockly-msg', 'blockly-media', 'blockly-js'], function () {
});

gulp.task('clean-webpack', function() {
	return gulp.src(['./www/js/*-*.js'])
		.pipe(vinyl_paths(del));
});

gulp.task('webpack', ['clean-webpack', 'lint', 'blockly'], function(){
	return webpack(require('./webpack.config.js'))
		.pipe(rev())
		.pipe(through.obj(addToManifest))
		.pipe(gulp.dest('www/js'));
});

gulp.task('build-bot-min', ['build'], function(){
	return gulp.src(['www/js/bot-*.js'])
		.pipe(gp_rename('bot.min.js'))
		.pipe(gp_uglify())
		.pipe(rev())
		.pipe(through.obj(addToManifest))
		.pipe(gulp.dest('www/js'));
});

gulp.task('build-index-min', ['build'], function(){
	return gulp.src(['www/js/index-*.js'])
		.pipe(gp_rename('index.min.js'))
		.pipe(gp_uglify())
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

gulp.task('pack-css-min', ['build'], function(){
	return gulp.src('www/css/bundle-*.css')
		.pipe(gp_rename('bundle.min.css'))
		.pipe(cleanCSS())
		.pipe(rev())
		.pipe(through.obj(addToManifest))
		.pipe(gulp.dest('www/css'));
});

gulp.task('mustache-dev', ['static', 'webpack', 'pack-css'], function(){
	return gulp.src('templates/*.mustache')
		.pipe(mustache({},{},{
			index: '<script src="js/' + manifest['index.js'] + '"></script>',
			bot: '<script src="js/' + manifest['bot.js'] + '"></script>',
			bundle_css: '<link href="css/' + manifest['bundle.css'] + '" rel="stylesheet" />',
			main_css: '<link href="css/' + manifest['main.css'] + '" rel="stylesheet" />',
			bot_css: '<link href="css/' + manifest['bot.css'] + '" rel="stylesheet" />',
		}))
		.pipe(gulp.dest('www'));
});

gulp.task('mustache-min', ['static', 'pack-css-min', 'build-bot-min', 'build-index-min'], function(){
	return gulp.src('templates/*.mustache')
		.pipe(mustache({},{},{
			index: '<script src="js/' + manifest['index.min.js'] + '"></script>',
			bot: '<script src="js/' + manifest['bot.min.js'] + '"></script>',
			bundle_css: '<link href="css/' + manifest['bundle.min.css'] + '" rel="stylesheet" />',
			main_css: '<link href="css/' + manifest['main.css'] + '" rel="stylesheet" />',
			bot_css: '<link href="css/' + manifest['bot.css'] + '" rel="stylesheet" />',
		}))
		.pipe(gulp.dest('www'));
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

gulp.task('build', ['i18n', 'pack-css', 'webpack', 'mustache-dev'], function () {
	gulp.src('www/**')
		.pipe(connect.reload());
});

gulp.task('build-min', ['build-bot-min', 'build-index-min', 'pack-css-min', 'mustache-min'], function () {
});

gulp.task('deploy', ['build-min'], function () {
	return gulp.src(['404.md', 'LICENSE', 'README.md', 'CNAME', './www/**'])
		.pipe(ghPages());
});

gulp.task('serve', ['open', 'connect'], function () {
	gp_watch(['www/*.html'])
		.pipe(connect.reload());
});

gulp.task('test-deploy', ['deploy', 'serve'], function () {
});

gulp.task('watch', ['build', 'serve'], function () {
	gp_watch(['static/**', 'src/**/*.js', 'templates/**/*.mustache'], function(){
		gulp.run(['build']);
	});
});

gulp.task('default', ['watch']);
