'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../db/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getAllUserRequests = function getAllUserRequests(req, res) {
  var user = req.body.user;


  var text = 'SELECT * FROM users INNER JOIN requests USING (user_id) WHERE user_id=\'' + user.user_id + '\'';

  _index2.default.query(text).then(function (result) {
    if (result.rows.length > 0) {
      return res.status(200).send({ message: result.rows });
    }
    return res.status(404).send({ message: 'No requests yet' });
  }).catch(function (err) {
    return res.status(404).send({ message: 'Request cannot be found' });
  });
};

exports.default = getAllUserRequests;