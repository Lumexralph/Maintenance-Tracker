'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _userRequest = require('../model/user-request');

var _userRequest2 = _interopRequireDefault(_userRequest);

var _dataStore = require('../data-store/data-store');

var _dataStore2 = _interopRequireDefault(_dataStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createUserRequest = function createUserRequest(req, res) {
  // check and validate the data
  if (!Object.prototype.hasOwnProperty.call(req.body, 'content') || !Object.prototype.hasOwnProperty.call(req.body, 'title')) {
    return res.status(400).send({ message: 'One of the field is empty' });
  }
  if (!req.body.title || !req.body.content) {
    return res.status(400).send({ message: 'The field has missing values' });
  }

  var _req$body = req.body,
      title = _req$body.title,
      content = _req$body.content;

  var newRequest = new _userRequest2.default(title, content);

  // Add the new request
  _dataStore2.default.createData(newRequest).then(function (data) {
    return res.status(201).send(data);
  }, function (err) {
    return res.status(400).send(err.message);
  });

  return undefined;
};

exports.default = createUserRequest;