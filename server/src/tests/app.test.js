import expect from 'expect';
import request from 'supertest';

import app from '../app';
import UserRequest from '../model/reques-model';
import DataStorageSystem from '../data-store/data-store';


describe('POST /users/requests', () => {

  it('should create a new request', (done) => {
    const clientRequest = {
      title: 'Soccer',
      content: 'It is a physical game where there 2 teams of 11 players each'
    };

    request(app)
      .post('/api/v1/users/requests')
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
      content: ''
    };

    request(app)
      .post('/api/v1/users/requests')
      .send(clientRequest)
      .expect(400)
      .expect((res) => {
        expect(res.body).toHaveProperty('message');
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

