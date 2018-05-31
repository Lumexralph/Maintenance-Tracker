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

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _api = require('./api/api2');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

// configure third party middleware


/**
 * Represents the api using non-persistent data
 */
// import apiVersion1 from './api/api1';
app.use(_bodyParser2.default.json());
app.use((0, _morgan2.default)('combined'));
app.use('/', _express2.default.static(_path2.default.resolve(__dirname, '../../UI/')));

var port = process.env.PORT || 3000;

app.use('/api/v1', _api2.default);
// app.use('/api/v1', apiVersion2);

if (!module.parent) {
  app.listen(port);
}

exports.default = app;