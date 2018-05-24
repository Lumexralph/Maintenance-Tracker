'use strict';

var _index = require('../db/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createUserTable = 'CREATE TABLE users(\n  user_id serial PRIMARY KEY,\n  username VARCHAR (50) UNIQUE NOT NULL,\n  password VARCHAR (500) NOT NULL,\n  email VARCHAR (355) UNIQUE NOT NULL,\n  last_login TIMESTAMP,\n  admin_role BOOL DEFAULT \'f\',\n  token json\n )';

_index2.default.query(createUserTable).then(function (result) {
  return result;
}).catch(function (err) {
  return err;
});