'use strict';

var Title = require("./title.model");

module.exports = {
    addTitle: function (req, res) {
        let title = req.body.title;
        if (!title) res.json({status: false, message: "Chức danh không hợp lệ"});
        title = title.trim();
        Title.findOne({name: {$regex: '^' + title + '$', $options: 'i'}}).exec(function (err, data) {
            if (data) {
                data.save(function (err, newData) {
                    if (err) {
                        res.json({status: false, message: "Thêm chức danh thất bại"});
                    } else {
                        res.json({status: true, message: "Thêm chức danh thành công"});
                    }
                })
            } else {
                let newTile = new Title({
                    name: title
                });
                newTile.validate(function (err) {
                    if (err) {
                        console.log(String(err));
                        res.json({status: false, message: String(err).split(":")[2]});//message in validation
                    } else {
                        Title.create(newTile, function (err, data) {
                            if (!err) {
                                // console.log("data:" + data);
                                // logController.addLogAuto(req, newUser.username, "add", "Adding new User");
                                res.json({status: true, message: "Thêm chức danh mới thành công"});
                            } else {
                                res.json({status: false, message: "Thêm chức danh mới thất bại"});
                            }
                        });
                    }
                })
            }

        });
    },

    editTitle: function (req, res) {
        let oldTitle = req.body.oldTitle;
        let newTitle = req.body.newTitle;
        if (!oldTitle || !newTitle) res.json({status: false, message: "Chức danh không hợp lệ"});
        newTitle = newTitle.trim();
        oldTitle = oldTitle.trim();

        Title.findOne({name: {$regex: '^' + oldTitle + '$', $options: 'i'}}).exec(function (err, data) {
            if (data) {
                data.name = newTitle;
                data.save(function (err, newData) {
                    if (err) {
                        res.json({status: false, message: "Sửa chức danh thất bại"});
                    } else {
                        res.json({status: true, message: "Sửa chức danh thành công"});
                    }
                })
            } else {
                res.json({status: false, message: "Sửa chức danh thất bại"});
            }

        });
    }

}