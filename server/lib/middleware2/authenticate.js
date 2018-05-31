'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _decodeToken = require('./decodeToken');

var _decodeToken2 = _interopRequireDefault(_decodeToken);

var _index = require('../db/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var authenticate = function authenticate(req, res, next) {
  var token = req.header('Authorization');
  /**
   * check if token is in header
   * search database for user with such token
   */
  if (token) {
    var decodedUser = (0, _decodeToken2.default)(token);

    var text = 'SELECT user_id, username, admin_role FROM users WHERE user_id = \'' + decodedUser.user_id + '\'';

    return _index2.default.query(text).then(function (result) {
      var user = result.rows[0];
      req.body.user = user;
      next();
      return req;
    }).catch(function (err) {
      return res.status(401).send({ message: err });
    });
  }
  return res.status(401).send({ message: 'You are not authorized' });
};

exports.default = authenticate;