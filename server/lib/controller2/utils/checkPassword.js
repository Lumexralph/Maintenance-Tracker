'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {string} userStringPassword
 * @param {string} hashed password in database
 * @function {function} checkPassword returns boolean
 * if the password exists in the database
 */

var checkPassword = function checkPassword(userStringPassword, storedHashedPassword) {
  return _bcryptjs2.default.compareSync(userStringPassword, storedHashedPassword);
};

exports.default = checkPassword;