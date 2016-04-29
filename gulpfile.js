var gulp = require('gulp'),
		jshint = require('gulp-jshint'),
		gp_rename = require('gulp-rename'),
		gp_uglify = require('gulp-uglify');
		gp_watch = require('gulp-watch'),
		concat = require('gulp-concat-util'),
		vinylPaths = require('vinyl-paths'),
		del = require('del'),
		scanner = require('i18next-scanner'),
		hash = require('sha1'),
		fs = require('fs');


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
		list: ['i18n._', 'i18next._', '_'],
	}, function (key) {
		var value = key;
		var defaultKey = hash(value);
		parser.set(defaultKey, value);
	});

	parser.parseAttrFromString(content, {
		list: ['data-i18n-text'],
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
	return gulp.src(['src/**/*.js', '*.html'])
		.pipe(scanner(options, customTransform))
		.pipe(gulp.dest('./'));
});

gulp.task('vendor', ['lint'], function(){
	return gulp.src(['src/vendor/**/*.js'])
		.pipe(gulp.dest('www/js/vendor'));
});

gulp.task('globals', function(){
	return gulp.src(['src/globals/**/*.js'])
		.pipe(concat('globals.js'))
		.pipe(concat.header('Bot = {};\n'))
		.pipe(gulp.dest('www/js'));
});

gulp.task('definitions', ['globals'], function(){
	return gulp.src(['src/definitions/**/*.js'])
		.pipe(concat('definitions.js'))
		.pipe(concat.header('Bot.Definitions = function Definitions(){\n'))
		.pipe(concat.footer('\n};'))
		.pipe(gulp.dest('www/js'));
});

gulp.task('code_generators', ['definitions'], function(){
	return gulp.src(['src/code_generators/**/*.js'])
		.pipe(concat('code_generators.js'))
		.pipe(concat.header('Bot.CodeGenerators = function CodeGenerators(){\n'))
		.pipe(concat.footer('\n};'))
		.pipe(gulp.dest('www/js'));
});

gulp.task('utils', ['code_generators'], function(){
	return gulp.src(['src/utils/**/*.js'])
		.pipe(concat('utils.js'))
		.pipe(gulp.dest('www/js'));
});

gulp.task('tours', ['utils'], function(){
	return gulp.src(['src/tours/**/*.js'])
		.pipe(concat('tours.js'))
		.pipe(gulp.dest('www/js'));
});

gulp.task('pack', ['vendor', 'tours'], function(){
	return gulp.src(['www/js/{globals,definitions,code_generators,utils,tours}.js'])
		.pipe(vinylPaths(del))
		.pipe(concat('binary-bot.js'))
		.pipe(gulp.dest('www/js'))
		.pipe(gp_rename('binary-bot.min.js'))
		.pipe(gp_uglify())
		.pipe(gulp.dest('www/js'));
});

gulp.task('build', ['pack'], function(){
	return gulp.src(['src/after_all.js'])
		.pipe(gp_rename('after_all.min.js'))
		.pipe(gp_uglify())
		.pipe(gulp.dest('www/js'));
});

gulp.task('watch', ['i18n', 'build'], function () {
	gp_watch(['src/**/*.js', '*.html'], function(){
		gulp.run(['i18n', 'build']);
	});
});

gulp.task('default', ['watch']);
