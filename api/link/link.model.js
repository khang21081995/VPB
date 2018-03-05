/**
 * Created by phamquangkhang on 4/21/17.
 */
'use strict';

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;

// var findOrCreate = require('mongoose-find-one-or-create');

var title = new Schema({
    name: {type: String, require: true, trim: true},
    link: {type: String, require: true, trim: true}
});

title.pre('save', function (next) {
    this.name = this.name.substr(0, 1).toUpperCase() + this.name.substr(1, this.name.length()).toLowerCase();
    return next();
});
module.exports = mongoose.model('Link', title);