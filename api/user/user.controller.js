/**
 * Created by phamquangkhang on 4/21/17.
 */
'use strict';

var User = require("./user.model");
var message = require("./user.message.json").message;
var roles = require('../auth/auth.config');
// var logController = require("../log/log.controller");
// var logger = require('winston');
var util = require('../util');
module.exports = {
    addUser: function (req, res) {
        var userName = req.body.username;
        var name = req.body.name;
        var phone = req.body.phone;
        var role = req.body.role || roles.userRoles[1];//manager
        var title = req.body.title;
        var isBlock = false;
        if (!userName) res.status(400).json({
            status: false,
            message: "Tài khoản người dùng không được để trống"
        }); else if (!name) res.status(400).json({status: false, message: "Tên người dùng không được để trống."});
        else {

            title = title ? title : "";
            User.findOne({username: userName.trim()}).exec(function (err, data) {
                if (data) {
                    res.status(404).json({
                        status: false,
                        message: "Người dùng đã tồn tại trong hệ thống. Vui lòng kiểm tra lại!"
                    });
                } else if (err) {
                    res.status(500).json({
                        status: false,
                        message: "Đã xảy ra lỗi trong quá trình kiểm tra tính hợp lệ của người dùng. Vui lòng thử lại!"
                    });

                } else {
                    var newUser = new User({
                        username: userName,
                        name: name,
                        phone: phone,
                        role: role,
                        title: title,
                        isBlock: isBlock,
                        refID: req.user._id
                    });

                    newUser.validate(function (err) {
                        if (err) {
                            // console.log(String(err));
                            res.status(400).json({status: false, message: String(err).split(":")[2]});//message in validation
                        } else {
                            User.create(newUser, function (err, data) {
                                if (!err) {
                                    res.status(200).json({status: true, message: "Thêm mới người dùng thành công."})
                                } else {
                                    // console.log(String(err).split(":")[2]);
                                    res.status(400).json({status: false, message: err.message})
                                }
                            })
                        }
                    })


                }
            })
        }

    },
    blockUser: function (req, res) {
        var userName = req.body.username;
        // console.log(userName)
        if (userName) {
            userName = userName.trim();
            if (userName.toLowerCase() === req.user.username.toLowerCase()) {
                res.status(400).json({status: false, message: "Bạn không thể khóa tài khoản của chính mình. "})
            } else
                User.findOne({username: userName, isBlock: false}).exec(function (err, data) {
                    if (data) {
                        data.isBlock = true;
                        data.save(function (err, newData) {
                            if (!err) {
                                res.status(200).json({status: true, message: "Khóa tài khoản người dùng thành công"});
                            } else {
                                // logController.addLogAuto(req, username, "block", "Block User");
                                res.status(500).json({
                                    status: false,
                                    message: "Đã có lỗi đã xảy ra, Xin vui lòng thử lại "
                                });
                            }
                        })
                    } else {
                        res.status(404).json({
                            status: false,
                            message: "Hệ thống không tìm thấy tài khoản, Xin vui lòng kiểm tra lại."
                        });
                    }
                })

        } else {
            res.status(400).json({
                status: false,
                message: "Khóa tài khoản người dùng thất bại. Tài khoản người dùng không được để trống!"
            });
        }
    },
    unBlockUser: function (req, res) {
        var userName = req.body.username;
        if (userName) {
            userName = userName.trim();
            User.findOne({username: userName, isBlock: true}).exec(function (err, data) {
                if (data) {
                    data.isBlock = false;
                    data.save(function (err, newData) {
                        if (!err) {
                            res.status(200).json({status: true, message: "Mở khóa tài khoản người dùng thành công."});
                        } else {
                            res.status(400).json({
                                status: false,
                                message: "Đã có lỗi đã xảy ra, Xin vui lòng thử lại."
                            });
                        }
                    })
                } else {
                    res.status(404).json({
                        status: false,
                        message: "Hệ thống không tìm thấy tài khoản, Xin vui lòng kiểm tra lại."
                    });
                }
            })

        } else {
            res.status(400).json({
                status: false,
                message: "Mở khóa tài khoản người dùng thất bại. Tài khoản người dùng không được để trống!"
            });
        }

    },
    editUser: function (req, res) {//
        var userName = req.body.username;
        var name = req.body.name;
        var phone = req.body.name;
        var title = req.body.title;
        if (!userName) res.status(400).json({
            status: false,
            message: "Tài khoản người dùng không được để trống"
        });
        else if (!name) res.status(400).json({status: false, message: "Tên người dùng không được để trống"});
        else {
            title = title ? title : "";
            User.findOne({username: userName.trim()}).exec(function (err, data) {
                if (data) {
                    data.name = name;
                    data.phone = phone;
                    data.title = title;
                    data.save(function (err, newData) {
                        if (err) {
                            res.status(400).json({
                                status: false,
                                message: "Đã có lỗi đã xảy ra, Xin vui lòng thử lại."
                            });
                        } else {
                            res.status(200).json({status: true, message: "Sửa đổi thông tin người dùng thành công."});
                        }
                    })
                } else {
                    res.status(404).json({
                        status: false,
                        message: "Hệ thống không tìm thấy tài khoản, Xin vui lòng kiểm tra lại."
                    });
                }
            })
        }
    },
    findAll: function (req, res) {
        User.find().exec(function (err, data) {
            res.status(200).json({userList: data});
        });
    }


}
