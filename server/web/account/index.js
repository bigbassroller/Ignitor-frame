exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/account',
        handler: function (request, reply) {

            return reply.view('account/index');
        }
    });


    next();
};


exports.register.attributes = {
    name: 'web/account'
};
