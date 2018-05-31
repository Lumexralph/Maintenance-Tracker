'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _index = require('../config/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var secret = void 0;
if (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'test') {
  secret = _index2.default.secret;
} else {
  secret = process.env.SECRET;
}

/**
 * if secret pattern was changed or token was altered     JWT will throw an error
 */

var decodeToken = function decodeToken(token) {
  try {
    return _jsonwebtoken2.default.verify(token, secret);
  } catch (error) {
    return new Error(error);
  }
};

exports.default = decodeToken;