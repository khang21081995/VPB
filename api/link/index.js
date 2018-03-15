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
 * /api/user/findall:
 *   post:
 *     tags:
 *       - Link
 *     description: Thêm 1 hyperlink mới.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Thêm Link thành công
 *       400:
 *          description: Thông tin về Link không được chấp nhận
 *       500:
 *          description: Lỗi chưa được xác đinh
 */
router.post("/addLink", authService.hasRole(roles.userRoles[2]), userService.checkAcceptAble(), controller.addLink);//need admin roles
router.put("/editLink", authService.hasRole(roles.userRoles[2]), userService.checkAcceptAble(), controller.editLink);//need admin roles
router.delete("/deleteLink", authService.hasRole(roles.userRoles[2]), userService.checkAcceptAble(), controller.deleteLink);//need admin roles
router.get("/", authService.hasRole(roles.userRoles[1]), userService.checkAcceptAble(), controller.getLink);


module.exports = router;