var Gulp = require('gulp');
var Path = require('path');
var Newer = require('gulp-newer');
var Jshint = require('gulp-jshint');
var Concat = require('gulp-concat');
var Uglify = require('gulp-uglify');

Gulp.task('script', function () {

    var bundleConfigs = [{
        entries: [
            'server/web/app.js'
        ],
        dest: 'public',
        outputName: 'app.min.js'
    }, {
        entries: [
            'server/web/home/script.js'
        ],
        dest: 'public/pages/home',
        outputName: 'script.min.js'
    }, {
        entries: [
            'server/web/contact/script.js'
        ],
        dest: 'public/pages/contact',
        outputName: 'script.min.js'
    }];

    return bundleConfigs.map(function (bundleConfig) {

        return Gulp.src(bundleConfig.entries)
            .pipe(Concat(bundleConfig.outputName))
            .pipe(Uglify({
                  mangle: true,
                  compress: true,
                  beautify: true
             }))
            .pipe(Newer(Path.join(bundleConfig.dest, bundleConfig.outputName)))
            .pipe(Gulp.dest(bundleConfig.dest));
    });

});
