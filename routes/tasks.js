
module.exports.task = (server) => {
    return server.route(
        {
            method: 'GET',
            path: '/tasks',
            options: {auth : "jwt"},
            handler: async (request, h) => {
                return h.response(200);
            }
        }
    )
}