var Gulp = require('gulp');
var Gutil = require('gulp-util');
var Webpack = require('webpack');


var CommonsChunkPlugin = Webpack.optimize.CommonsChunkPlugin;
var UglifyJsPlugin = Webpack.optimize.UglifyJsPlugin;
var executionCount = 0;


Gulp.task('script', function (callback) {

    var config = [{
        entry: [
          './server/web/home'
        ],
        output: {
            path: './public/pages/home',
            filename: 'home.min.js',
            sourceMapFilename: 'home.map.js'
        },
        resolve: {
            extensions: ['', '.js']
        },
        devtool: 'source-map',
        plugins: [
            new UglifyJsPlugin({ compress: { warnings: false } })
        ]}, {
        entry: [
           './server/web/contact'
        ],
        output: {
            path: './public/pages/contact',
            filename: 'contact.min.js',
            sourceMapFilename: 'contact.map.js'
        },
        resolve: {
            extensions: ['', '.js']
        },
        devtool: 'source-map',
        plugins: [
            new UglifyJsPlugin({ compress: { warnings: false } })
    ]}];

    Webpack(config, function (err, stats) {

        if (err) {
            throw new Gutil.PluginError('webpack', err);
        }

        Gutil.log('[webpack]', stats.toString({
            colors: true,
            chunkModules: false
        }));

        if (executionCount === 0) {
            callback();
        }
        executionCount += 1;
    });
});
