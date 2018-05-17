'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// this class will build new instances of users that will be stored

var User = function User(username, email, password) {
  _classCallCheck(this, User);

  this.id = null;
  this.username = username;
  this.email = email;
  this.password = password;
  this.role = 'Non-Admin';
  this.token = [];
};

exports.default = User;