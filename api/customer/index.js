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
/**
 * @swagger
 * /api/customer/addCustomer:
 *   post:
 *     tags:
 *       - Customer
 *     description: Thêm khách hàng mới
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
router.post("/addCustomer", authService.hasRole(roles.userRoles[1]), userService.checkAcceptAble(), controller.addCustomer);//need admin roles
router.put("/editByManager", authService.hasRole(roles.userRoles[1]), userService.checkAcceptAble(), controller.editByManager);//need manager roles
router.put("/editByAdmin", authService.hasRole(roles.userRoles[2]), userService.checkAcceptAble(), controller.editByAdmin);//need admin roles

router.delete("/deleteCustomer", authService.hasRole(roles.userRoles[2]), userService.checkAcceptAble(), controller.deleteCustomer);//need admin roles


/**
 * @swagger
 * /api/customer:
 *   get:
 *     tags:
 *       - Customer
 *     description: Trả về danh sách khách hàng dựa vào tài khoản đã login
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Danh sách khách hàng
 */
router.get("/", authService.hasRole(roles.userRoles[1]), userService.checkAcceptAble(), controller.getAllCusByAccount);


module.exports = router;