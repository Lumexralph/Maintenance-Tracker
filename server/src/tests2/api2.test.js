import expect from 'expect';
import request from 'supertest';

import app from '../app';
import db from '../db/index';

/**
 * Before every test clear table
 */
beforeEach((done) => {
  const text = 'DELETE FROM users';
  db.query(text).then(() => done());
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
      .expect((res) => {})
      .end(done);

  });
});