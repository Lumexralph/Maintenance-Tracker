'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _index = require('../db/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var updateUserRequest = function updateUserRequest(req, res) {
  var requestId = req.params.requestId;
  var _req$body = req.body,
      title = _req$body.title,
      content = _req$body.content,
      user = _req$body.user,
      _req$body$department = _req$body.department,
      department = _req$body$department === undefined ? 'Maintenance' : _req$body$department,
      status = _req$body.status;


  if (!user.admin_role && status === 'approved') {
    return res.status(401).send({ message: 'You cannot modify request' });
  }

  if (!title || !content) {
    return res.status(400).send({
      message: 'Ensure no field is empty'
    });
  }

  if (_validator2.default.isEmpty(title) || _validator2.default.isEmpty(content)) {
    return res.status(400).send({
      message: 'Ensure no field is empty'
    });
  }

  var text = 'UPDATE requests\n  SET request_title=\'' + title + '\', request_content=\'' + content + '\', department=\'' + department + '\'\n  FROM\n  users\n  WHERE\n  requests.user_id = users.user_id AND request_id = \'' + requestId + '\' AND requests.user_id = \'' + user.user_id + '\';';

  _index2.default.query(text).then(function (result) {
    if (result.rowCount === 0) {
      return res.status(404).send({ message: 'Request not found' });
    }

    var text2 = 'SELECT * FROM requests WHERE request_id = \'' + requestId + '\'';

    return _index2.default.query(text2).then(function (request) {
      return res.send(request.rows[0]);
    }).catch(function (err) {
      return res.status(404).send({ message: 'Request not found' });
    });
  }).catch(function (err) {
    return res.status.send({ message: err });
  });
};

exports.default = updateUserRequest;