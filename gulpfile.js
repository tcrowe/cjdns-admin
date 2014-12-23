
var gulp = require('gulp'),
	mocha = require('gulp-mocha'),
	jshint = require('gulp-jshint'),
	config;

config = {
	js: [
		'lib/**/*.js',
		'test/**/*.js'
	],
	tests: [
		'test/utilities.js',
		'test/admin.js'
	],
	modules: ['lib/**/*.js']
};

// run tests with mocha
// cmd: gulp test
gulp.task('test', function() {
	return gulp.src(config.tests, {
			read: false
		})
		.pipe(mocha({
			bail: true,
			timeout: 3000
		}));
});

// check js code quality
// cmd: gulp jshint
gulp.task('jshint', function() {
	return gulp.src(config.js)
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

// watch for changes
gulp.task('watch', function() {
	gulp.watch(config.js, ['jshint', 'test']);
});

// run test, jshint, and wait for changes
// cmd: gulp
gulp.task('default', ['test', 'jshint', 'watch']);

