

const _expect = require('expect');

const _expect2 = _interopRequireDefault(_expect);

const _supertest = require('supertest');

const _supertest2 = _interopRequireDefault(_supertest);

const _app = require('../app');

const _app2 = _interopRequireDefault(_app);

const _requesModel = require('../model/reques-model');

const _requesModel2 = _interopRequireDefault(_requesModel);

const _user = require('../model/user');

const _user2 = _interopRequireDefault(_user);

const _dataStore = require('../data-store/data-store');

const _dataStore2 = _interopRequireDefault(_dataStore);

const _userDatastore = require('../data-store/user-datastore');

const _userDatastore2 = _interopRequireDefault(_userDatastore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// create mock user
let user1 = new _user2.default('lumex', 'olumideralph@gmail.com', '12345');
// save in system
_userDatastore2.default.createUser(user1).then(user => user1 = user);

describe('POST /users/requests', () => {
  it('should create a new request', (done) => {
    const clientRequest = {
      title: 'Soccer',
      content: 'It is a physical game where there 2 teams of 11 players each',
    };

    (0, _supertest2.default)(_app2.default).post('/api/v1/users/requests').set('x-auth', user1.token[0].token).send(clientRequest)
      .expect(201)
      .expect((res) => {
        (0, _expect2.default)(res.body.title).toBe(clientRequest.title);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        const dataSize = _dataStore2.default.getDataSize();

        (0, _expect2.default)(dataSize).toBe(1);
        done();
      });
  });

  it('should not create a new request with empty field value', (done) => {
    const clientRequest = {
      title: '',
      content: '',
    };

    (0, _supertest2.default)(_app2.default).post('/api/v1/users/requests').set('x-auth', user1.token[0].token).send(clientRequest)
      .expect(400)
      .expect((res) => {
        (0, _expect2.default)(res.body).toHaveProperty('message');
        (0, _expect2.default)(res.body.message).toBe('The field has missing values');
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        const dataSize = _dataStore2.default.getDataSize();

        (0, _expect2.default)(dataSize).toBe(1);
        done();
      });
  });

  it('should not create a new request with empty field', (done) => {
    const clientRequest = {
      content: '',
    };

    (0, _supertest2.default)(_app2.default).post('/api/v1/users/requests').set('x-auth', user1.token[0].token).send(clientRequest)
      .expect(400)
      .expect((res) => {
        (0, _expect2.default)(res.body).toHaveProperty('message');
        (0, _expect2.default)(res.body.message).toBe('One of the field is empty');
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        const dataSize = _dataStore2.default.getDataSize();

        (0, _expect2.default)(dataSize).toBe(1);
        done();
      });
  });
});

describe('GET /users/requests', (done) => {
  it('should return all requests', (done) => {
    (0, _supertest2.default)(_app2.default).get('/api/v1/users/requests').set('x-auth', user1.token[0].token).expect(200)
      .expect((res) => {
        (0, _expect2.default)(res.body.requests.length).toBe(1);
        (0, _expect2.default)(res.body).toHaveProperty('requests');
        (0, _expect2.default)(_dataStore2.default.getDataSize()).toBe(1);
      })
      .end(done);
  });
});

describe('GET users/requests/requestId', () => {
  it('should return request', (done) => {
    const returnedObj = {
      title: 'Soccer',
      department: 'Maintenance',
      content: 'It is a physical game where there 2 teams of 11 players each',
      requestStatus: 'accept',
      resolved: false,
      dateCreated: new Date().toDateString(),
    };
    const requestId = 1;

    (0, _supertest2.default)(_app2.default).get(`/api/v1/users/requests/${requestId}`).set('x-auth', user1.token[0].token).expect(200)
      .expect((res) => {
        (0, _expect2.default)(res.body).toMatchObject(returnedObj);
        (0, _expect2.default)(res.body.title).toBe(returnedObj.title);
        (0, _expect2.default)(_dataStore2.default.validateId(requestId)).toBeTruthy();
      })
      .end(done);
  });

  it('should not return a  request', (done) => {
    const requestId = 2;

    (0, _supertest2.default)(_app2.default).get(`/api/v1/users/requests/${requestId}`).set('x-auth', user1.token[0].token).expect(404)
      .expect((res) => {
        (0, _expect2.default)(res.body).toMatchObject({});
        (0, _expect2.default)(res.body.title).toBeUndefined();
        (0, _expect2.default)(_dataStore2.default.validateId(requestId)).toBeFalsy();
      })
      .end(done);
  });
});

describe('PUT users/requests/requestId', () => {
  it('should modify and return the new data', (done) => {
    const clientRequest = {
      title: 'Soccer',
      content: 'It is a physical game where there 2 teams of 11 players each',
      department: 'Repairs',
    };

    const returnedObj = {
      title: 'Soccer',
      department: 'Repairs',
      content: 'It is a physical game where there 2 teams of 11 players each',
      requestStatus: 'accept',
      resolved: false,
      dateCreated: new Date().toDateString(),
    };
    const requestId = 1;

    (0, _supertest2.default)(_app2.default).put(`/api/v1/users/requests/${requestId}`).send(clientRequest).set('x-auth', user1.token[0].token)
      .expect(201)
      .expect((res) => {
        (0, _expect2.default)(res.body).toMatchObject(returnedObj);
        (0, _expect2.default)(res.body).toHaveProperty('department');
        (0, _expect2.default)(res.body.title).toBe(returnedObj.title);
        (0, _expect2.default)(res.body.department).toBe(returnedObj.department);
        (0, _expect2.default)(_dataStore2.default.getDataSize()).toBe(1);
        (0, _expect2.default)(_dataStore2.default.validateId(requestId)).toBeTruthy();
      })
      .end(done);
  });

  it('should not modify data with invalid requestId', (done) => {
    const clientRequest = {
      title: 'Soccer',
      content: 'It is a physical game where there 2 teams of 11 players each',
    };

    const returnedObj = {
      title: 'Soccer',
      department: 'Maintenance',
      content: 'It is a physical game where there 2 teams of 11 players each',
      requestStatus: 'accept',
      resolved: false,
      dateCreated: new Date().toDateString(),
    };
    const requestId = 2;

    (0, _supertest2.default)(_app2.default).put(`/api/v1/users/requests/${requestId}`).set('x-auth', user1.token[0].token).send(clientRequest)
      .expect(400)
      .expect((res) => {
        (0, _expect2.default)(res.body).toHaveProperty('message');
        (0, _expect2.default)(_dataStore2.default.getDataSize()).toBe(1);
        (0, _expect2.default)(_dataStore2.default.validateId(requestId)).toBeFalsy();
      })
      .end(done);
  });
});

describe('POST /users', () => {
  it('should not create a user with invalid email', (done) => {
    const user2 = new _user2.default('mexy', 'olumide@', '2345');

    (0, _supertest2.default)(_app2.default).post('/api/v1/users').send(user2).expect(400)
      .expect((res) => {
        (0, _expect2.default)(res.body).toHaveProperty('message');
        (0, _expect2.default)(res.body.message).toBe('Please provide a valid email');
        (0, _expect2.default)(user2.token.length).toBe(0);
      })
      .end(done);
  });

  it('should create user with valid username and email', (done) => {
    const user2 = new _user2.default('mexy', 'olumide@gmail.com', '2345');

    (0, _supertest2.default)(_app2.default).post('/api/v1/users').send(user2).expect(201)
      .expect((res) => {
        (0, _expect2.default)(res.header).toBeTruthy();
        (0, _expect2.default)(res.header).toHaveProperty('x-auth');
        (0, _expect2.default)(res.header['x-auth']).toBeDefined();
        (0, _expect2.default)(res.body.id).toBe(2);
        (0, _expect2.default)(res.body.password).not.toBe(user2.password);
      })
      .end(done);
  });

  it('should not create user if email exists', (done) => {
    const user2 = new _user2.default('Lumexmexy', 'olumide@gmail.com', '2345');

    (0, _supertest2.default)(_app2.default).post('/api/v1/users').send(user2).expect(400)
      .expect((res) => {
        (0, _expect2.default)(res.body).toHaveProperty('message');
        (0, _expect2.default)(res.body.message).toBe('username or email already exists');
        (0, _expect2.default)(user2.token.length).toBe(0);
        (0, _expect2.default)(res.body.id).toBeFalsy();
      })
      .end(done);
  });

  it('should not create user if username exists', (done) => {
    const user2 = new _user2.default('mexy', 'oljdjumide@gmail.com', '2345');

    (0, _supertest2.default)(_app2.default).post('/api/v1/users').send(user2).expect(400)
      .expect((res) => {
        (0, _expect2.default)(res.body).toHaveProperty('message');
        (0, _expect2.default)(res.body.message).toBe('username or email already exists');
        (0, _expect2.default)(user2.token.length).toBe(0);
        (0, _expect2.default)(res.body.id).toBeFalsy();
      })
      .end(done);
  });
});

describe('POST /users/login', () => {
  it('should login user', (done) => {
    const user = {
      username: 'mexy',
      password: '2345',
    };

    (0, _supertest2.default)(_app2.default).post('/api/v1/users/login').send(user).expect(200)
      .expect((res) => {
        (0, _expect2.default)(res.header).toHaveProperty('x-auth');
        (0, _expect2.default)(res.body.id).toBe(2);
        (0, _expect2.default)(res.body.token.length).toBe(1);
      })
      .end(done);
  });

  it('should add token to header on login', (done) => {
    const user = {
      username: 'mexy',
      password: '2345',
    };

    (0, _supertest2.default)(_app2.default).post('/api/v1/users/login').send(user).expect(200)
      .expect((res) => {
        (0, _expect2.default)(res.header).toHaveProperty('x-auth');
        (0, _expect2.default)(res.header['x-auth']).toBeDefined();
      })
      .end(done);
  });

  it('should set header on when user gives wrong username', (done) => {
    const user = {
      username: 'mex',
      password: '2345',
    };

    (0, _supertest2.default)(_app2.default).post('/api/v1/users/login').send(user).expect(401)
      .expect((res) => {
        (0, _expect2.default)(res.header).not.toHaveProperty('x-auth');
        (0, _expect2.default)(res.header['x-auth']).toBeUndefined();
      })
      .end(done);
  });

  it('should set header on when user gives wrong password', (done) => {
    const user = {
      username: 'mexy',
      password: '23457',
    };

    (0, _supertest2.default)(_app2.default).post('/api/v1/users/login').send(user).expect(401)
      .expect((res) => {
        (0, _expect2.default)(res.header).not.toHaveProperty('x-auth');
        (0, _expect2.default)(res.header['x-auth']).toBeUndefined();
      })
      .end(done);
  });

  it('should not login user wrong password', (done) => {
    const user = {
      username: 'mexy',
      password: '23457',
    };

    (0, _supertest2.default)(_app2.default).post('/api/v1/users/login').send(user).expect(401)
      .expect((res) => {
        (0, _expect2.default)(res.body.id).toBeUndefined();
        (0, _expect2.default)(res.body).toHaveProperty('message');
        (0, _expect2.default)(res.body.message).toBe('Username or password incorrect');
      })
      .end(done);
  });

  it('should not login user wrong username', (done) => {
    const user = {
      username: 'mexyuu',
      password: '2345',
    };

    (0, _supertest2.default)(_app2.default).post('/api/v1/users/login').send(user).expect(401)
      .expect((res) => {
        (0, _expect2.default)(res.body.id).toBeUndefined();
        (0, _expect2.default)(res.body).toHaveProperty('message');
        (0, _expect2.default)(res.body.message).toBe('Username or password incorrect');
      })
      .end(done);
  });
});
