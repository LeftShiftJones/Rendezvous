// Standard Node modules
const Path = require("path");
const connection = require('./login.js');
// Knex
const knex = require("knex")({
    client: "pg",
    connection: connection
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
                description: 'Home page'
            },
            handler: async (request, h) => {
                return h.view('index.html');
            }
    },
        {
            method: 'POST',
            path: '/api/members',
            config: {
                description: 'Get User Credentials',
                validate: {
                    payload: {
                        email: Joi.string().required(),
                        password: Joi.string().required()
                    }
                }
            },
            handler: async(request, h) => {
                let email = await knex("members")
                    .select('email')
                    .where('email', request.payload.email);
                if(email.length == 0) {
                    return {
                        ok: false,
                        msge: `No account with the email '${request.payload.email}' exists`
                    };
                }
                let passwords_match = await knex("members")
                    .where("email", request.payload.email)
                    .where("password", request.payload.password);
                if(passwords_match.length == 0) {
                    return {
                        ok: false,
                        msge: `Incorrect password for ${request.payload.email}`
                    };
                }
                //return h.view('index.html');
                return {
                    ok: true,
                    msge: `You have successfully logged in`
                };
            }
        },
        {
            method: 'PATCH',
            path: '/api/core_hours',
            config: {
                description: 'Update core hours',
                validate: {
                    payload: {
                        email: Joi.string().required(),
                        day: Joi.number().required(),
                        startTime: Joi.required(),
                        endTime: Joi.required()
                    }
                }
            },
            handler: async(request, h) => {
                console.log("Handler reached");
                console.log(`${request.payload.email} \n${request.payload.day} \n${request.payload.startTime}  \n${request.payload.endTime}`);
                let success = await knex("core_hours")
                    .where("day_of_week", request.payload.day)
                    .where("email", request.payload.email)
                    .update('available_start', request.payload.startTime)
                    .update('available_end', request.payload.endTime);
                console.log(success);
                
                if(success == 1) {
                    return {
                        ok: true,
                        msge: 'It worked'
                    };
                } else {
                    return {
                        ok: !true,
                        msge: '!It worked'
                    };
                }
                
            }
        },
        {
            method: "POST",
            path: "/api/commitments",
            config: {
                description: "Get user's commitments",
                validate: {
                    payload: {
                        email: Joi.string().required()
                    }
                }
            },
            handler: async(request, h) => {
                console.log(`\n\nGetting Data...\n\n`);
                let query = await knex("commitments")
                    .where("email", request.payload.email)
                    .orderBy("start_date_time");
                if(query.length > 0) {
                    return {
                        ok: true,
                        msge: 'We got the data',
                        commitments: query
                    };
                } else {
                    return {
                        ok: false,
                        msge: 'Returned 0 commitments'
                    }
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
