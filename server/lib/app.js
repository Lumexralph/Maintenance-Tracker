'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _requesModel = require('./model/reques-model');

var _requesModel2 = _interopRequireDefault(_requesModel);

var _dataStore = require('./data-store/data-store');

var _dataStore2 = _interopRequireDefault(_dataStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

// configure third party middleware
app.use(_bodyParser2.default.json());
// create routes version 1
app.post('/api/v1/users/requests', function (req, res) {
  var _req$body = req.body,
      title = _req$body.title,
      content = _req$body.content;

  var newRequest = new _requesModel2.default(title, content);

  // Add the new request
  _dataStore2.default.createData(newRequest).then(function (data) {
    return res.status(201).send(data);
  }, function (e) {
    return res.status(400).send(e.message);
  });
});

app.listen(3000, function () {
  return console.log('Started on port 3000');
});