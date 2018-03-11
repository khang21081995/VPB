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
var swaggerJSDoc = require('swagger-jsdoc');

/***************************** api/user  *****************************/


/**
 * @swagger
 * definitions:
 *   Puppy:
 *     properties:
 *       name:
 *         type: string
 *       breed:
 *         type: string
 *       age:
 *         type: integer
 *       sex:
 *         type: string
 */

router.put("/block", authService.hasRole(roles.userRoles[2]), userService.checkAcceptAble(), controller.blockUser);// need admin roles
router.put("/unblock", authService.hasRole(roles.userRoles[2]), userService.checkAcceptAble(), controller.unBlockUser);// need admin roles
router.post("/adduser", authService.hasRole(roles.userRoles[2]), userService.checkAcceptAble(), controller.addUser);//need admin roles
router.put("/edituser", authService.hasRole(roles.userRoles[2]), userService.checkAcceptAble(), controller.editUser);//need admin roles

/**
 * @swagger
 * /api/user/findall:
 *   get:
 *     tags:
 *       - User
 *     description: Trả về danh sách tất cả người dùng
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Danh sách tất cả người dùng trong hệ thống
 */
router.get("/findAll", authService.hasRole(roles.userRoles[2]), userService.checkAcceptAble(), controller.findAll);


/**
 * @swagger
 * /api/user/findalltest:
 *   get:
 *     tags:
 *       - User
 *     description: Trả về danh sách tất cả người dùng
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Danh sách tất cả người dùng trong hệ thống
 */
router.get("/findAllTest", controller.findAll);
module.exports = router;