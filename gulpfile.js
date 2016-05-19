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
		sum = require('hash-sum'),
		mustache = require('gulp-mustache-plus'),
		rev = require('gulp-rev'),
		fs = require('fs');

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

gulp.task('clean-css', function() {
	return gulp.src('./www/css/*-*.css')
		.pipe(vinyl_paths(del));
});

gulp.task('static-css', ['clean-css'], function() {
	return gulp.src('static/css/*')
		.pipe(rev())
		.pipe(gulp.dest('./www/css'))
		.pipe(rev.manifest({base: './', merge: true}))
		.pipe(gulp.dest('./'));
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
		.pipe(gulp.dest('www/js'))
		.pipe(rev.manifest({base: './', merge: true}))
		.pipe(gulp.dest('./'));
});

gulp.task('build-bot-min', ['build'], function(){
	return gulp.src(['www/js/bot-*.js'])
		.pipe(gp_rename('bot.min.js'))
		.pipe(gp_uglify())
		.pipe(rev())
		.pipe(gulp.dest('www/js'))
		.pipe(rev.manifest({base: './', merge: true}))
		.pipe(gulp.dest('./'));
});

gulp.task('build-index-min', ['build'], function(){
	return gulp.src(['www/js/index-*.js'])
		.pipe(gp_rename('index.min.js'))
		.pipe(gp_uglify())
		.pipe(rev())
		.pipe(gulp.dest('www/js'))
		.pipe(rev.manifest({base: './', merge: true}))
		.pipe(gulp.dest('./'));
});

gulp.task('pack-css', ['static'], function(){
	return gulp.src(['node_modules/{bootstrap/dist/css/bootstrap.min,tourist/tourist}.css'])
		.pipe(concatCss('bundle.css'))
		.pipe(rev())
		.pipe(gulp.dest('www/css'))
		.pipe(rev.manifest({base: './', merge: true}))
		.pipe(gulp.dest('./'));
});

gulp.task('pack-css-min', ['build'], function(){
	return gulp.src('www/css/bundle-*.css')
		.pipe(gp_rename('bundle.min.css'))
		.pipe(cleanCSS())
		.pipe(rev())
		.pipe(gulp.dest('www/css'))
		.pipe(rev.manifest({merge: true}))
		.pipe(gulp.dest('./'));
});

gulp.task('mustache-dev', ['static'], function(){
	var rev_manifest = require('./rev-manifest');
	return gulp.src('templates/*.mustache')
		.pipe(mustache({},{},{
			index: '<script src="js/' + rev_manifest['index.js'] + '"></script>',
			bot: '<script src="js/' + rev_manifest['bot.js'] + '"></script>',
			bundle: '<link href="css/' + rev_manifest['bundle.css'] + '" rel="stylesheet" />',
			main_css: '<link href="css/' + rev_manifest['main.css'] + '" rel="stylesheet" />',
			bot_css: '<link href="css/' + rev_manifest['bot.css'] + '" rel="stylesheet" />',
		}))
		.pipe(gulp.dest('www'));
});

gulp.task('mustache-min', ['build'], function(){
	var rev_manifest = require('./rev-manifest');
	return gulp.src('templates/*.mustache')
		.pipe(mustache({},{},{
			index: '<script src="js/' + rev_manifest['index.min.js'] + '"></script>',
			bot: '<script src="js/' + rev_manifest['bot.min.js'] + '"></script>',
			bundle_css: '<link href="css/' + rev_manifest['bundle.min.css'] + '" rel="stylesheet" />',
			main_css: '<link href="css/' + rev_manifest['main.css'] + '" rel="stylesheet" />',
			bot_css: '<link href="css/' + rev_manifest['bot.css'] + '" rel="stylesheet" />',
		}))
		.pipe(gulp.dest('www'));
});

gulp.task('build', ['i18n', 'pack-css', 'webpack', 'mustache-dev'], function () {
});

gulp.task('build-min', ['build-bot-min', 'build-index-min', 'pack-css-min', 'mustache-min'], function () {
});

gulp.task('deploy', ['build-min'], function () {
	return gulp.src(['LICENSE', 'README.md', 'CNAME', './www/**'])
		.pipe(ghPages());
});

gulp.task('watch', ['build'], function () {
	gp_watch(['static/**', 'src/**/*.js', 'templates/**/*.mustache'], function(){
		gulp.run(['build']);
	});
});

gulp.task('default', ['watch']);
