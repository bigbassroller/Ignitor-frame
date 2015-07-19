// Include gulp
var Gulp = require('gulp');

// Include Our Plugins
var Path = require('path');
var Newer = require('gulp-newer');
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

    var bundleConfigs = [{
        entries: [
           'assets/scss/font-awesome-4.3.0/scss/font-awesome.scss',
            'assets/scss/build.scss'
        ],
        dest: 'public/layouts',
        outputName: 'core.css'
    }];

    return bundleConfigs.map(function (bundleConfig) {

        return Gulp.src(bundleConfig.entries)
            .pipe(Sass())
            .pipe(Newer(Path.join(bundleConfig.dest, bundleConfig.outputName)))
            .pipe(Concat(bundleConfig.outputName))
            .pipe(Gulp.dest(bundleConfig.dest));
    });

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
