var gulp = require('gulp');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var connect = require('gulp-connect');

gulp.task('js',function(){
	gulp.src('./js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('./dist/js'))
	.pipe(connect.reload());
});

gulp.task('sass:app',function(){
	gulp.src('./sass/app.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('./dist/css'))
	.pipe(connect.reload());
});	

gulp.task('imgMin',function(){
	gulp.src('./imgs/works/*')
	.pipe(imagemin())
	.pipe(gulp.dest('./dist/imgs/works'));
});	


gulp.task('watch',function(){
	gulp.watch('./js/*.js',['js']);
	gulp.watch('./sass/*.scss',['sass:app'])
	.pipe(connect.reload());
});

gulp.task('connect', function() {
  connect.server({
  	port:4000,
    livereload: true
  });
});


gulp.task('default',['connect','watch']);