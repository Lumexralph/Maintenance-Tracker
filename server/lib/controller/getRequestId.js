'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _datastore = require('../datastore/datastore');

var _datastore2 = _interopRequireDefault(_datastore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getRequestById = function getRequestById(req, res) {
  var requestId = req.params.requestId;

  // if validdates requestId go ahead to look for it in DataStorageSystem

  _datastore2.default.getById(requestId).then(function (request) {
    return res.status(200).send(request);
  }, function (err) {
    return res.status(404).send({
      message: err.message
    });
  });
};

exports.default = getRequestById;