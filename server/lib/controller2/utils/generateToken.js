'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var generateAuthToken = function generateAuthToken(userData) {
  var access = 'auth';
  var token = _jsonwebtoken2.default.sign({ user_id: String(userData.user_id), access: access }, 'abc').toString();

  return JSON.stringify({ access: access, token: token });
};

exports.default = generateAuthToken;