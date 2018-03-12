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
 *       400:
 *         description: Bad request, Trường thông tin đẩy lên không đúng
 *         schema:
 *          type: object
 *          properties:
 *              status:
 *                  type: boolean
 *              message:
 *                  type: string
 *       404:
 *         description: Người dùng đã tồn tại trong hệ thống
 *         schema:
 *          type: object
 *          properties:
 *              status:
 *                  type: boolean
 *              message:
 *                  type: string
 *       500:
 *         description: Lỗi chưa được xác định
 */
router.post("/adduser", authService.hasRole(roles.userRoles[2]), userService.checkAcceptAble(), controller.addUser);//need admin roles

/**
 * @swagger
 * /api/user/editUser:
 *   put:
 *     tags:
 *       - User
 *     description: Sửa thông tin người dùng
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
 *         description: Sửa thông tin người dùng thành công
 *         schema:
 *          type: object
 *          properties:
 *            status:
 *              type: boolean
 *            message:
 *              type: string
 *              example: Sửa thông tin người dùng thành công
 *       400:
 *         description: Bad request, Trường thông tin đẩy lên không đúng
 *         schema:
 *          type: object
 *          properties:
 *              status:
 *                  type: boolean
 *              message:
 *                  type: string
 *       404:
 *         description: Không tìm thấy người dùng trong hệ thống
 *         schema:
 *          type: object
 *          properties:
 *              status:
 *                  type: boolean
 *              message:
 *                  type: string
 *       500:
 *         description: Lỗi chưa được xác định
 */
router.put("/edituser", authService.hasRole(roles.userRoles[2]), userService.checkAcceptAble(), controller.editUser);//need admin roles

/**
 * @swagger
 * /api/user/block:
 *   put:
 *     tags:
 *       - User
 *     description: khóa tài khoản người dùng
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
 *     responses:
 *       200:
 *         description: Khóa người dùng thành công
 *         schema:
 *          type: object
 *          properties:
 *            status:
 *              type: boolean
 *            message:
 *              type: string
 *              example: Khóa tài khoản người dùng thành công
 */
router.put("/block", authService.hasRole(roles.userRoles[2]), userService.checkAcceptAble(), controller.blockUser);// need admin roles
/**
 * @swagger
 * /api/user/unblock:
 *   put:
 *     tags:
 *       - User
 *     description: Mở khóa tài khoản người dùng
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
 *     responses:
 *       200:
 *         description: Khóa người dùng thành công
 *         schema:
 *          type: object
 *          properties:
 *            status:
 *              type: boolean
 *            message:
 *              type: string
 *              example: Mở khóa tài khoản người dùng thành công
 *       400:
 *         description: Bad request, Trường thông tin đẩy lên không đúng
 *         schema:
 *          type: object
 *          properties:
 *              status:
 *                  type: boolean
 *              message:
 *                  type: string
 *       404:
 *         description: Không tìm thấy người dùng trong hệ thống
 *         schema:
 *          type: object
 *          properties:
 *              status:
 *                  type: boolean
 *              message:
 *                  type: string
 *       500:
 *         description: Lỗi chưa được xác định
 */
router.put("/unblock", authService.hasRole(roles.userRoles[2]), userService.checkAcceptAble(), controller.unBlockUser);// need admin roles


/**
 * @swagger
 * /api/user/findall:
 *   get:
 *     tags:
 *       - User
 *     description: Trả về danh sách tất cả người dùng yêu cầu đăng nhập xác thực quyền.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Danh sách tất cả người dùng trong hệ thống
 *       500:
 *          description: Lỗi chưa được xác đinh
 */
router.get("/findAll", authService.hasRole(roles.userRoles[2]), userService.checkAcceptAble(), controller.findAll);


/**
 * @swagger
 * /api/user/findalltest:
 *   get:
 *     tags:
 *       - User
 *     description: Trả về danh sách tất cả người dùng không thông qua đăng nhập.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Danh sách tất cả người dùng trong hệ thống
 */
router.get("/findAllTest", controller.findAll);
module.exports = router;