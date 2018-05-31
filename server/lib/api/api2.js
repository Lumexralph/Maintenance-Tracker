'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _getHomePage = require('../controller2/getHomePage');

var _getHomePage2 = _interopRequireDefault(_getHomePage);

var _createAccount = require('../controller2/createAccount');

var _createAccount2 = _interopRequireDefault(_createAccount);

var _loginUser = require('../controller2/loginUser');

var _loginUser2 = _interopRequireDefault(_loginUser);

var _getAllUserRequest = require('../controller2/getAllUserRequest');

var _getAllUserRequest2 = _interopRequireDefault(_getAllUserRequest);

var _getUserRequestById = require('../controller2/getUserRequestById');

var _getUserRequestById2 = _interopRequireDefault(_getUserRequestById);

var _createUserRequest = require('../controller2/createUserRequest');

var _createUserRequest2 = _interopRequireDefault(_createUserRequest);

var _updateUserRequest = require('../controller2/updateUserRequest');

var _updateUserRequest2 = _interopRequireDefault(_updateUserRequest);

var _getAllRequest = require('../controller2/getAllRequest');

var _getAllRequest2 = _interopRequireDefault(_getAllRequest);

var _approveRequest = require('../controller2/approveRequest');

var _approveRequest2 = _interopRequireDefault(_approveRequest);

var _rejectRequest = require('../controller2/rejectRequest');

var _rejectRequest2 = _interopRequireDefault(_rejectRequest);

var _resolveRequest = require('../controller2/resolveRequest');

var _resolveRequest2 = _interopRequireDefault(_resolveRequest);

var _authenticate = require('../middleware2/authenticate');

var _authenticate2 = _interopRequireDefault(_authenticate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var api = _express2.default.Router();

// GET / homepage
api.get('/', _getHomePage2.default);

// POST /auth/signup
api.post('/auth/signup', _createAccount2.default);

// POST /auth/signup
api.post('/auth/login', _loginUser2.default);

// GET /users/requests
api.get('/users/requests', _authenticate2.default, _getAllUserRequest2.default);

// GET a request from user by requestid
api.get('/users/requests/:requestId', _authenticate2.default, _getUserRequestById2.default);

// create user request
api.post('/users/requests', _authenticate2.default, _createUserRequest2.default);

// create user request
api.put('/users/requests/:requestId', _authenticate2.default, _updateUserRequest2.default);

/**
 * get all application requests
 * also filter requests if there's query
 * /request?filter={value}
 */
api.get('/requests', _authenticate2.default, _getAllRequest2.default);

/**
 * approve a request
 */
api.put('/requests/:requestId/approve', _authenticate2.default, _approveRequest2.default);

/**
 * disapprove a request
 */
api.put('/requests/:requestId/disapprove', _authenticate2.default, _rejectRequest2.default);

/**
 * resolve a request
 */
api.put('/requests/:requestId/resolve', _authenticate2.default, _resolveRequest2.default);

exports.default = api;