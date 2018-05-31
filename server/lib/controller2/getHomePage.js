'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const root = '../Maintenance-Tracker/UI/';

var getHomePage = function getHomePage(req, res) {

  res.sendFile(_path2.default.resolve(__dirname, '../../../UI/index.html'));
};

exports.default = getHomePage;