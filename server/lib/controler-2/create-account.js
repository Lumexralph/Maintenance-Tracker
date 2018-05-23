'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _user = require('../model-2/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createUserAccount = function createUserAccount(req, res) {
  var _req$body = req.body,
      username = _req$body.username,
      password1 = _req$body.password1,
      password2 = _req$body.password2,
      email = _req$body.email;


  if (password1 !== password2) {
    res.status(400).send({
      status: 'Error',
      message: 'Passwords do not match'
    });
  }

  if (!_validator2.default.isEmail(email)) {
    res.status(400).send({
      status: 'Error',
      message: 'Please, provide valid email'
    });
  }
};

exports.default = createUserAccount;