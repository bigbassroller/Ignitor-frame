var Gulp = require('gulp');
var Jshint = require('gulp-jshint');

Gulp.task('lint', function () {

    return Gulp.src('js/*.js')
        .pipe(Jshint())
        .pipe(Jshint.reporter('default'));
});
