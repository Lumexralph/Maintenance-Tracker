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

var _getHomePage = require('../controller2/getHomePage');

var _getHomePage2 = _interopRequireDefault(_getHomePage);

var _createAccount = require('../controller2/createAccount');

var _createAccount2 = _interopRequireDefault(_createAccount);

var _loginUser = require('../controller2/loginUser');

var _loginUser2 = _interopRequireDefault(_loginUser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var api = _express2.default.Router();

// configure third party middleware
api.use(_bodyParser2.default.json());
api.use((0, _morgan2.default)('combined'));

// GET / homepage
api.get('/', _getHomePage2.default);

// POST /auth/signup
api.post('/auth/signup', _createAccount2.default);

// POST /auth/signup
api.post('/auth/login', _loginUser2.default);

exports.default = api;