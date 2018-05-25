'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pg = require('pg');

var _index = require('../config/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description {function}
 * to hold the database for production
 */
var query1 = null;

var db = void 0;
if (process.env.NODE_ENV === 'test') {
  db = _index2.default.dbtest;
} else if (process.env.NODE_ENV === 'dev') {
  db = _index2.default.db;
}
/**
 * @param {object} pool
 * @instance of Pool
 * @constructor Pool
 * gets conncection to database
 */

var pool = new _pg.Pool({
  user: _index2.default.user,
  host: _index2.default.host,
  database: db,
  password: _index2.default.password,
  port: _index2.default.port
});

/**
 * @
 */

if (process.env.NODE_ENV === 'production') {
  var client = new _pg.Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true
  });

  client.connect();
  query1 = function query1(text, params, callback) {
    return client.query(text, params, callback);
  };
}

var query2 = function query2(text, params, callback) {
  return pool.query(text, params, callback);
};

var query = void 0;

if (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'test') {
  query = query2;
} else {
  query = query1;
}

exports.default = { query: query };