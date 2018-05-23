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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createUserAccount = function createUserAccount(req, res) {
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
    res.status(400).send({
      status: 'Error',
      message: 'Ensure no field is empty'
    });
  }

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

  // hash the password just one

  // insert data in db 

  // get it back create token and add token field in db

  // insert it, get it back and send to user
};

exports.default = createUserAccount;

//   generateAuthToken() {
//     const access = 'auth';
//     const token = jwt.sign({ id: String(this.id), access }, 'abc').toString();

//     this.token[0] = { access, token };
//   }

//   hashPassword() {
//     const salt = bcrypt.genSaltSync(10);
//     const hash = bcrypt.hashSync(this.password, salt);

//     // replace with the hashed password
//     this.password = hash;
//   }

//   checkPassword(userStringPassword) {
//     return bcrypt.compareSync(userStringPassword, this.password);
//   }

//   clearToken() {
//     this.token = [];

//     return !this.token.length;
//   }
// }