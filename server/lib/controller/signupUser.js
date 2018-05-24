'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require('../model/user');

var _user2 = _interopRequireDefault(_user);

var _userDatastore = require('../datastore/userDatastore');

var _userDatastore2 = _interopRequireDefault(_userDatastore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var signupUser = function signupUser(req, res) {
  var id = void 0;
  var username = void 0;
  var email = void 0;
  var password = void 0;


  // make a new instance
  var _req$body = req.body;
  username = _req$body.username;
  email = _req$body.email;
  password = _req$body.password;
  var userData = new _user2.default(username, email, password);

  // create new user
  _userDatastore2.default.createUser(userData).then(function (user) {
    id = user.id;
    email = user.email;
    username = user.username;
    password = user.password;


    res.header('x-auth', user.token[0].token).status(201).send({
      id: id, email: email, username: username, password: password
    });
  }, function (err) {
    res.status(400).send({
      message: err.message
    });
  });
};

exports.default = signupUser;