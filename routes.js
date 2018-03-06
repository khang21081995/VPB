var service = require('./api/auth/service');
var userModel = require('./api/user/user.model');
// var logModel = require('./api/log/log.model');
var moment = require('moment');
module.exports = function (app) {
    // app.use("/api",require("./api"));
    //
    app.use("/api/auth", require("./api/auth"));
    app.use("/api/user", require("./api/user"));
    app.use("/api/customer", require("./api/customer"));
    app.use("/",require("./views_render"))

}