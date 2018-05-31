'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../db/index');

var _index2 = _interopRequireDefault(_index);

var _checkPassword = require('../controller2/utils/checkPassword');

var _checkPassword2 = _interopRequireDefault(_checkPassword);

var _generateToken = require('./utils/generateToken');

var _generateToken2 = _interopRequireDefault(_generateToken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loginUser = function loginUser(req, res) {
  var _req$body = req.body,
      username = _req$body.username,
      password = _req$body.password;

  /**
   * @constant {string}
   * database query string
   */

  var text = 'SELECT * FROM users WHERE username=\'' + username + '\'';

  /** Check by username then confirm the passowrd */
  _index2.default.query(text).then(function (result) {
    return result.rows[0];
  }).then(function (user) {
    if ((0, _checkPassword2.default)(password, user.password)) {
      /**
       * genrate another token and save it
       */
      var token = (0, _generateToken2.default)(user);
      res.header('Authorization', token).status(200).send({
        message: 'Login Successful',
        token: token
      });
    }

    return res.status(400).send({
      message: 'Password not correct'
    });
  }).catch(function (err) {
    return res.status(400).send({
      message: 'Account does not exist'
    });
  });
};

exports.default = loginUser;