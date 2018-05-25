'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _index = require('../db/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Before every test clear table
 */
beforeEach(function (done) {
  var text = 'DELETE FROM users';
  _index2.default.query(text).then(function () {
    return done();
  });
});

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

describe('POST /api/v1/auth/signup', function () {
  it('should not create user with invalid email', function (done) {
    var userRequest = {
      username: "Looemuu",
      password1: "gatekeeper",
      password2: "gatekeeper",
      email: "oldrlpkookh@"
    };

    (0, _supertest2.default)(_app2.default).post('/api/v1/auth/signup').send(userRequest).expect(400).expect(function (res) {
      (0, _expect2.default)(res.body).toHaveProperty('status');
      (0, _expect2.default)(res.body).toHaveProperty('message');
      (0, _expect2.default)(res.body.status).toBe('Error');
      (0, _expect2.default)(res.body.message).toBe('Please, provide valid email');
    }).end(done);
  });

  it('should not create user with empty field', function (done) {
    var userRequest = {
      username: "",
      password1: "gatekeeper",
      password2: "gatekeeper",
      email: "oldrlpkookh@gmail.com"
    };

    (0, _supertest2.default)(_app2.default).post('/api/v1/auth/signup').send(userRequest).expect(400).expect(function (res) {
      (0, _expect2.default)(res.body).toHaveProperty('status');
      (0, _expect2.default)(res.body).toHaveProperty('message');
      (0, _expect2.default)(res.body.status).toBe('Error');
      (0, _expect2.default)(res.body.message).toBe('Ensure no field is empty');
    }).end(done);
  });

  it('should not create user with different passwords', function (done) {
    var userRequest = {
      username: "Lumexy",
      password1: "gatekee",
      password2: "gatekeeper",
      email: "oldrlpkookh@gmail.com"
    };

    (0, _supertest2.default)(_app2.default).post('/api/v1/auth/signup').send(userRequest).expect(400).expect(function (res) {
      (0, _expect2.default)(res.body).toHaveProperty('status');
      (0, _expect2.default)(res.body).toHaveProperty('message');
      (0, _expect2.default)(res.body.status).toBe('Error');
      (0, _expect2.default)(res.body.message).toBe('Passwords do not match');
    }).end(done);
  });

  it('should create user', function (done) {
    var userRequest = {
      username: "Lumexy",
      password1: "gatekeeper",
      password2: "gatekeeper",
      email: "oldrlpkookh@gmail.com"
    };

    (0, _supertest2.default)(_app2.default).post('/api/v1/auth/signup').send(userRequest).expect(201).expect(function (res) {
      (0, _expect2.default)(res.body).toHaveProperty('status');
      (0, _expect2.default)(res.body).toHaveProperty('message');
      (0, _expect2.default)(res.body.status).toBe('success');
      (0, _expect2.default)(res.body.message).toHaveProperty('user_id');
    }).end(done);
  });
});