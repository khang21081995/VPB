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


router.put("/block", authService.hasRole(roles.userRoles[2]), userService.checkAcceptAble(), controller.blockUser);// need admin roles
router.put("/unblock", authService.hasRole(roles.userRoles[2]), userService.checkAcceptAble(), controller.unBlockUser);// need admin roles


/**
 * @swagger
 * /api/user/addUser:
 *   post:
 *     tags:
 *       - User
 *     description: Thêm thông tin người dùng mới
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Thông tin người dùng
 *         description: Nhập thông tin người dùng
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *              type: string
 *              example: khangpqvn@gmail.com
 *             name:
 *              type: string
 *              example: Phạm Quang Khang
 *             phone:
 *              type: string
 *              example: 0981604050
 *             title:
 *              type: string
 *              example: Ô-sin cao cấp
 *     responses:
 *       200:
 *         description: Thêm người dùng thành công
 *         schema:
 *          type: object
 *          properties:
 *            status:
 *              type: boolean
 *            message:
 *              type: string
 *              example: Thêm mới người dùng thành công
 *
 *
 *
 */
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