/**
 * Created by phamquangkhang on 4/21/17.
 */
'use strict';

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;
var util = require('../util');
// var findOrCreate = require('mongoose-find-one-or-create');
var cusStatus = require('./customer.config').status;
var customer = new Schema({
    name: {type: String, require: true, trim: true},
    phone: {type: String, trim: true, require: true},
    address: {type: String, trim: true, require: true},
    idCard: {type: String, trim: true, require: true},
    moneyRequire: {type: Number, require: true, default: 0},
    profitPercent: {type: Number, require: true, default: 0},
    loanMethod: {type: String, require: true},
    TCTD: {type: String, require: true},
    serviceFee: {type: Number, require: true, default: 0},
    receiveDate: {type: Date, default: Date.now},
    salerID: {type: Schema.Types.ObjectId, ref: 'User'},
    moneyAccepted: {type: Number, default: 0, require: true},
    status: {
        type: String, default: cusStatus[0], require: true,
        enum: {
            values: cusStatus,
            message: "Trạng thái người dùng không hợp lệ"
        }
    }
});

title.pre('save', function (next) {
    this.idCard = util.replaceAll(this.idCard, " ", "");
    this.phone = util.replaceAll(this.phone, " ", "");
    return next();
});
module.exports = mongoose.model('Customer', customer);