'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// import db from '../db/index';

var getHomePage = function getHomePage(req, res) {
  res.status(200).send({
    status: 'success',
    message: 'Welcome to Maintenance Tracker'
  });
};

exports.default = getHomePage;

// db.query('SELECT * FROM Student')
//     .then(result => res.status(200).send(result))
//     .catch(err => res.status(404).send(err));