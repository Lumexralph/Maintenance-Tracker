'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('GET / homepage', function () {
  it('should give the homepage', function (done) {

    (0, _supertest2.default)(_app2.default).get('/api/v1/').expect(200).expect(function (res) {
      (0, _expect2.default)(res.body).toBeDefined();
      (0, _expect2.default)(res.body).toHaveProperty('status');
      (0, _expect2.default)(res.body.status).toBe('success');
      (0, _expect2.default)(res.body).toHaveProperty('message');
      (0, _expect2.default)(res.body.message).toBe('Welcome to Maintenance Tracker');
    }).end(done);
  });
});