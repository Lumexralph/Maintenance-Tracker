'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _generateToken = require('../controller2/utils/generateToken');

var _generateToken2 = _interopRequireDefault(_generateToken);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _index = require('../db/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * after all tests clear table
 */
var createTables = 'CREATE TABLE users(\n  user_id serial PRIMARY KEY,\n  username VARCHAR (50) UNIQUE NOT NULL,\n  password VARCHAR (500) NOT NULL,\n  email VARCHAR (355) UNIQUE NOT NULL,\n  last_login TIMESTAMP,\n  admin_role BOOL DEFAULT \'f\'\n );\n CREATE TABLE requests (\n  request_id serial PRIMARY KEY,\n  request_title VARCHAR (255) NOT NULL,\n  request_content TEXT NOT NULL,\n  department VARCHAR (255) DEFAULT \'Maintenance\',\n  user_id INT NOT NULL,\n  status VARCHAR (100) DEFAULT \'pending\',\n  FOREIGN KEY (user_id) REFERENCES users (user_id)\n );';

var text = 'DROP TABLE IF EXISTS requests; DROP TABLE IF EXISTS users;';

var userToken = (0, _generateToken2.default)({ user_id: 1 });
var adminToken = (0, _generateToken2.default)({ user_id: 2, admin_role: true });

var user = {
  user: {
    user_id: 1,
    admin_role: false
  }
};

before(function () {
  return _index2.default.query(text).then(function () {
    return _index2.default.query(createTables).then(function (res) {
      return res;
    }).catch(function (err) {
      return err;
    });
  }).catch(function (err) {
    return err;
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
      (0, _expect2.default)(res.header).toHaveProperty('authorization');
      (0, _expect2.default)(res.body).toHaveProperty('message');
      (0, _expect2.default)(res.body.message).toHaveProperty('user_id');
    }).end(done);
  });
});

describe('POST /api/v1/auth/login', function () {

  it('should not login the user with wrong username', function (done) {
    var userRequest = {
      username: "Lumex",
      password: "gatekeeper"
    };

    (0, _supertest2.default)(_app2.default).post('/api/v1/auth/login').send(userRequest).expect(400).expect(function (res) {
      (0, _expect2.default)(res.body).toHaveProperty('message');
      (0, _expect2.default)(res.body.message).toBe('Account does not exist');
    }).end(done);
  });

  it('should not login the user with wrong password', function (done) {
    var userRequest = {
      username: "Lumexy",
      password: "gatekeepr"
    };

    (0, _supertest2.default)(_app2.default).post('/api/v1/auth/login').send(userRequest).expect(400).expect(function (res) {
      (0, _expect2.default)(res.header.authorization).toBeUndefined();
      (0, _expect2.default)(res.body).toHaveProperty('message');
      (0, _expect2.default)(res.body.message).toBe('Password not correct');
    }).end(done);
  });

  it('should login the user', function (done) {
    var userRequest = {
      username: "Lumexy",
      password: "gatekeeper"
    };

    (0, _supertest2.default)(_app2.default).post('/api/v1/auth/login').send(userRequest).expect(200).expect(function (res) {
      (0, _expect2.default)(res.header.authorization).toBeDefined();
      (0, _expect2.default)(res.header).toHaveProperty('authorization');
      (0, _expect2.default)(res.body).toHaveProperty('message');
      (0, _expect2.default)(res.body.message).toBe('Login Successful');
    }).end(done);
  });
});

describe('GET /users/requests', function () {

  it('should get empty request if user has none', function (done) {

    (0, _supertest2.default)(_app2.default).get('/api/v1/users/requests').set('Authorization', userToken).send(user).expect(404).expect(function (res) {
      (0, _expect2.default)(res.body).toHaveProperty('message');
      (0, _expect2.default)(res.body.message).toBe('No requests yet');
    }).end(done);
  });

  it('should get request if user has any', function (done) {
    var text = 'INSERT INTO requests (request_title, request_content, user_id)\n    VALUES\n     (\'Games\',\'PostgreSQL coming Tutorial in school\', 1),\n    (\'Gaming\',\'MysSQL coming Tutorial in school\', 1);';

    _index2.default.query(text).then(function (res) {
      return res;
    }).catch(function (err) {
      return err;
    });

    (0, _supertest2.default)(_app2.default).get('/api/v1/users/requests').set('Authorization', userToken).send(user).expect(200).expect(function (res) {
      (0, _expect2.default)(res.body).toHaveProperty('message');
      (0, _expect2.default)(res.body.message).toHaveLength(2);
    }).end(done);
  });
});

describe('GET /users/requests/:requestId', function () {
  var requestId = 1;

  it('should get a request', function (done) {
    (0, _supertest2.default)(_app2.default).get('/api/v1/users/requests/' + requestId).set('Authorization', userToken).send(user).expect(200).expect(function (res) {
      (0, _expect2.default)(res.body).toHaveLength(1);
      (0, _expect2.default)(res.body[0]['request_title']).toBe('Games');
    }).end(done);
  });

  it('should not get a request', function (done) {
    requestId = 4;

    (0, _supertest2.default)(_app2.default).get('/api/v1/users/requests/' + requestId).set('Authorization', userToken).send(user).expect(404).expect(function (res) {
      (0, _expect2.default)(res.body).toHaveProperty('message');
      (0, _expect2.default)(res.body.message).toBe('Requests not found');
    }).end(done);
  });
});

describe('POST /users/requests', function () {

  it('should not create request missing a field', function (done) {
    var userRequest = {
      content: "Game of the year",
      department: "Repairs"
    };

    (0, _supertest2.default)(_app2.default).post('/api/v1/users/requests/').set('Authorization', userToken).send(userRequest).expect(400).expect(function (res) {
      (0, _expect2.default)(res.body).toHaveProperty('message');
      (0, _expect2.default)(res.body.message).toBe('Ensure no field is empty');
    }).end(done);
  });

  it('should not create request with empty field', function (done) {
    var userRequest = {
      title: "",
      content: "Game of the year",
      department: "Repairs"
    };

    (0, _supertest2.default)(_app2.default).post('/api/v1/users/requests/').set('Authorization', userToken).send(userRequest).expect(400).expect(function (res) {
      (0, _expect2.default)(res.body).toHaveProperty('message');
      (0, _expect2.default)(res.body.message).toBe('Ensure no field is empty');
    }).end(done);
  });

  it('should create request with valid data', function (done) {
    var userRequest = {
      title: "Homecoming",
      content: "Game of the year 2018",
      department: "Repairs",
      user: user
    };

    (0, _supertest2.default)(_app2.default).post('/api/v1/users/requests/').set('Authorization', userToken).send(userRequest).expect(201).expect(function (res) {
      (0, _expect2.default)(res.body).toHaveProperty('message');
      (0, _expect2.default)(res.body.message).toBe('Request created');
    }).end(done);
  });
});

describe('PUT /users/requests/:requestId', function () {
  it('should not update request with wrong requestId', function (done) {
    var requestId = 4;

    var reqBody = {
      "title": "The Game of the year",
      "content": "It is played in the continent",
      user: user
    };

    (0, _supertest2.default)(_app2.default).put('/api/v1/users/requests/' + requestId).set('Authorization', userToken).send(reqBody).expect(404).expect(function (res) {
      (0, _expect2.default)(res.body).toHaveProperty('message');
      (0, _expect2.default)(res.body.message).toBe('Request not found');
    }).end(done);
  });

  it('should update request with valid requestId', function (done) {
    var requestId = 1;

    var reqBody = {
      "title": "The Game of the year",
      "content": "It is played in the continent",
      user: user
    };

    (0, _supertest2.default)(_app2.default).put('/api/v1/users/requests/' + requestId).set('Authorization', userToken).send(reqBody).expect(200).expect(function (res) {
      (0, _expect2.default)(res.body).toHaveProperty('request_id');
      (0, _expect2.default)(res.body.message).toBe('Request not found');
    }).end(done);
  });

  it('should not update approved request', function (done) {
    var requestId = 1;

    var reqBody = {
      "title": "The Game of the year",
      "content": "It is played in the continent",
      "status": "approved",
      user: user
    };

    (0, _supertest2.default)(_app2.default).put('/api/v1/users/requests/' + requestId).set('Authorization', userToken).send(reqBody).expect(401).expect(function (res) {
      (0, _expect2.default)(res.body).toHaveProperty('message');
      (0, _expect2.default)(res.body.message).toBe('You cannot modify request');
    }).end(done);
  });
});

describe('GET /requests', function () {
  it('should not get requests for non-admin', function (done) {
    (0, _supertest2.default)(_app2.default).get('/api/v1/requests').set('Authorization', userToken).expect(401).expect(function (res) {
      (0, _expect2.default)(res.body).toHaveProperty('message');
      (0, _expect2.default)(res.body.message).toBe('only Admin allowed');
    }).end(done);
  });

  it('should get requests for admin', function (done) {
    var admin = {
      admin_role: 'true'
    };
    (0, _supertest2.default)(_app2.default).get('/api/v1/requests').set('Authorization', adminToken).send(admin.admin_role).expect(200).expect(function (res) {
      // expect(res.body.length).toHaveProperty('message');    
      // expect(res.body.message).toBe('only Admin allowed');
    }).end(done);
  });
});