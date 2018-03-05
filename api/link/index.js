/**
 * Created by phamquangkhang on 4/21/17.
 */
'use strict';

var express = require('express');
var controller = require('./link.controller');
var authService = require('../auth/service');
var roles = require('../auth/auth.config');
var userService = require("./../user/user.service");
var router = express.Router();


/***************************** api/user  *****************************/

router.post("/addLink", authService.hasRole(roles.userRoles[2]), userService.checkAcceptAble(), controller.addTitle);//need admin roles
router.put("/editLink", authService.hasRole(roles.userRoles[2]), userService.checkAcceptAble(), controller.editTitle);//need admin roles

module.exports = router;