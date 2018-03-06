/**
 * Created by phamquangkhang on 4/21/17.
 */
'use strict';

var express = require('express');
var controller = require('./customer.controller');
var authService = require('../auth/service');
var roles = require('../auth/auth.config');
var userService = require("./../user/user.service");
var router = express.Router();


/***************************** api/user  *****************************/

router.post("/addCustomer", authService.hasRole(roles.userRoles[1]), userService.checkAcceptAble(), controller.addCustomer);//need admin roles
router.put("/editByManager", authService.hasRole(roles.userRoles[1]), userService.checkAcceptAble(), controller.editByManager);//need manager roles
router.put("/editByAdmin", authService.hasRole(roles.userRoles[2]), userService.checkAcceptAble(), controller.editByAdmin);//need admin roles
router.delete("/deleteCustomer", authService.hasRole(roles.userRoles[2]), userService.checkAcceptAble(), controller.deleteCustomer);//need admin roles
router.get("/", authService.hasRole(roles.userRoles[1]), userService.checkAcceptAble(), controller.getAllCusByAccount);


module.exports = router;