'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _api = require('./api/api1');

var _api2 = _interopRequireDefault(_api);

var _api3 = require('./api/api2');

var _api4 = _interopRequireDefault(_api3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Represents the api using non-persistent data
 */
var app = (0, _express2.default)();
var port = process.env.PORT || 3000;

// app.use('/api/v1', apiVersion1);
app.use('/api/v1', _api4.default);

if (!module.parent) {
  app.listen(port);
}

exports.default = app;