exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/admin',
        handler: function (request, reply) {

            return reply.view('admin/index');
        }
    });


    next();
};


exports.register.attributes = {
    name: 'web/admin'
};
