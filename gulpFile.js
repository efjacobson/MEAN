(function() {
	'use strict';
	
	var gulp = require('gulp'),
		nodemon = require('gulp-nodemon'),
		jshint = require('gulp-jshint'),
		_paths = ['server/**/*.js', 'client/script/**/*.js', '!client/script/angular/*.js'];
		
	//register nodemon task
	gulp.task('nodemon', function() {
		nodemon({
			script: 'server/app.js',
			env: {
				'NODE_ENV': 'development'
			}
		})
			.on('restart');
	});
	
	//copy files for public use
	gulp.task('copy', function() {
		gulp.src('./node_modules/angular/angular.js').pipe(gulp.dest('client/script/angular'));
	});
	
	//lint js files
	gulp.task('lint', function() {
		gulp.src(_paths)
			.pipe(jshint())
			.pipe(jshint.reporter('default'));
	});
	
	//default task
	gulp.task('default', ['lint', 'nodemon', 'copy']);
}());
