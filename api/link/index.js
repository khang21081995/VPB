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
/**
 * @swagger
 * /api/customer/addCustomer:
 *   post:
 *     tags:
 *       - Link
 *     description: Thêm link mới
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: puppy
 *         description: Puppy object
 *         in: body
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully created
 *
 */
router.post("/addLink", authService.hasRole(roles.userRoles[2]), userService.checkAcceptAble(), controller.addLink);//need admin roles
router.put("/editLink", authService.hasRole(roles.userRoles[2]), userService.checkAcceptAble(), controller.editLink);//need admin roles
router.delete("/deleteLink", authService.hasRole(roles.userRoles[2]), userService.checkAcceptAble(), controller.deleteLink);//need admin roles
router.get("/", authService.hasRole(roles.userRoles[1]), userService.checkAcceptAble(), controller.getLink);


module.exports = router;