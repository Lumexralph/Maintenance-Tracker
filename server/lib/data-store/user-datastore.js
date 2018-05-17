'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
    value: function verifyDetails(userData) {
      localUserStore.forEach(function (value, key) {
        if (value.username === userData.username) {
          usernameExists = true;
        }
        if (value.email === userData.email) {
          emailExists = true;
        }
      });
    }
  }, {
    key: 'createUser',
    value: function createUser(userData) {
      return new Promise(function (resole, reject) {
        // check if email is valid
        if (!UserStorageSystem.validateEmail(userData.email)) {
          reject(new Error('Please provide a valid email'));
        }

        // check for uniqueness
        UserStorageSystem.verifyDetails(userData);
        if (usernameExists || emailExists) {
          reject(new Error('username or email already exists'));
        }

        // if the data doesn't exist yet
        // add new user and increase count
        id += 1;
        userData.id = id;
        localUserStore.set(id, userData);

        var newUser = localUserStore.get(id);
        if (newUser) {
          resolve(newUser);
        }
        reject(new Error('User data not saved'));
      });
    }
  }]);

  return UserStorageSystem;
}();

exports.default = UserStorageSystem;