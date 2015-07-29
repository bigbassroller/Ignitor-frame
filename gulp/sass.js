var Path = require('path');
var Gulp = require('gulp');
var Newer = require('gulp-newer');
var Sass = require('gulp-sass');
var Concat = require('gulp-concat');
var Uglify = require('gulp-uglify');

Gulp.task('sass', function () {

    var bundleConfigs = [{
        entries: [
            'assets/scss/font-awesome-4.3.0/scss/font-awesome.scss',
            'assets/scss/build.scss'
        ],
        dest: 'public/layouts',
        outputName: 'core.css'
    }, {
        entries: [
        'server/web/layouts/admin.scss'
        ],
        dest: 'public/layouts',
        outputName: 'admin.css'
    }, {
        entries: [
        'server/web/home/index.scss'
        ],
        dest: 'public/pages/home',
        outputName: 'index.css'
    }, {
        entries: [
        'server/web/signup/index.scss'
        ],
        dest: 'public/pages/signup',
        outputName: 'index.css'
    }, {
        entries: [
        'server/web/contact/index.scss'
        ],
        dest: 'public/pages/contact',
        outputName: 'index.css'
    }];

    return bundleConfigs.map(function (bundleConfig) {

        return Gulp.src(bundleConfig.entries)
            .pipe(Sass())
            .pipe(Newer(Path.join(bundleConfig.dest, bundleConfig.outputName)))
            .pipe(Concat(bundleConfig.outputName))
            .pipe(Gulp.dest(bundleConfig.dest));
    });

});
