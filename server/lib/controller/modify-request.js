'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dataStore = require('../data-store/data-store');

var _dataStore2 = _interopRequireDefault(_dataStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var modifyRequest = function modifyRequest(req, res) {
  var requestId = req.params.requestId;

  var data = req.body;

  // update the new data
  _dataStore2.default.getByIdAndUpdate(requestId, data).then(function (newRequest) {
    if (!newRequest) {
      return res.status(404).send({
        message: 'Request to be updated not found'
      });
    }

    return res.status(201).send(newRequest);
  }).catch(function (err) {
    return res.status(400).send({
      message: err.message
    });
  });
};

exports.default = modifyRequest;