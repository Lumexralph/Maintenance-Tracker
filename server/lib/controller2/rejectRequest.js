'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../db/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rejectRequest = function rejectRequest(req, res) {
  var requestId = req.params.requestId;
  var _req$body = req.body,
      user = _req$body.user,
      status = _req$body.status;


  if (!user.admin_role) {
    return res.status(401).send({ message: 'You cannot modify request' });
  }

  var text = 'UPDATE requests\n  SET status = \'rejected\'\n  WHERE\n  request_id = ' + requestId + ';';

  var text2 = 'SELECT * FROM requests WHERE request_id = \'' + requestId + '\'';

  return _index2.default.query(text).then(function (result) {
    if (result.rowCount === 0) {
      return res.status(404).send({ message: 'Request not found' });
    }

    return _index2.default.query(text2).then(function (request) {
      return res.send(request.rows[0]);
    }).catch(function (err) {
      return res.status(404).send({ message: 'Request not found' });
    });
  }).catch(function (err) {
    return res.status.send({ message: err });
  });
};

exports.default = rejectRequest;