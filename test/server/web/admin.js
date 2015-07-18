var Lab = require('lab');
var Code = require('code');
var Config = require('../../../config');
var Hapi = require('hapi');
var AccountPlugin = require('../../../server/web/admin/index');


var lab = exports.lab = Lab.script();
var request, server;


lab.beforeEach(function (done) {

    var plugins = [AccountPlugin];
    server = new Hapi.Server();
    server.connection({ port: Config.get('/port/web') });
    server.views({
        engines: { jade: require('jade') },
        path: './server/web'
    });
    server.register(plugins, function (err) {

        if (err) {
            return done(err);
        }

        done();
    });
});


lab.experiment('Account Page View', function () {

    lab.beforeEach(function (done) {

        request = {
            method: 'GET',
            url: '/admin'
        };

        done();
    });



    lab.test('admin page renders properly', function (done) {

        server.inject(request, function (response) {

            // Code.expect(response.result).to.match(/Account us/i);
            Code.expect(response.statusCode).to.equal(200);

            done();
        });
    });
});
