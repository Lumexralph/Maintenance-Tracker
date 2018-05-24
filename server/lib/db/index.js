'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pg = require('pg');

var _index = require('../config/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pool = new _pg.Pool({
  user: _index2.default.user,
  host: _index2.default.host,
  database: _index2.default.db,
  password: _index2.default.password,
  port: _index2.default.port
});

var query = function query(text, params, callback) {
  return pool.query(text, params, callback);
};

exports.default = { query: query };