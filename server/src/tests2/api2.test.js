import expect from 'expect';
import request from 'supertest';

import app from '../app';
import db from '../db/index';

/**
 * after all tests clear table
 */
before((done) => {
  const text = 'DROP TABLE users';

  db.query(text).then(() => {

    const text2 = `CREATE TABLE users(
      user_id serial PRIMARY KEY,
      username VARCHAR (50) UNIQUE NOT NULL,
      password VARCHAR (500) NOT NULL,
      email VARCHAR (355) UNIQUE NOT NULL,
      last_login TIMESTAMP,
      admin_role BOOL DEFAULT 'f',
      token json
     )`;

      db.query(text2).then(() => done())
  });
  
})

describe('GET / homepage', () => {
  it('should give the homepage', (done) => {

    request(app)
          .get('/api/v1/')
          .expect(200)
          .expect((res) => {
            expect(res.body).toBeDefined();
            expect(res.body).toHaveProperty('status');
            expect(res.body.status).toBe('success');
            expect(res.body).toHaveProperty('message');
            expect(res.body.message).toBe('Welcome to Maintenance Tracker');
          })
          .end(done);
  });
});


describe('POST /api/v1/auth/signup', () => {
  it('should not create user with invalid email', (done) => {
    const userRequest = {
      username: "Looemuu",
      password1: "gatekeeper",
      password2: "gatekeeper",
      email: "oldrlpkookh@"
    };

    request(app)
      .post('/api/v1/auth/signup')
      .send(userRequest)
      .expect(400)
      .expect((res) => {
        expect(res.body).toHaveProperty('status');
        expect(res.body).toHaveProperty('message');
        expect(res.body.status).toBe('Error');
        expect(res.body.message).toBe('Please, provide valid email');
      })
      .end(done);

  });

  it('should not create user with empty field', (done) => {
    const userRequest = {
      username: "",
      password1: "gatekeeper",
      password2: "gatekeeper",
      email: "oldrlpkookh@gmail.com"
    };

    request(app)
      .post('/api/v1/auth/signup')
      .send(userRequest)
      .expect(400)
      .expect((res) => {
        expect(res.body).toHaveProperty('status');
        expect(res.body).toHaveProperty('message');
        expect(res.body.status).toBe('Error');
        expect(res.body.message).toBe('Ensure no field is empty');
      })
      .end(done);

  });

  it('should not create user with different passwords', (done) => {
    const userRequest = {
      username: "Lumexy",
      password1: "gatekee",
      password2: "gatekeeper",
      email: "oldrlpkookh@gmail.com"
    };

    request(app)
      .post('/api/v1/auth/signup')
      .send(userRequest)
      .expect(400)
      .expect((res) => {
        expect(res.body).toHaveProperty('status');
        expect(res.body).toHaveProperty('message');
        expect(res.body.status).toBe('Error');
        expect(res.body.message).toBe('Passwords do not match');
      })
      .end(done);

  });

  it('should create user', (done) => {
    const userRequest = {
      username: "Lumexy",
      password1: "gatekeeper",
      password2: "gatekeeper",
      email: "oldrlpkookh@gmail.com"
    };

    request(app)
      .post('/api/v1/auth/signup')
      .send(userRequest)
      .expect(201)
      .expect((res) => {
        expect(res.header).toHaveProperty('authorization');
        expect(res.body).toHaveProperty('status');
        expect(res.body).toHaveProperty('message');
        expect(res.body.status).toBe('success');
        expect(res.body.message).toHaveProperty('user_id');
      })
      .end(done);

  });

});


describe('POST /api/v1/auth/login', () => {

  it('should not login the user with wrong username', (done) => {
    const userRequest = {
      username: "Lumex",
      password: "gatekeeper",
    };

    request(app)
      .post('/api/v1/auth/login')
      .send(userRequest)
      .expect(400)
      .expect((res) => {
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe('Account does not exist');
      })
      .end(done);
  });

  it('should not login the user with wrong password', (done) => {
    const userRequest = {
      username: "Lumexy",
      password: "gatekeepr",
    };

    request(app)
      .post('/api/v1/auth/login')
      .send(userRequest)
      .expect(400)
      .expect((res) => {
        expect(res.header.authorization).toBeUndefined();
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe('Password not correct');
      })
      .end(done);
  });

  it('should login the user', (done) => {
    const userRequest = {
      username: "Lumexy",
      password: "gatekeeper",
    };

    request(app)
      .post('/api/v1/auth/login')
      .send(userRequest)
      .expect(200)
      .expect((res) => {
        expect(res.header.authorization).toBeDefined();
        expect(res.header).toHaveProperty('authorization');
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe('Login Successful');
      })
      .end(done);
  });
});