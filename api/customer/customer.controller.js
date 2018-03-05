'use strict';

var Customer = require("./customer.model");
var util = require('../util');
var cusStatus = require("./customer.config").status;
module.exports = {
    addCustomer: function (req, res) {
        var name = req.body.name;
        var phone = util.replaceAll(req.body.phone, " ", "");
        var address = req.body.address;
        var idCard = util.replaceAll(req.body.idCard, " ", "");
        var moneyRequire = req.body.moneyRequire;
        var profitPercent = req.body.profitPercent;
        var loanMethod = req.body.loanMethod;
        var TCTD = req.body.TCTD;
        var serviceFee = req.body.serviceFee;
        var salerID = req.user._id;

        moneyRequire = moneyRequire ? moneyRequire : 0;
        serviceFee = serviceFee ? serviceFee : 0;
        profitPercent = profitPercent ? profitPercent : 0;

        if (!name || !phone || !idCard || !address || !loanMethod || !TCTD) {
            res.json({status: false, message: "Bạn chưa điền đủ thông tin cần thiết"});
        } else if (moneyRequire <= 0) {
            res.json({status: false, message: "Khoản tiền yêu cầu không được nhỏ hơn hoặc bằng 0 đồng"});
        } else if (serviceFee < 0) {
            res.json({status: false, message: "Phí dịch vụ không được nhỏ hơn 0%"});
        } else if (profitPercent < 0) {
            res.json({status: false, message: "Lãi suất không được nhỏ hơn 0%"});
        }
        else {

            var newCus = new Customer({
                name: name,
                phone: phone,
                address: address,
                idCard: idCard,
                moneyRequire: moneyRequire,
                profitPercent: profitPercent,
                loanMethod: loanMethod,
                TCTD: TCTD,
                serviceFee: serviceFee,
                salerID: salerID
            });
            newCus.validate(function (err) {
                if (err) {
                    res.json({status: false, message: "Một số thông tin không hợp lệ. Vui lòng kiểm tra lại"})
                } else {
                    Customer.findOne({
                        $or: [
                            {idCard: phone},
                            {phone: idCard}
                        ]
                    }).exec(function (err, data) {
                        Customer.create(newCus, function (newErr, newdata) {
                            if (!newErr) {
                                if (data) {
                                    res.json({
                                        status: true,
                                        message: "Thêm khách hàng thành công. Tuy nhiên đã tồn tại khách hàng từ trước. Xin hãy kiểm tra lại!"
                                    })
                                } else {
                                    res.json({status: true, message: "Thêm khách hàng thành công."})
                                }
                            }
                        })
                    })
                }

            });
        }
    },
    editByManager: function (req, res) {
        var _id = req.body._id;
        var name = req.body.name;
        var phone = util.replaceAll(req.body.phone, " ", "");
        var address = req.body.address;
        var idCard = util.replaceAll(req.body.idCard, " ", "");
        var moneyRequire = req.body.moneyRequire;
        var profitPercent = req.body.profitPercent;
        var loanMethod = req.body.loanMethod;
        var TCTD = req.body.TCTD;
        var serviceFee = req.body.serviceFee;

        moneyRequire = moneyRequire ? moneyRequire : 0;
        serviceFee = serviceFee ? serviceFee : 0;
        profitPercent = profitPercent ? profitPercent : 0;

        if (!name || !phone || !idCard || !address || !loanMethod || !TCTD) {
            res.json({status: false, message: "Bạn chưa điền đủ thông tin cần thiết"});
        } else if (moneyRequire <= 0) {
            res.json({status: false, message: "Khoản tiền yêu cầu không được nhỏ hơn hoặc bằng 0 đồng"});
        } else if (serviceFee < 0) {
            res.json({status: false, message: "Phí dịch vụ không được nhỏ hơn 0%"});
        } else if (profitPercent < 0) {
            res.json({status: false, message: "Lãi suất không được nhỏ hơn 0%"});
        }
        else {
            Customer.findOne({_id: _id}).exec(function (err, data) {
                if (data) {
                    if (data.status !== cusStatus[0]) {
                        res.json({status: false, message: "Khách hàng đã được phê duyệt. không thể sửa đổi."})
                    } else {
                        data.name = name;
                        data.phone = phone;
                        data.address = address;
                        data.idCard = idCard;
                        data.moneyRequire = moneyRequire;
                        data.profitPercent = profitPercent;
                        data.loanMethod = loanMethod;
                        data.TCTD = TCTD;
                        data.serviceFee = serviceFee;
                        data.validate(function (err) {
                            if (err) {
                                res.json({
                                    status: false,
                                    message: "Một số thông tin không hợp lệ. Vui lòng kiểm tra lại"
                                })
                            } else {
                                data.save(function (err, newData) {
                                    if (!err) {
                                        res.json({status: true, message: "Cập nhật thành công!"})
                                    } else {
                                        res.json({
                                            status: false,
                                            message: "Đã xảy ra lỗi trong quá trình cập nhật. Xin vui lòng thử lại!"
                                        })
                                    }
                                })
                            }
                        })
                    }

                }
            })

        }
    },
    editByAdmin: function (req, res) {
        var _id = req.body._id;
        var status = req.body.status;
        var moneyAccepted = req.body.moneyAccepted;

        if(!_id||!status){
            res.json({status:false,message: ""})

        }
    }

}