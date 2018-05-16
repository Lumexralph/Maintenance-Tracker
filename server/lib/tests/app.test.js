'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _requesModel = require('../model/reques-model');

var _requesModel2 = _interopRequireDefault(_requesModel);

var _dataStore = require('../data-store/data-store');

var _dataStore2 = _interopRequireDefault(_dataStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('POST /users/requests', function () {

  it('should create a new request', function (done) {
    var clientRequest = {
      title: 'Soccer',
      content: 'It is a physical game where there 2 teams of 11 players each'
    };

    (0, _supertest2.default)(_app2.default).post('/api/v1/users/requests').send(clientRequest).expect(201).expect(function (res) {
      (0, _expect2.default)(res.body.title).toBe(clientRequest.title);
    }).end(function (err, res) {
      if (err) {
        return done(err);
      }

      var dataSize = _dataStore2.default.getDataSize();

      (0, _expect2.default)(dataSize).toBe(1);
      done();
    });
  });

  it('should not create a new request with empty field value', function (done) {
    var clientRequest = {
      title: '',
      content: ''
    };

    (0, _supertest2.default)(_app2.default).post('/api/v1/users/requests').send(clientRequest).expect(400).expect(function (res) {
      (0, _expect2.default)(res.body).toHaveProperty('message');
      (0, _expect2.default)(res.body.message).toBe('The field has missing values');
    }).end(function (err, res) {
      if (err) {
        return done(err);
      }

      var dataSize = _dataStore2.default.getDataSize();

      (0, _expect2.default)(dataSize).toBe(1);
      done();
    });
  });

  it('should not create a new request with empty field', function (done) {
    var clientRequest = {
      content: ''
    };

    (0, _supertest2.default)(_app2.default).post('/api/v1/users/requests').send(clientRequest).expect(400).expect(function (res) {
      (0, _expect2.default)(res.body).toHaveProperty('message');
      (0, _expect2.default)(res.body.message).toBe('One of the field is empty');
    }).end(function (err, res) {
      if (err) {
        return done(err);
      }

      var dataSize = _dataStore2.default.getDataSize();

      (0, _expect2.default)(dataSize).toBe(1);
      done();
    });
  });
});

describe('GET /users/requests', function (done) {

  it('should return all requests', function (done) {
    (0, _supertest2.default)(_app2.default).get('/api/v1/users/requests').expect(200).expect(function (res) {
      (0, _expect2.default)(res.body.requests.length).toBe(1);
      (0, _expect2.default)(res.body).toHaveProperty('requests');
      (0, _expect2.default)(_dataStore2.default.getDataSize()).toBe(1);
    }).end(done);
  });
});