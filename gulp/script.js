var Gulp = require('gulp');
var Jshint = require('gulp-jshint');
var Concat = require('gulp-concat');
var Uglify = require('gulp-uglify');
var Rename = require('gulp-rename');

Gulp.task('scripts', function () {

    return Gulp.src([
        // 'assets/js/fontdeck.js',
        ])
        .pipe(Concat('frame.js'))
        .pipe(Gulp.dest('public/layouts'))
        .pipe(Rename('frame.min.js'))
        .pipe(Uglify())
        .pipe(Gulp.dest('public/layouts'));
});
