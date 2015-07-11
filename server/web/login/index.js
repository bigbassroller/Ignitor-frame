exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/login',
        handler: function (request, reply) {

            return reply.view('login/index');
        }
    });

    next();
};


exports.register.attributes = {
    name: 'web/login'
};
