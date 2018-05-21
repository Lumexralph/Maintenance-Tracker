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

var _dataStore = require('../data-store/data-store');

var _dataStore2 = _interopRequireDefault(_dataStore);

var _userDatastore = require('../data-store/user-datastore');

var _userDatastore2 = _interopRequireDefault(_userDatastore);

var _user = require('../model/user');

var _user2 = _interopRequireDefault(_user);

var _authenticate = require('../middleware/authenticate');

var _authenticate2 = _interopRequireDefault(_authenticate);

var _createRequest = require('../controller/create-request');

var _createRequest2 = _interopRequireDefault(_createRequest);

var _getAllRequests = require('../controller/get-all-requests');

var _getAllRequests2 = _interopRequireDefault(_getAllRequests);

var _getRequestId = require('../controller/get-request-id');

var _getRequestId2 = _interopRequireDefault(_getRequestId);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var api = _express2.default.Router();

// configure third party middleware
api.use(_bodyParser2.default.json());
api.use((0, _morgan2.default)('combined'));

// create routes version 1
api.post('/users/requests', _authenticate2.default, _createRequest2.default);

// GET all requests
api.get('/users/requests', _authenticate2.default, _getAllRequests2.default);

// GET a request from user by id
api.get('/users/requests/:requestId', _authenticate2.default, _getRequestId2.default);

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
  var _req$body = req.body;
  username = _req$body.username;
  email = _req$body.email;
  password = _req$body.password;
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
  var _req$body2 = req.body,
      username = _req$body2.username,
      password = _req$body2.password;


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