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

var _authenticate = require('../middleware/authenticate');

var _authenticate2 = _interopRequireDefault(_authenticate);

var _createRequest = require('../controller/createRequest');

var _createRequest2 = _interopRequireDefault(_createRequest);

var _getAllRequests = require('../controller/getAllRequests');

var _getAllRequests2 = _interopRequireDefault(_getAllRequests);

var _getRequestId = require('../controller/getRequestId');

var _getRequestId2 = _interopRequireDefault(_getRequestId);

var _modifyRequest = require('../controller/modifyRequest');

var _modifyRequest2 = _interopRequireDefault(_modifyRequest);

var _loginUser = require('../controller/loginUser');

var _loginUser2 = _interopRequireDefault(_loginUser);

var _signupUser = require('../controller/signupUser');

var _signupUser2 = _interopRequireDefault(_signupUser);

var _logoutUser = require('../controller/logoutUser');

var _logoutUser2 = _interopRequireDefault(_logoutUser);

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
api.put('/users/requests/:requestId', _authenticate2.default, _modifyRequest2.default);

// POST /api/v1/users/ .... user signup
api.post('/users', _signupUser2.default);

// POST /users/login {username, password}
api.post('/users/login', _loginUser2.default);

// log out
api.delete('/users/logout', _authenticate2.default, _logoutUser2.default);

exports.default = api;