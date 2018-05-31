'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// this class will build new instances of users that will be stored
var User = function () {
  function User(username, email, password) {
    _classCallCheck(this, User);

    this.id = null;
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = 'Non-Admin';
    this.token = [];
  }

  _createClass(User, [{
    key: 'generateAuthToken',
    value: function generateAuthToken() {
      var access = 'auth';
      var token = _jsonwebtoken2.default.sign({ id: String(this.id), access: access }, 'abc').toString();

      this.token[0] = { access: access, token: token };
    }
  }, {
    key: 'hashPassword',
    value: function hashPassword() {
      var salt = _bcryptjs2.default.genSaltSync(10);
      var hash = _bcryptjs2.default.hashSync(this.password, salt);

      // replace with the hashed password
      this.password = hash;
    }
  }, {
    key: 'checkPassword',
    value: function checkPassword(userStringPassword) {
      return _bcryptjs2.default.compareSync(userStringPassword, this.password);
    }
  }, {
    key: 'clearToken',
    value: function clearToken() {
      this.token = [];

      return !this.token.length;
    }
  }]);

  return User;
}();

exports.default = User;