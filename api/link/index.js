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
/*
 * @swagger
 * /api/link:
 *   post:
 *     tags:
 *       - Link
 *     description: Thêm 1 hyperlink mới.
 *     produces:
 *       - application/json
 *    parameters:
 *       - name:Thông tin input
 *         description: Nhập thông tin người Link
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *              type: string
 *              example: FACEBOOK
 *             link:
 *              type: string
 *              example: https://www.facebook.com/khang21081995
 *     responses:
 *       200:
 *         description: Thêm Link thành công
 *       400:
 *         description: Bad request, Trường thông tin đẩy lên không đúng
 *         schema:
 *          type: object
 *          properties:
 *              status:
 *                  type: boolean
 *              message:
 *                  type: string
 *       401:
 *          description: Chưa xác thực đăng nhập
 *       403:
 *          description: Không có quyền truy cập
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
router.post("/", authService.hasRole(roles.userRoles[2]), userService.checkAcceptAble(), controller.addLink);//need admin roles
/*
 * @swagger
 * /api/link/editlink:
 *   put:
 *     tags:
 *       - Link
 *     description: Sửa thông tin link.
 *     produces:
 *       - application/json
 *    parameters:
 *       - name:Thông tin chỉnh sửa Link
 *         description: Nhập thông tin Link. Lưu ý api update thông tin dựa theo `_id` của link sẽ được trả về khi gọi hàm get
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *               example: "59a6853d9b2ce70011e93995"
 *             name:
 *              type: string
 *              example: FACEBOOK
 *             link:
 *              type: string
 *              example: https://www.facebook.com/khang21081995
 *     responses:
 *       200:
 *         description: Sửa Link thành công
 *       400:
 *         description: Bad request, Trường thông tin đẩy lên không đúng
 *         schema:
 *          type: object
 *          properties:
 *              status:
 *                  type: boolean
 *              message:
 *                  type: string
 *       401:
 *          description: Chưa xác thực đăng nhập
 *       403:
 *          description: Không có quyền truy cập
 *       404:
 *         description: Link không tồn tại trong hệ thống
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
router.put("/editLink", authService.hasRole(roles.userRoles[2]), userService.checkAcceptAble(), controller.editLink);//need admin roles

/*
 * @swagger
 * /api/link:
 *   delete:
 *     tags:
 *       - Link
 *     description: Xóa link.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Xóa Link
 *         description: Nhập thông tin Link. Lưu ý api xóa link dựa theo `_id` của link sẽ được trả về khi gọi hàm get
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *               example: "59a6853d9b2ce70011e93995"
 *     responses:
 *       200:
 *         description: Xóa Link thành công
 *       400:
 *         description: Bad request, Trường thông tin đẩy lên không đúng
 *         schema:
 *          type: object
 *          properties:
 *              status:
 *                  type: boolean
 *              message:
 *                  type: string
 *       401:
 *          description: Chưa xác thực đăng nhập
 *       403:
 *          description: Không có quyền truy cập
 *       404:
 *         description: Link không tồn tại trong hệ thống
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
router.delete("/", authService.hasRole(roles.userRoles[2]), userService.checkAcceptAble(), controller.deleteLink);//need admin roles

/*
 * @swagger
 * /api/link:
 *   get:
 *     tags:
 *       - Link
 *     description: Trả về danh sách tất cả Link. yêu cầu đăng nhập xác thực quyền.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Danh sách tất cả Link trong hệ thống
 *         schema:
 *          type: object
 *          properties:
 *              data:
 *                type: object
 *
 *        401:
 *          description: Chưa xác thực đăng nhập
 *       403:
 *          description: Không có quyền truy cập
 *       500:
 *          description: Lỗi chưa được xác đinh
 */
router.get("/", authService.hasRole(roles.userRoles[1]), userService.checkAcceptAble(), controller.getLink);


module.exports = router;