'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var localUserStore = new Map();
var id = 0;
var usernameExists = false;
var emailExists = false;

// import validator library to validate email

var UserStorageSystem = function () {
  function UserStorageSystem() {
    _classCallCheck(this, UserStorageSystem);
  }

  _createClass(UserStorageSystem, null, [{
    key: 'validateEmail',
    value: function validateEmail(email) {
      return _validator2.default.isEmail(email);
    }
  }, {
    key: 'verifyDetails',
    value: function verifyDetails(username, email) {
      localUserStore.forEach(function (value, key) {});
    }
    /*3. just like 2 above method to verify email
    4. method to create user
        a. validate email
        b. verify email and username
        if they come out false, means not yet in storage
              go ahead and create user giving it an id
        
        if method 1 comes as false
              reject with provide valid email message
        if can not username exists from verification, reject with username exists, please provide another one
          if Email verification is true do as above
    */

  }]);

  return UserStorageSystem;
}();