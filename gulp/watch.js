var Gulp = require('gulp');

Gulp.task('watch', function () {

    Gulp.watch('./assets/javascripts/*.js', ['lint', 'scripts']);
    Gulp.watch('./assets/scss/*/*.scss', ['sass']);
    Gulp.watch('./assets/scss/*.scss', ['sass']);
});
