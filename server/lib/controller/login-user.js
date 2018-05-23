'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _userDatastore = require('../data-store/user-datastore');

var _userDatastore2 = _interopRequireDefault(_userDatastore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loginUser = function loginUser(req, res) {
  var _req$body = req.body,
      username = _req$body.username,
      password = _req$body.password;


  _userDatastore2.default.findByCredentials({ username: username, password: password }).then(function (user) {
    res.header('x-auth', user.token[0].token).status(200).send(user);
  }, function (err) {
    res.status(401).send({ message: err.message });
  });
};

exports.default = loginUser;