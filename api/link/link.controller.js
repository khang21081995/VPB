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
                    res.json({status: true, message: "Tạo đường dẫn mới thành công"});
                } else {
                    // console.log("data:" + data);
                    res.json({status: false, message: err.message});//message in pre save

                }
            });
        } else {
            res.json({status: false, message: "Thông tin về link không được để trống"});
        }


    },
    editLink: function (req, res) {
        var _id = req.body._id;
        var name = req.body.name;
        var link = req.body.link;
        if (!_id || !name || !link) {
            res.json({status: false, message: "Thông tin về link không được để trống"});
        } else {
            Link.findOne({_id: _id}).exec(function (err, data) {
                if (data) {
                    data.name = name;
                    data.link = link;
                    data.save(function (err, newData) {
                        if (!err) {
                            res.json({status: true, message: "Sửa đổi thông tin thành công"});
                        } else {
                            res.json({status: false, message: "Sửa đổi thông tin thất bại. Hãy thử lại"});
                        }
                    });
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
                            res.json({status: false, message: "Xóa Link thành công"});
                        } else {
                            // logController.addLogAuto(req, username, "block", "Block User");
                            res.json({status: true, message: "Xóa Link thất bại"});
                        }
                    });
                }
            })
        }
    },
    getLink: function (req, res) {
        Link.find().exec(function (err, data) {
            res.json({data: data});
        })
    }

}