/**
 * Created by phamquangkhang on 4/28/17.
 */
'use strict';

var authConfig = require("./auth/auth.config");
var fs = require("fs");
module.exports = {
    CompareRole1IsSmallerThanRole2: function (role1, role2) {
        return authConfig.userRoles.indexOf(role1) < authConfig.userRoles.indexOf(role2) ? true : false;
    },
    replaceAll: function (input, searchVal, replaceVal) {
        while (input.indexOf(searchVal) >= 0) {
            (input = input.replace(searchVal, replaceVal));
        }
        return input;
    }
}