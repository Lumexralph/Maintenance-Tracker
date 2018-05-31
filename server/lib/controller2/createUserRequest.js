'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _index = require('../db/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createUserRequest = function createUserRequest(req, res) {
  var _req$body = req.body,
      title = _req$body.title,
      content = _req$body.content,
      user = _req$body.user,
      _req$body$department = _req$body.department,
      department = _req$body$department === undefined ? 'Maintenance' : _req$body$department;


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

  var text = 'INSERT INTO requests(request_title, request_content, department, user_id) VALUES(\'' + title + '\', \'' + content + '\', \'' + department + '\', \'' + user.user_id + '\') RETURNING *;';

  _index2.default.query(text).then(function (result) {
    return res.status(201).send({ message: result.rows[0] });
  }).catch(function (err) {
    return res.status(400).send({ message: 'Request not created' });
  });

  return undefined;
};

exports.default = createUserRequest;