'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../db/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getAllRequest = function getAllRequest(req, res) {
  var user = req.body.user;
  var filter = req.query.filter;

  // if (!user.admin_role) {
  //   return res.status(401).send({ message: 'only Admin allowed' });
  // }

  if (filter) {
    var _text = 'SELECT * \n    FROM requests\n    WHERE status = \'' + filter + '\'\n    ORDER BY request_id ASC;';

    return _index2.default.query(_text).then(function (result) {
      return res.status(200).send(result.rows);
    }).catch(function (err) {
      return res.status(400).send({ message: 'Request cannot be filtered' });
    });
  }

  var text = 'SELECT * FROM requests ORDER BY request_id ASC;';

  return _index2.default.query(text).then(function (result) {
    return res.status(200).send(result.rows);
  }).catch(function (err) {
    return res.status(501);
  });
};

exports.default = getAllRequest;