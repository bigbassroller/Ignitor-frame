exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/contact',
        handler: function (request, reply) {

            return reply.view('contact/index');
        }
    });

    next();
};


exports.register.attributes = {
    name: 'web/contact'
};
