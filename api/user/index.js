/**
 * Created by phamquangkhang on 4/21/17.
 */
'use strict';

var express = require('express');
var controller = require('./user.controller');
var authService = require('../auth/service');
var roles = require('../auth/auth.config');
var userService = require("./user.service");
var router = express.Router();


/***************************** api/user  *****************************/

router.put("/block", authService.hasRole(roles.userRoles[2]), userService.checkAcceptAble(), controller.blockUser);// need admin roles
router.put("/unblock", authService.hasRole(roles.userRoles[2]), userService.checkAcceptAble(), controller.unBlockUser);// need admin roles
router.post("/adduser", authService.hasRole(roles.userRoles[2]), userService.checkAcceptAble(), controller.addUser);//need admin roles
router.put("/edituser", authService.hasRole(roles.userRoles[2]), userService.checkAcceptAble(), controller.editUser);//need admin roles
router.get("/findAll", authService.hasRole(roles.userRoles[2]), userService.checkAcceptAble(), controller.findAll);
router.get("/findAllTest", controller.findAll);
module.exports = router;