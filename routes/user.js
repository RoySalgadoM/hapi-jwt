
const bcrypt = require("bcryptjs");
const User = require("../models/User");

module.exports.user = (server) => {
    return server.route(
        {
            method: 'POST',
            path: '/user',
            handler: async (request, h) => {
                try {
                    const emailExists = await User.findOne({ email: request.payload.email });
                    if (emailExists) {
                        return h.response({"message" : "Email already in the database"}).code(400);
                    }
                    const salt = bcrypt.genSaltSync(10);
                    const hashedPassword = bcrypt.hashSync(request.payload.password, salt);
                    request.payload.password = hashedPassword;
                    const savedUser = await User.create(request.payload);
                    return h.response(savedUser);

                } catch (error) {
                    return h.response(error).code(500)
                }
            }
        }
    )
}
