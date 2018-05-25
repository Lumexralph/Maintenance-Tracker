'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _index = require('../db/index');

var _index2 = _interopRequireDefault(_index);

var _hashPassword = require('./utils/hashPassword');

var _hashPassword2 = _interopRequireDefault(_hashPassword);

var _generateToken = require('./utils/generateToken');

var _generateToken2 = _interopRequireDefault(_generateToken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @function createUserAccount */
var createUserAccount = function createUserAccount(req, res) {
  var hashedPassword = null;

  var _req$body = req.body,
      username = _req$body.username,
      password1 = _req$body.password1,
      password2 = _req$body.password2,
      email = _req$body.email;

  /** clean up the data of white spaces */

  _validator2.default.trim(username);
  _validator2.default.trim(password1);
  _validator2.default.trim(password2);
  _validator2.default.trim(email);

  if (_validator2.default.isEmpty(username) || _validator2.default.isEmpty(password1) || _validator2.default.isEmpty(password2) || _validator2.default.isEmpty(email)) {
    return res.status(400).send({
      status: 'Error',
      message: 'Ensure no field is empty'
    });
  }

  if (password1 !== password2) {
    return res.status(400).send({
      status: 'Error',
      message: 'Passwords do not match'
    });
  }

  if (!_validator2.default.isEmail(email)) {
    return res.status(400).send({
      status: 'Error',
      message: 'Please, provide valid email'
    });
  }
  // hash the password just one
  hashedPassword = (0, _hashPassword2.default)(password1);
  // insert data in db
  var text = 'INSERT INTO users(username, password, email) VALUES(\'' + username + '\', \'' + hashedPassword + '\', \'' + email + '\') RETURNING *';

  _index2.default.query(text).then(function (result) {
    return result.rows[0];
  }).then(function (result) {
    var jsonToken = (0, _generateToken2.default)(result);

    var text2 = 'UPDATE users \n      SET token = \'' + jsonToken + '\' WHERE user_id = \'' + result.user_id + '\' RETURNING *';

    /**
     * Token is updated in the database
     */
    _index2.default.query(text2).then(function (newUser) {
      var data = newUser.rows[0];
      var user_id = data.user_id,
          username = data.username,
          admin_role = data.admin_role,
          token = data.token;

      /**
       * add token to a custom field in response object header
       */

      res.header('x-auth', token.token).status(201).send({
        message: 'success',
        body: { user_id: user_id, username: username, admin_role: admin_role }
      });
    }).catch(function (err) {
      return res.status(501).send({
        message: 'error',
        body: 'system error'
      });
    });
  }).catch(function (err) {
    return res.status(400).send({
      message: 'error',
      body: 'username or email exists, use another one'
    });
  });
};

exports.default = createUserAccount;

//   checkPassword(userStringPassword) {
//     return bcrypt.compareSync(userStringPassword, this.password);
//   }

//   clearToken() {
//     this.token = [];

//     return !this.token.length;
//   }
// }