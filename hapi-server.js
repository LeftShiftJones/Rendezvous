// Standard Node modules
const Path = require("path");

// Knex
const knex = require("knex")({
    client: "pg",
    connection: {
        host: "SERVER",
        database: "DB",
        user: "USER",
        password: "NOTREALPASSWORD"
    }
});

// Hapi
const Joi = require("joi"); // Input validation
const Hapi = require("hapi"); // Server

const server = Hapi.server({
    host: "localhost",
    port: 3000,
    routes: {
        files: {
            relativeTo: Path.join(__dirname, "dist")
        }
    }
});

async function init() {
    // Show routes at startup.
    await server.register(require("blipp"));

    // Output logging information.
    await server.register({
        plugin: require("hapi-pino"),
        options: {
            prettyPrint: true
        }
    });

    // Configure static file service.
    await server.register(require("inert"));

    // Configure routes.
    server.route([{
            method: 'GET',
            path: '/',
            config: {
                description: 'Home page',
                validate: {
                    payload: {
                        username: Joi().string().required(),
                        password: Joi().string.required()
                    }
                }
            },
            handler: async (request, h) => {
                return h.view('index.html');
            }
        },
        {
            method: 'GET',
            path: '/',
            config: {
                description: 'Get User Credentials'
            },
            handler: async(request, h) => {
                let username = await knex("members")
                    .select('username')
                    .where('username', request.payload.username);
                if(username == 0) {
                    return {
                        ok: false,
                        msge: `No account with the username '${request.payload.username}' exists`
                    };
                }
                let passwords_match = await knex("members")
                    .where("username", request.payload.username)
                    .where("password", request.payload.password);
                if(passwords_match == 0) {
                    return {
                        ok: false,
                        msge: `Incorrect password for ${request.payload.username}`
                    };
                }
            }
        },
        {
            method: "GET",
            path: "/{param*}",
            config: {
                description: "Production Application"
            },
            handler: {
                directory: {
                    path: ".",
                    redirectToSlash: true,
                    index: true
                }
        }
    }]);

// Start the server.
await server.start();
server.logger().info(`Server running at ${server.info.uri}`);
}

process.on("unhandledRejection", err => {
    server.logger().error(err);
    process.exit(1);
});

// Go!
init();
