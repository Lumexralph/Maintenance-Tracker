'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _api = require('./api/api2');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

/**
 * Represents the api using non-persistent data
 */
// import apiVersion1 from './api/api1';

var port = process.env.PORT || 3000;

// app.use('/api/v1', apiVersion1);
app.use('/api/v1', _api2.default);

if (!module.parent) {
  app.listen(port);
}

exports.default = app;