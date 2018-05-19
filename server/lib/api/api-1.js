

Object.defineProperty(exports, '__esModule', {
  value: true,
});

const _express = require('express');

const _express2 = _interopRequireDefault(_express);

const _bodyParser = require('body-parser');

const _bodyParser2 = _interopRequireDefault(_bodyParser);

const _requesModel = require('../model/reques-model');

const _requesModel2 = _interopRequireDefault(_requesModel);

const _dataStore = require('../data-store/data-store');

const _dataStore2 = _interopRequireDefault(_dataStore);

const _userDatastore = require('../data-store/user-datastore');

const _userDatastore2 = _interopRequireDefault(_userDatastore);

const _user = require('../model/user');

const _user2 = _interopRequireDefault(_user);

const _authenticate = require('../middleware/authenticate');

const _authenticate2 = _interopRequireDefault(_authenticate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const api = _express2.default.Router();

// configure third party middleware
api.use(_bodyParser2.default.json());

// create routes version 1
api.post('/users/requests', _authenticate2.default, (req, res) => {
  // check and validate the data
  if (!req.body.hasOwnProperty('content') || !req.body.hasOwnProperty('title')) {
    return res.status(400).send({ message: 'One of the field is empty' });
  }
  if (!req.body.title || !req.body.content) {
    return res.status(400).send({ message: 'The field has missing values' });
  }

  let _req$body = req.body,
    title = _req$body.title,
    content = _req$body.content;

  const newRequest = new _requesModel2.default(title, content);

  // Add the new request
  _dataStore2.default.createData(newRequest).then(data => res.status(201).send(data), err => res.status(400).send(err.message));
});

// GET all requests
api.get('/users/requests', _authenticate2.default, (req, res) => {
  _dataStore2.default.getAllData().then(requests => res.status(200).send({ requests }), err => res.status(500).send({
    message: err.message,
  }));
});

// GET a request from user by id
api.get('/users/requests/:requestId', _authenticate2.default, (req, res) => {
  const requestId = req.params.requestId;

  // if validdates requestId go ahead to look for it in DataStorageSystem

  _dataStore2.default.getById(requestId).then(request => res.status(200).send(request), err => res.status(404).send({
    message: err.message,
  }));
});

// PUT modify a request by id
api.put('/users/requests/:requestId', _authenticate2.default, (req, res) => {
  const requestId = req.params.requestId;

  const data = req.body;

  // update the new data
  _dataStore2.default.getByIdAndUpdate(requestId, data).then((newRequest) => {
    if (!newRequest) {
      return res.status(404).send({
        message: 'Request to be updated not found',
      });
    }

    res.status(201).send(newRequest);
  }).catch(err => res.status(400).send({
    message: err.message,
  }));
});

// POST /api/v1/users/ .... user signup
api.post('/users', (req, res) => {
  let _req$body2 = req.body,
    username = _req$body2.username,
    email = _req$body2.email,
    password = _req$body2.password;

  // make a new instance

  const userData = new _user2.default(username, email, password);

  // create new user
  _userDatastore2.default.createUser(userData).then((user) => {
    let id = user.id,
      email = user.email,
      username = user.username,
      password = user.password;


    res.header('x-auth', user.token[0].token).status(201).send({
      id, email, username, password,
    });
  }, (err) => {
    res.status(400).send({
      message: err.message,
    });
  });
});

// POST /users/login {username, password}
api.post('/users/login', (req, res) => {
  let _req$body3 = req.body,
    username = _req$body3.username,
    password = _req$body3.password;


  _userDatastore2.default.findByCredentials({ username, password }).then((user) => {
    res.header('x-auth', user.token[0].token).status(200).send(user);
  }, (err) => {
    res.status(401).send({ message: err.message });
  });
});

// log out
api.delete('/users/logout', _authenticate2.default, (req, res) => {
  const user = req.user;

  _userDatastore2.default.endUserProcess(user).then(result => res.status(200).send('logged out'), err => res.status(400).send('error'));
});

exports.default = api;
