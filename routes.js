var service = require('./api/auth/service');
var userModel = require('./api/user/user.model');
// var logModel = require('./api/log/log.model');
var moment = require('moment');
var swaggerJSDoc = require('swagger-jsdoc');
var host = require('./api/auth/google.server.config').google.callbackURL.split('/api')[0].split("//")[1];
var swaggerDefinition = {
    info: {
        title: 'Node Swagger API',
        version: '1.0.0',
        description: 'Demonstrating how to describe a RESTful API with Swagger',
    },
    host: host,
    basePath: '/',
};

// options for the swagger docs
var options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['./api/user/*.js','./api/link/*.js','./api/customer/*.js','./api/auth/*.js'],
};

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);

module.exports = function (app) {
    // app.use("/api",require("./api"));
    //
    console.log(host);
    app.use("/api/auth", require("./api/auth"));
    app.use("/api/user", require("./api/user"));
    app.use("/api/customer", require("./api/customer"));
    app.use("/",require("./views_render"))
    app.get('/swagger.json', function(req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
}