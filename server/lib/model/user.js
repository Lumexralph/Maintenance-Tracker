

Object.defineProperty(exports, '__esModule', {
  value: true,
});

const _createClass = (function () { function defineProperties(target, props) { for (let i = 0; i < props.length; i++) { const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }());

const _jsonwebtoken = require('jsonwebtoken');

const _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

const _bcryptjs = require('bcryptjs');

const _bcryptjs2 = _interopRequireDefault(_bcryptjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

// this class will build new instances of users that will be stored
const User = (function () {
  function User(username, email, password) {
    _classCallCheck(this, User);

    this.id = null;
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = 'Non-Admin';
    this.token = [];
  }

  _createClass(User, [{
    key: 'generateAuthToken',
    value: function generateAuthToken() {
      const access = 'auth';
      const token = _jsonwebtoken2.default.sign({ id: String(this.id), access }, 'abc').toString();

      this.token[0] = { access, token };
    },
  }, {
    key: 'hashPassword',
    value: function hashPassword() {
      const salt = _bcryptjs2.default.genSaltSync(10);
      const hash = _bcryptjs2.default.hashSync(this.password, salt);

      // replace with the hashed password
      this.password = hash;
    },
  }, {
    key: 'checkPassword',
    value: function checkPassword(userStringPassword) {
      return _bcryptjs2.default.compareSync(userStringPassword, this.password);
    },
  }, {
    key: 'clearToken',
    value: function clearToken() {
      this.token = [];

      return !this.token.length;
    },
  }]);

  return User;
}());

exports.default = User;
