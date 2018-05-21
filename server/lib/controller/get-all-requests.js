'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dataStore = require('../data-store/data-store');

var _dataStore2 = _interopRequireDefault(_dataStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getAllRequests = function getAllRequests(req, res) {
  _dataStore2.default.getAllData().then(function (requests) {
    return res.status(200).send({ requests: requests });
  }, function (err) {
    return res.status(500).send({
      message: err.message
    });
  });
};

exports.default = getAllRequests;