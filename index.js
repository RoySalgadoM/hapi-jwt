const Hapi = require('@hapi/hapi');
const JWT = require('@hapi/jwt');
const bodyParser = require("body-parser");
// import dotenv
const dotenv = require("dotenv");

// import the databse connection object
const connectDB = require("./config/database");
dotenv.config({ path: "./config/config.env" });

// calling database connection function
connectDB();

const { auth } = require('./routes/auth')
const { user } = require('./routes/user')
const { task } = require('./routes/tasks')

const init = async () => {

    const server = Hapi.server({
        port: process.env.PORT,
        host: 'localhost'
    });
    await server.register(JWT);
    server.auth.strategy('jwt', 'jwt', {
        keys: process.env.AUTH_TOKEN_SECRET,
        verify: {
          aud: false,
          iss: false,
          sub: false,
          nbf: true,
          exp: true,
          maxAgeSec: 14400, // 4 hours
          timeSkewSec: 15
        },
        validate: (artifacts, request, h) => {
            console.log(artifacts)
            const decodedToken = JWT.token.decode(artifacts.token);
            try {
                JWT.token.verify(decodedToken, process.env.AUTH_TOKEN_SECRET);
                return { isValid: true };
            }
            catch (err) {
                return {
                    isValid: false,
                    error: err.message
                };
            }
        }
      });
      server.auth.default('jwt');
    await auth(server);
    await user(server);
    await task(server);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();

