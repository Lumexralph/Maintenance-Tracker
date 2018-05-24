import expect from 'expect';
import request from 'supertest';

import app from '../app';

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