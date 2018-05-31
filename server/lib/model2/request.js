'use strict';

var _index = require('../db/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var requestTable = 'CREATE TABLE requests (\n  request_id serial PRIMARY KEY,\n  request_title VARCHAR (255) NOT NULL,\n  request_content TEXT NOT NULL,\n  department VARCHAR (255) DEFAULT \'Maintenance\',\n  user_id INT NOT NULL,\n  status VARCHAR (100) DEFAULT \'pending\',\n  FOREIGN KEY (user_id) REFERENCES users (user_id)\n );';

_index2.default.query(requestTable).then(function (result) {
  return result;
}).catch(function (err) {
  return err;
});