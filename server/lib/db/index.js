'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pg = require('pg');

var pool = new _pg.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'spirit',
  port: 5432
});

var query = function query(text, params, callback) {
  return pool.query(text, params, callback);
};

exports.default = { query: query };