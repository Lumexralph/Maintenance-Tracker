'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hashPassword = function hashPassword(stringPassword) {
  var salt = _bcryptjs2.default.genSaltSync(10);
  var hash = _bcryptjs2.default.hashSync(stringPassword, salt);

  return hash;
};

exports.default = hashPassword;