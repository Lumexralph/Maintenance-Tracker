'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _datastore = require('../datastore/datastore');

var _datastore2 = _interopRequireDefault(_datastore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getAllRequests = function getAllRequests(req, res) {
  _datastore2.default.getAllData().then(function (requests) {
    return res.status(200).send({ requests: requests });
  }, function (err) {
    return res.status(500).send({
      message: err.message
    });
  });
};

exports.default = getAllRequests;