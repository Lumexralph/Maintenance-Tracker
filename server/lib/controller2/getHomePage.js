'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getHomePage = function getHomePage(req, res) {
  res.status(200).send({
    status: 'success',
    message: 'Welcome to Maintenance Tracker'
  });
};

exports.default = getHomePage;