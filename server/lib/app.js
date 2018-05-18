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

var _userDatastore = require('./data-store/user-datastore');

var _userDatastore2 = _interopRequireDefault(_userDatastore);

var _user = require('./model/user');

var _user2 = _interopRequireDefault(_user);

var _authenticate = require('./middleware/authenticate');

var _authenticate2 = _interopRequireDefault(_authenticate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

// configure third party middleware
app.use(_bodyParser2.default.json());

// create routes version 1
app.post('/api/v1/users/requests', _authenticate2.default, function (req, res) {
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
app.get('/api/v1/users/requests', _authenticate2.default, function (req, res) {
  _dataStore2.default.getAllData().then(function (requests) {
    return res.status(200).send({ requests: requests });
  }, function (err) {
    return res.status(500).send({
      message: err.message
    });
  });
});

// GET a request from user by id
app.get('/api/v1/users/requests/:requestId', _authenticate2.default, function (req, res) {
  var requestId = req.params.requestId;

  // if validdates requestId go ahead to look for it in DataStorageSystem

  _dataStore2.default.getById(requestId).then(function (request) {
    return res.status(200).send(request);
  }, function (err) {
    return res.status(404).send({
      message: err.message
    });
  });
});

// PUT modify a request by id
app.put('/api/v1/users/requests/:requestId', _authenticate2.default, function (req, res) {
  var requestId = req.params.requestId;

  var data = req.body;

  // update the new data
  _dataStore2.default.getByIdAndUpdate(requestId, data).then(function (newRequest) {
    if (!newRequest) {
      return res.status(404).send({
        message: 'Request to be updated not found'
      });
    }

    res.status(201).send(newRequest);
  }).catch(function (err) {
    return res.status(400).send({
      message: err.message
    });
  });
});

// POST /api/v1/users/ .... user signup
app.post('/api/v1/users', function (req, res) {
  var _req$body2 = req.body,
      username = _req$body2.username,
      email = _req$body2.email,
      password = _req$body2.password;

  // make a new instance

  var userData = new _user2.default(username, email, password);

  // create new user
  _userDatastore2.default.createUser(userData).then(function (user) {
    var id = user.id,
        email = user.email,
        username = user.username,
        password = user.password;


    res.header('x-auth', user.token[0].token).status(201).send({ id: id, email: email, username: username, password: password });
  }, function (err) {
    res.status(401).send({
      message: err.message
    });
  });
});

app.listen(3000, function () {
  return console.log('Started on port 3000');
});

exports.default = app;