'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _index = require('../db/index');

var _index2 = _interopRequireDefault(_index);

var _hashPassword = require('./utils/hashPassword');

var _hashPassword2 = _interopRequireDefault(_hashPassword);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createUserAccount = function createUserAccount(req, res) {
  var hashedPassword = null;

  var _req$body = req.body,
      username = _req$body.username,
      password1 = _req$body.password1,
      password2 = _req$body.password2,
      email = _req$body.email;

  // clean up the data of white spaces

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
    var access = 'auth';
    var token = _jsonwebtoken2.default.sign({ user_id: String(result.user_id), access: access }, 'abc').toString();

    var jsonToken = JSON.stringify({ access: access, token: token });
    console.log(jsonToken);

    var text2 = 'UPDATE users \n      SET token = \'' + jsonToken + '\' WHERE user_id = \'' + result.user_id + '\' RETURNING *';

    _index2.default.query(text2).then(function (newUser) {
      return res.send(newUser.rows[0]);
    }).catch(function (err) {
      return res.send(err);
    });
  }).catch(function (err) {
    return res.send(err);
  });
  // get it back create token and add token field in db
  // insert it, get it back and send to user
};

exports.default = createUserAccount;

//   generateAuthToken() {
//     const access = 'auth';
//     const token = jwt.sign({ id: String(this.id), access }, 'abc').toString();

//     this.token[0] = { access, token };
//   }

//

//   checkPassword(userStringPassword) {
//     return bcrypt.compareSync(userStringPassword, this.password);
//   }

//   clearToken() {
//     this.token = [];

//     return !this.token.length;
//   }
// }