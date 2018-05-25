'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  user: process.env.DB_USER,
  db: process.env.DB_DATABASE,
  dbtest: process.env.DB_TEST,
  secret: process.env.JWT_SECRET
};

// if (process.env.NODE_ENV )

exports.default = config;