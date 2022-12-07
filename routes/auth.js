const User = require("../models/User");
const bcrypt = require("bcryptjs");
const JWT = require('@hapi/jwt');

module.exports.auth = (server) => {
    return server.route(
        {
            method: 'POST',
            path: '/login',
            options: {auth : false},
            handler: async (request, h) => {
                try {

                    const user = await User.findOne({ email: request.payload.email });
                    if (!user) {
                        return h.response({"message" : "Sorry email is not with our records"}).code(400);
                    }
                    
                    const validUserPassword = await bcrypt.compare(
                        request.payload.password,
                        user.password
                    );
                    if (!validUserPassword) {
                        return h.response({"message" : "Sorry the password is invalid"}).code(400);
                    }
                    const token = JWT.token.generate(
                        {
                            aud: 'urn:audience:test',
                            iss: 'urn:issuer:test',
                            user: request.payload.email,
                            group: 'exos'
                        },
                        {
                            key: process.env.AUTH_TOKEN_SECRET,
                            algorithm: 'HS512'
                        },
                        {
                            ttlSec: 14400 // 4 hours
                        }
                    );
                    

                    return h.response(token);

                } catch (error) {
                    return h.response(error).code(500)
                }
            }
        }
    )
}
