// Include gulp
var Gulp = require('gulp');

// Include Our Plugins
var Jshint = require('gulp-jshint');
var Sass = require('gulp-sass');
var Concat = require('gulp-concat');
var Uglify = require('gulp-uglify');
var Rename = require('gulp-rename');

// Lint Task
Gulp.task('lint', function () {

    return Gulp.src('js/*.js')
        .pipe(Jshint())
        .pipe(Jshint.reporter('default'));
});

// Compile Our sass
Gulp.task('sass', function () {

    return Gulp.src([
        'assets/scss/font-awesome-4.3.0/scss/font-awesome.scss',
        'assets/scss/build.scss'
        ])
        .pipe(Sass())
        .pipe(Concat('frame.css'))
        .pipe(Gulp.dest('public/layouts'));
});

// Concatenate & Minify JS
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

// Watch Files For Changes
Gulp.task('watch', function () {

    Gulp.watch('./assets/javascripts/*.js', ['lint', 'scripts']);
    Gulp.watch('./assets/scss/*/*.scss', ['sass']);
    Gulp.watch('./assets/scss/*.scss', ['sass']);
});

// // Default Task
Gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);
