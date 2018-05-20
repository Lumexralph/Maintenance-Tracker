'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _requesModel = require('../model/reques-model');

var _requesModel2 = _interopRequireDefault(_requesModel);

var _dataStore = require('../data-store/data-store');

var _dataStore2 = _interopRequireDefault(_dataStore);

var _userDatastore = require('../data-store/user-datastore');

var _userDatastore2 = _interopRequireDefault(_userDatastore);

var _user = require('../model/user');

var _user2 = _interopRequireDefault(_user);

var _authenticate = require('../middleware/authenticate');

var _authenticate2 = _interopRequireDefault(_authenticate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var api = _express2.default.Router();

// configure third party middleware
api.use(_bodyParser2.default.json());
api.use((0, _morgan2.default)('combined'));

// create routes version 1
api.post('/users/requests', _authenticate2.default, function (req, res) {
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

  var newRequest = new _requesModel2.default(title, content);

  // Add the new request
  _dataStore2.default.createData(newRequest).then(function (data) {
    return res.status(201).send(data);
  }, function (err) {
    return res.status(400).send(err.message);
  });

  return undefined;
});

// GET all requests
api.get('/users/requests', _authenticate2.default, function (req, res) {
  _dataStore2.default.getAllData().then(function (requests) {
    return res.status(200).send({ requests: requests });
  }, function (err) {
    return res.status(500).send({
      message: err.message
    });
  });
});

// GET a request from user by id
api.get('/users/requests/:requestId', _authenticate2.default, function (req, res) {
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
api.put('/users/requests/:requestId', _authenticate2.default, function (req, res) {
  var requestId = req.params.requestId;

  var data = req.body;

  // update the new data
  _dataStore2.default.getByIdAndUpdate(requestId, data).then(function (newRequest) {
    if (!newRequest) {
      return res.status(404).send({
        message: 'Request to be updated not found'
      });
    }

    return res.status(201).send(newRequest);
  }).catch(function (err) {
    return res.status(400).send({
      message: err.message
    });
  });
});

// POST /api/v1/users/ .... user signup
api.post('/users', function (req, res) {
  var id = void 0;
  var username = void 0;
  var email = void 0;
  var password = void 0;


  // make a new instance
  var _req$body2 = req.body;
  username = _req$body2.username;
  email = _req$body2.email;
  password = _req$body2.password;
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
});

// POST /users/login {username, password}
api.post('/users/login', function (req, res) {
  var _req$body3 = req.body,
      username = _req$body3.username,
      password = _req$body3.password;


  _userDatastore2.default.findByCredentials({ username: username, password: password }).then(function (user) {
    res.header('x-auth', user.token[0].token).status(200).send(user);
  }, function (err) {
    res.status(401).send({ message: err.message });
  });
});

// log out
api.delete('/users/logout', _authenticate2.default, function (req, res) {
  var user = req.user;


  _userDatastore2.default.endUserProcess(user).then(function (result) {
    return res.status(200).send('logged out');
  }, function (err) {
    return res.status(400).send('error');
  });
});

exports.default = api;