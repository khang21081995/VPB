'use strict';

var express = require('express');

var router = express.Router();


function renderview(pathToView, linkToView) {
    router.get(pathToView, function (req, res) {
        res.render(linkToView, {loginUser: req.user});
    })
}

router.get('/', function (req, res) {
    if (req.isAuthenticated()) {
        // res.render('index.ejs');
        res.redirect('/homepage');
    } else
        res.render('index.ejs');
});

router.get("/homepage", service.hasRole('member'), function (req, res) {
    console.log(req.user);
    res.render('homepage.ejs', {loginUser: req.user});
});


module.exports = router;