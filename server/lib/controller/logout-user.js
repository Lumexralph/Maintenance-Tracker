'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _userDatastore = require('../data-store/user-datastore');

var _userDatastore2 = _interopRequireDefault(_userDatastore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logoutUser = function logoutUser(req, res) {
  var user = req.user;


  _userDatastore2.default.endUserProcess(user).then(function (result) {
    return res.status(200).send('logged out');
  }, function (err) {
    return res.status(400).send('error');
  });
};

exports.default = logoutUser;