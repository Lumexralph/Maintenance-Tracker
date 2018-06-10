import expect from 'expect';
import request from 'supertest';

import app from '../app';
import UserRequest from '../model/userRequest';
import User from '../model/user';
import DataStorageSystem from '../datastore/datastore';
import UserStorageSystem from '../datastore/userDatastore';


// create mock user
let user1 = new User('lumex', 'olumideralph@gmail.com', '12345');
// save in system
UserStorageSystem.createUser(user1)
  .then(user => user1 = user);


describe('POST /users/requests', () => {
  it('should create a new request', (done) => {
    const clientRequest = {
      title: 'Soccer',
      content: 'It is a physical game where there 2 teams of 11 players each',
    };

    request(app)
      .post('/api/v1/users/requests')
      .set('x-auth', user1.token[0].token)
      .send(clientRequest)
      .expect(201)
      .expect((res) => {
        expect(res.body.title).toBe(clientRequest.title);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        const dataSize = DataStorageSystem.getDataSize();

        expect(dataSize).toBe(1);
        done();
      });
  });

  it('should not create a new request with empty field value', (done) => {
    const clientRequest = {
      title: '',
      content: '',
    };

    request(app)
      .post('/api/v1/users/requests')
      .set('x-auth', user1.token[0].token)
      .send(clientRequest)
      .expect(400)
      .expect((res) => {
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe('The field has missing values');
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        const dataSize = DataStorageSystem.getDataSize();

        expect(dataSize).toBe(1);
        done();
      });
  });

  it('should not create a new request with empty field', (done) => {
    const clientRequest = {
      content: '',
    };

    request(app)
      .post('/api/v1/users/requests')
      .set('x-auth', user1.token[0].token)
      .send(clientRequest)
      .expect(400)
      .expect((res) => {
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe('One of the field is empty');
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        const dataSize = DataStorageSystem.getDataSize();

        expect(dataSize).toBe(1);
        done();
      });
  });
});


describe('GET /users/requests', (done) => {
  it('should return all requests', (done) => {
    request(app)
      .get('/api/v1/users/requests')
      .set('x-auth', user1.token[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.requests.length).toBe(1);
        expect(res.body).toHaveProperty('requests');
        expect(DataStorageSystem.getDataSize()).toBe(1);
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

    request(app)
      .get(`/api/v1/users/requests/${requestId}`)
      .set('x-auth', user1.token[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body).toMatchObject(returnedObj);
        expect(res.body.title).toBe(returnedObj.title);
        expect(DataStorageSystem.validateId(requestId)).toBeTruthy();
      })
      .end(done);
  });

  it('should not return a  request', (done) => {
    const requestId = 2;

    request(app)
      .get(`/api/v1/users/requests/${requestId}`)
      .set('x-auth', user1.token[0].token)
      .expect(404)
      .expect((res) => {
        expect(res.body).toMatchObject({});
        expect(res.body.title).toBeUndefined();
        expect(DataStorageSystem.validateId(requestId)).toBeFalsy();
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

    request(app)
      .put(`/api/v1/users/requests/${requestId}`)
      .send(clientRequest)
      .set('x-auth', user1.token[0].token)
      .expect(201)
      .expect((res) => {
        expect(res.body).toMatchObject(returnedObj);
        expect(res.body).toHaveProperty('department');
        expect(res.body.title).toBe(returnedObj.title);
        expect(res.body.department).toBe(returnedObj.department);
        expect(DataStorageSystem.getDataSize()).toBe(1);
        expect(DataStorageSystem.validateId(requestId)).toBeTruthy();
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

    request(app)
      .put(`/api/v1/users/requests/${requestId}`)
      .set('x-auth', user1.token[0].token)
      .send(clientRequest)
      .expect(400)
      .expect((res) => {
        expect(res.body).toHaveProperty('message');
        expect(DataStorageSystem.getDataSize()).toBe(1);
        expect(DataStorageSystem.validateId(requestId)).toBeFalsy();
      })
      .end(done);
  });
});


describe('POST /users', () => {
  it('should not create a user with invalid email', (done) => {
    const user2 = new User('mexy', 'olumide@', '2345');

    request(app)
      .post('/api/v1/users')
      .send(user2)
      .expect(400)
      .expect((res) => {
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe('Please provide a valid email');
        expect(user2.token.length).toBe(0);
      })
      .end(done);
  });

  it('should create user with valid username and email', (done) => {
    const user2 = new User('mexy', 'olumide@gmail.com', '2345');

    request(app)
      .post('/api/v1/users')
      .send(user2)
      .expect(201)
      .expect((res) => {
        expect(res.header).toBeTruthy();
        expect(res.header).toHaveProperty('x-auth');
        expect(res.header['x-auth']).toBeDefined();
        expect(res.body.id).toBe(2);
        expect(res.body.password).not.toBe(user2.password);
      })
      .end(done);
  });

  it('should not create user if email exists', (done) => {
    const user2 = new User('Lumexmexy', 'olumide@gmail.com', '2345');

    request(app)
      .post('/api/v1/users')
      .send(user2)
      .expect(400)
      .expect((res) => {
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe('username or email already exists');
        expect(user2.token.length).toBe(0);
        expect(res.body.id).toBeFalsy();
      })
      .end(done);
  });

  it('should not create user if username exists', (done) => {
    const user2 = new User('mexy', 'oljdjumide@gmail.com', '2345');

    request(app)
      .post('/api/v1/users')
      .send(user2)
      .expect(400)
      .expect((res) => {
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe('username or email already exists');
        expect(user2.token.length).toBe(0);
        expect(res.body.id).toBeFalsy();
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

    request(app)
      .post('/api/v1/users/login')
      .send(user)
      .expect(200)
      .expect((res) => {
        expect(res.header).toHaveProperty('x-auth');
        expect(res.body.id).toBe(2);
        expect(res.body.token.length).toBe(1);
      })
      .end(done);
  });

  it('should add token to header on login', (done) => {
    const user = {
      username: 'mexy',
      password: '2345',
    };

    request(app)
      .post('/api/v1/users/login')
      .send(user)
      .expect(200)
      .expect((res) => {
        expect(res.header).toHaveProperty('x-auth');
        expect(res.header['x-auth']).toBeDefined();
      })
      .end(done);
  });

  it('should set header on when user gives wrong username', (done) => {
    const user = {
      username: 'mex',
      password: '2345',
    };

    request(app)
      .post('/api/v1/users/login')
      .send(user)
      .expect(401)
      .expect((res) => {
        expect(res.header).not.toHaveProperty('x-auth');
        expect(res.header['x-auth']).toBeUndefined();
      })
      .end(done);
  });

  it('should set header on when user gives wrong password', (done) => {
    const user = {
      username: 'mexy',
      password: '23457',
    };

    request(app)
      .post('/api/v1/users/login')
      .send(user)
      .expect(401)
      .expect((res) => {
        expect(res.header).not.toHaveProperty('x-auth');
        expect(res.header['x-auth']).toBeUndefined();
      })
      .end(done);
  });

  it('should not login user wrong password', (done) => {
    const user = {
      username: 'mexy',
      password: '23457',
    };

    request(app)
      .post('/api/v1/users/login')
      .send(user)
      .expect(401)
      .expect((res) => {
        expect(res.body.id).toBeUndefined();
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe('Username or password incorrect');
      })
      .end(done);
  });

  it('should not login user wrong username', (done) => {
    const user = {
      username: 'mexyuu',
      password: '2345',
    };

    request(app)
      .post('/api/v1/users/login')
      .send(user)
      .expect(401)
      .expect((res) => {
        expect(res.body.id).toBeUndefined();
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe('Username or password incorrect');
      })
      .end(done);
  });
});
