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

    app.get('/', function (req, res) {
        if (req.isAuthenticated()) {
            // res.render('index.ejs');
            res.redirect('/homepage');
        } else
            res.render('index.ejs');
    });
    //
    app.get("/homepage", service.hasRole('member'), function (req, res) {
        console.log(req.user);
        res.render('homepage.ejs', {loginUser: req.user});
    });
    //
    // app.get("/user", service.hasRole('manager'), function (req, res) {
    //     userModel.find()
    //         .exec(function (err, data) {
    //             res.render('admin/user.ejs', {data: data, loginUser: req.user});
    //         })
    // });
    //
    // app.get('/log', function (req, res) {
    //     logModel.find().populate("username").populate("targetNode")
    //         .exec(function (err, data) {
    //             res.render('admin/log.ejs', {data: data, loginUser: req.user, moment: moment});
    //         })
    // });
    //
    // // app.get("/adduser", service.hasRole('manager'), function (req, res) {
    // //     res.render('admin/adduser.ejs');
    // // });
}