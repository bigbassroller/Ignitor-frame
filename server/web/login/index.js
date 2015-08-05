exports.register = function (plugin, options, next) {

    plugin.route({
        method: 'GET',
        path: '/login',

        handler: function (request, reply) {

            if (request.auth.isAuthenticated) {

                if (request.auth.credentials.user.roles.admin) {
                    return reply.redirect('/admin');
                }

                return reply.redirect('/account');
            }

            var response = reply.view('login/index');
            response.header('x-auth-required', true);
        }
    });

    next();
};


exports.register.attributes = {
    name: 'web/login'
};
