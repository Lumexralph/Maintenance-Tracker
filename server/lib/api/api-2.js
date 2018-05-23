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

var _index = require('../db/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var api = _express2.default.Router();

// configure third party middleware
api.use(_bodyParser2.default.json());
api.use((0, _morgan2.default)('combined'));

// GET homepage
api.get('/', function (req, res) {
  _index2.default.query('SELECT * FROM Student').then(function (result) {
    return res.send(result);
  }).catch(function (err) {
    return res.send(err);
  });
});

exports.default = api;