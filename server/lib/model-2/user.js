'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = function User(username, email, password) {
  _classCallCheck(this, User);

  this.userId = null;
  this.username = username;
  this.email = email;
  this.password = password;
  this.role = 'Non-Admin';
  this.token = [];
};

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

exports.default = User;