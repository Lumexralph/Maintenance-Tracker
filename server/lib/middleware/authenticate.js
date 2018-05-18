'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _userDatastore = require('../data-store/user-datastore');

var _userDatastore2 = _interopRequireDefault(_userDatastore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var authenticate = function authenticate(req, res, next) {
  var token = req.header('x-auth');

  // check the token
  _userDatastore2.default.findByToken(token).then(function (user) {
    req.user = user;
    req.token = token;
    next();
  }, function (err) {
    return res.status(401).send({ message: err.message });
  });
};

exports.default = authenticate;