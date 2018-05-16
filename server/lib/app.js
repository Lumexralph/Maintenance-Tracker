'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _requesModel = require('./model/reques-model');

var _requesModel2 = _interopRequireDefault(_requesModel);

var _dataStore = require('./data-store/data-store');

var _dataStore2 = _interopRequireDefault(_dataStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

// configure third party middleware
app.use(_bodyParser2.default.json());
// create routes version 1
app.post('/api/v1/users/requests', function (req, res) {
  // check and validate the data
  if (!req.body.hasOwnProperty('content') || !req.body.hasOwnProperty('title')) {
    return res.status(400).send({ message: 'One of the field is empty' });
  }
  if (!req.body.title || !req.body.content) {
    return res.status(400).send({ message: 'The field has missing values' });
  }

  var _req$body = req.body,
      title = _req$body.title,
      content = _req$body.content;

  var newRequest = new _requesModel2.default(title, content);

  // Add the new request
  _dataStore2.default.createData(newRequest).then(function (data) {
    return res.status(201).send(data);
  }, function (err) {
    return res.status(400).send(err.message);
  });
});

// GET all requests
app.get('/api/v1/users/requests', function (req, res) {
  _dataStore2.default.getAllData().then(function (requests) {
    return res.status(200).send({ requests: requests });
  }, function (err) {
    return res.status(500).send({
      message: err.message
    });
  });
});

// GET a request from user by id
app.get('/api/v1/users/requests/:requestId', function (req, res) {
  var requestId = req.params.requestId;
  res.send(req.params);

  // first validate the id
});

app.listen(3000, function () {
  return console.log('Started on port 3000');
});

exports.default = app;