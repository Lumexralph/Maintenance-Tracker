'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _requesModel = require('../model/reques-model');

var _requesModel2 = _interopRequireDefault(_requesModel);

var _user = require('../model/user');

var _user2 = _interopRequireDefault(_user);

var _dataStore = require('../data-store/data-store');

var _dataStore2 = _interopRequireDefault(_dataStore);

var _userDatastore = require('../data-store/user-datastore');

var _userDatastore2 = _interopRequireDefault(_userDatastore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// create mock user
var user1 = new _user2.default('lumex', 'olumideralph@gmail.com', '12345');
// save in system
_userDatastore2.default.createUser(user1).then(function (user) {
  return user1 = user;
});

describe('POST /users/requests', function () {

  it('should create a new request', function (done) {
    var clientRequest = {
      title: 'Soccer',
      content: 'It is a physical game where there 2 teams of 11 players each'
    };

    (0, _supertest2.default)(_app2.default).post('/api/v1/users/requests').set('x-auth', user1.token[0].token).send(clientRequest).expect(201).expect(function (res) {
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

    (0, _supertest2.default)(_app2.default).post('/api/v1/users/requests').set('x-auth', user1.token[0].token).send(clientRequest).expect(400).expect(function (res) {
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

    (0, _supertest2.default)(_app2.default).post('/api/v1/users/requests').set('x-auth', user1.token[0].token).send(clientRequest).expect(400).expect(function (res) {
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
    (0, _supertest2.default)(_app2.default).get('/api/v1/users/requests').set('x-auth', user1.token[0].token).expect(200).expect(function (res) {
      (0, _expect2.default)(res.body.requests.length).toBe(1);
      (0, _expect2.default)(res.body).toHaveProperty('requests');
      (0, _expect2.default)(_dataStore2.default.getDataSize()).toBe(1);
    }).end(done);
  });
});

describe('GET users/requests/requestId', function () {
  it('should return request', function (done) {
    var returnedObj = {
      title: 'Soccer',
      department: 'Maintenance',
      content: 'It is a physical game where there 2 teams of 11 players each',
      requestStatus: 'accept',
      resolved: false,
      dateCreated: new Date().toDateString()
    };
    var requestId = 1;

    (0, _supertest2.default)(_app2.default).get('/api/v1/users/requests/' + requestId).set('x-auth', user1.token[0].token).expect(200).expect(function (res) {
      (0, _expect2.default)(res.body).toMatchObject(returnedObj);
      (0, _expect2.default)(res.body.title).toBe(returnedObj.title);
      (0, _expect2.default)(_dataStore2.default.validateId(requestId)).toBeTruthy();
    }).end(done);
  });

  it('should not return a  request', function (done) {

    var requestId = 2;

    (0, _supertest2.default)(_app2.default).get('/api/v1/users/requests/' + requestId).set('x-auth', user1.token[0].token).expect(404).expect(function (res) {
      (0, _expect2.default)(res.body).toMatchObject({});
      (0, _expect2.default)(res.body.title).toBeUndefined();
      (0, _expect2.default)(_dataStore2.default.validateId(requestId)).toBeFalsy();
    }).end(done);
  });
});

describe('PUT users/requests/requestId', function () {

  it('should modify and return the new data', function (done) {
    var clientRequest = {
      title: 'Soccer',
      content: 'It is a physical game where there 2 teams of 11 players each',
      department: 'Repairs'
    };

    var returnedObj = {
      title: 'Soccer',
      department: 'Repairs',
      content: 'It is a physical game where there 2 teams of 11 players each',
      requestStatus: 'accept',
      resolved: false,
      dateCreated: new Date().toDateString()
    };
    var requestId = 1;

    (0, _supertest2.default)(_app2.default).put('/api/v1/users/requests/' + requestId).send(clientRequest).set('x-auth', user1.token[0].token).expect(201).expect(function (res) {
      (0, _expect2.default)(res.body).toMatchObject(returnedObj);
      (0, _expect2.default)(res.body).toHaveProperty('department');
      (0, _expect2.default)(res.body.title).toBe(returnedObj.title);
      (0, _expect2.default)(res.body.department).toBe(returnedObj.department);
      (0, _expect2.default)(_dataStore2.default.getDataSize()).toBe(1);
      (0, _expect2.default)(_dataStore2.default.validateId(requestId)).toBeTruthy();
    }).end(done);
  });

  it('should not modify data with invalid requestId', function (done) {
    var clientRequest = {
      title: 'Soccer',
      content: 'It is a physical game where there 2 teams of 11 players each'
    };

    var returnedObj = {
      title: 'Soccer',
      department: 'Maintenance',
      content: 'It is a physical game where there 2 teams of 11 players each',
      requestStatus: 'accept',
      resolved: false,
      dateCreated: new Date().toDateString()
    };
    var requestId = 2;

    (0, _supertest2.default)(_app2.default).put('/api/v1/users/requests/' + requestId).set('x-auth', user1.token[0].token).send(clientRequest).expect(400).expect(function (res) {
      (0, _expect2.default)(res.body).toHaveProperty('message');
      (0, _expect2.default)(_dataStore2.default.getDataSize()).toBe(1);
      (0, _expect2.default)(_dataStore2.default.validateId(requestId)).toBeFalsy();
    }).end(done);
  });
});

describe('POST /users', function () {
  it('should not create a user with invalid email', function (done) {
    var user2 = new _user2.default('mexy', 'olumide@', '2345');

    (0, _supertest2.default)(_app2.default).post('/api/v1/users').send(user2).expect(401).expect(function (res) {
      (0, _expect2.default)(res.body).toHaveProperty('message');
      (0, _expect2.default)(res.body.message).toBe('Please provide a valid email');
      (0, _expect2.default)(user2.token.length).toBe(0);
    }).end(done);
  });

  it('should create user with valid username and email', function (done) {
    var user2 = new _user2.default('mexy', 'olumide@gmail.com', '2345');

    (0, _supertest2.default)(_app2.default).post('/api/v1/users').send(user2).expect(201).expect(function (res) {
      (0, _expect2.default)(res.header).toBeTruthy();
      (0, _expect2.default)(res.header).toHaveProperty('x-auth');
      (0, _expect2.default)(res.header['x-auth']).toBeDefined();
      (0, _expect2.default)(res.body.id).toBe(2);
      (0, _expect2.default)(res.body.password).not.toBe(user2.password);
    }).end(done);
  });

  it('should not create user if email exists', function (done) {
    var user2 = new _user2.default('Lumexmexy', 'olumide@gmail.com', '2345');

    (0, _supertest2.default)(_app2.default).post('/api/v1/users').send(user2).expect(401).expect(function (res) {
      (0, _expect2.default)(res.body).toHaveProperty('message');
      (0, _expect2.default)(res.body.message).toBe('username or email already exists');
      (0, _expect2.default)(user2.token.length).toBe(0);
      (0, _expect2.default)(res.body.id).toBeFalsy();
    }).end(done);
  });

  it('should not create user if username exists', function (done) {
    var user2 = new _user2.default('mexy', 'oljdjumide@gmail.com', '2345');

    (0, _supertest2.default)(_app2.default).post('/api/v1/users').send(user2).expect(401).expect(function (res) {
      (0, _expect2.default)(res.body).toHaveProperty('message');
      (0, _expect2.default)(res.body.message).toBe('username or email already exists');
      (0, _expect2.default)(user2.token.length).toBe(0);
      (0, _expect2.default)(res.body.id).toBeFalsy();
    }).end(done);
  });
});