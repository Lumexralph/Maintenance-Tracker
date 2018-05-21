'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dataStore = require('../data-store/data-store');

var _dataStore2 = _interopRequireDefault(_dataStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getRequestById = function getRequestById(req, res) {
  var requestId = req.params.requestId;

  // if validdates requestId go ahead to look for it in DataStorageSystem

  _dataStore2.default.getById(requestId).then(function (request) {
    return res.status(200).send(request);
  }, function (err) {
    return res.status(404).send({
      message: err.message
    });
  });
};

exports.default = getRequestById;