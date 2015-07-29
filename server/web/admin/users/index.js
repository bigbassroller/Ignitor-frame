exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/admin/users',
        handler: function (request, reply) {

            return reply.view('admin/users/index');
        }
    });


    next();
};


exports.register.attributes = {
    name: 'web/admin/users'
};
