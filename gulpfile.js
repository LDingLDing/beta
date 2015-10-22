var gulp = require('gulp');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');

gulp.task('js',function(){
	gulp.src('./js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('./dist/js'));
});

gulp.task('sass:app',function(){
	gulp.src('./sass/app.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('./dist/css'));
});	

gulp.task('imgMin',function(){
	gulp.src('./imgs/*')
	.pipe(imagemin())
	.pipe(gulp.dest('./dist/imgs'));
});	


gulp.task('watch',function(){
	gulp.watch('./js/*.js',['js']);
	gulp.watch('./sass/*.scss',['sass:app']);
});

gulp.task('default',['watch']);