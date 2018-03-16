'use strict';

var Link = require("./link.model");

module.exports = {
    addLink: function (req, res) {
        var name = req.body.name;
        var link = req.body.link;

        if (name && link) {
            var newLink = new Link({name: name, link: link});
            Link.create(newLink, function (err, data) {
                if (!err) {
                    // console.log("data:" + data);
                    // logController.addLogAuto(req, newUser.username, "add", "Adding new User");
                    res.status(200).json({status: true, message: "Tạo đường dẫn mới thành công", _id: data._id});
                } else {
                    // console.log("data:" + data);
                    res.status(400).json({status: false, message: err.message});//message in pre save

                }
            });
        } else {
            res.status(400).json({status: false, message: "Thông tin về link không được để trống"});
        }


    },
    editLink: function (req, res) {
        var _id = req.body._id;
        var name = req.body.name;
        var link = req.body.link;
        if (!_id || !name || !link) {
            res.status(400).json({status: false, message: "Thông tin về link không được để trống"});
        } else {
            Link.findOne({_id: _id}).exec(function (err, data) {
                if (data) {
                    data.name = name;
                    data.link = link;
                    data.save(function (err, newData) {
                        if (!err) {
                            res.status(200).json({status: true, message: "Sửa đổi thông tin thành công"});
                        } else {
                            res.status(400).json({status: false, message: "Sửa đổi thông tin thất bại. Hãy thử lại"});
                        }
                    });
                } else {
                    res.status(404).json({status: false, message: "Không tìm thấy thông tin Link cần sửa đổi!"});
                }
            })
        }
    },
    deleteLink: function (req, res) {
        var _id = req.body._id;
        if (!_id) {
            res.json({status: false, message: "Thông tin về link không được để trống"});
        } else {
            Link.findOne({_id: _id}).exec(function (err, data) {
                if (data) {
                    data.remove(function (err, newData) {
                        if (!err) {
                            res.status(200).json({status: true, message: "Xóa Link thành công"});
                        } else {
                            // logController.addLogAuto(req, username, "block", "Block User");
                            res.status(500).json({status: false, message: "Xóa Link thất bại"});
                        }
                    });
                } else {
                    res.status(404).json({status: false, message: "Không tìm thấy thông tin Link cần sửa đổi!"});
                }
            })
        }
    },
    getLink: function (req, res) {
        Link.find().exec(function (err, data) {
            if (!err)
                res.status(200).json({status: true, data: data});
            else {
                res.status(500).json({status: false, message: "Đã có lỗi xảy ra! Xin vui lòng thử lại"})
            }
        })
    }

}