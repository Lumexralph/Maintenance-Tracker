import expect from 'expect';
import request from 'supertest';
import generateToken from '../controller2/utils/generateToken';

import app from '../app';
import db from '../db/index';

/**
 * after all tests clear table
 */
const createTables = `CREATE TABLE users(
  user_id serial PRIMARY KEY,
  username VARCHAR (50) UNIQUE NOT NULL,
  password VARCHAR (500) NOT NULL,
  email VARCHAR (355) UNIQUE NOT NULL,
  last_login TIMESTAMP,
  admin_role BOOL DEFAULT 'f'
 );
 CREATE TABLE requests (
  request_id serial PRIMARY KEY,
  request_title VARCHAR (255) NOT NULL,
  request_content TEXT NOT NULL,
  department VARCHAR (255) DEFAULT 'Maintenance',
  user_id INT NOT NULL,
  status VARCHAR (100) DEFAULT 'pending',
  FOREIGN KEY (user_id) REFERENCES users (user_id)
 );`;

 const text = `DROP TABLE IF EXISTS requests; DROP TABLE IF EXISTS users;`;

const userToken = generateToken({user_id: 1});
const adminToken = generateToken({ user_id: 2, admin_role: true });

const user = {
  user: {
    user_id: 1,
    admin_role: false
  }
};

before(() => {
  return db.query(text)
    .then(() => {
      return db.query(createTables)
        .then(res => res)
        .catch(err => err);
    })
    .catch(err => err); 
});


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
        expect(res.body).toHaveProperty('message');
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


describe('GET /users/requests', () => {
  
  it('should get empty request if user has none', (done) => {   

    request(app)
      .get('/api/v1/users/requests')
      .set('Authorization', userToken)
      .send(user)
      .expect(404)
      .expect((res) => {
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe('No requests yet' );
      })
      .end(done);
  });

  it('should get request if user has any', (done) => {
    const text = `INSERT INTO requests (request_title, request_content, user_id)
    VALUES
     ('Games','PostgreSQL coming Tutorial in school', 1),
    ('Gaming','MysSQL coming Tutorial in school', 1);`;

    db.query(text)
      .then(res => res)
      .catch(err => err);

  request(app)
      .get('/api/v1/users/requests')
      .set('Authorization', userToken)
      .send(user)
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toHaveLength(2);
      })
      .end(done);
  });  
});

describe('GET /users/requests/:requestId', () => {
  let requestId = 1;

  it('should get a request', (done) => {
    request(app)
      .get(`/api/v1/users/requests/${requestId}`)
      .set('Authorization', userToken)
      .send(user)
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveLength(1);
        expect(res.body[0]['request_title']).toBe('Games');
      })
      .end(done);
  });

  it('should not get a request', (done) => {
    requestId = 4;
    
    request(app)
      .get(`/api/v1/users/requests/${requestId}`)
      .set('Authorization', userToken)
      .send(user)
      .expect(404)
      .expect((res) => {
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe('Requests not found');
      })
      .end(done);
  });

});

describe('POST /users/requests', () => {

  it('should not create request missing a field', (done) => {
    const userRequest = {
      content: "Game of the year",
      department: "Repairs",
    };

    request(app)
      .post('/api/v1/users/requests/')
      .set('Authorization', userToken)
      .send(userRequest)
      .expect(400)
      .expect((res) => {
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe('Ensure no field is empty');
      })
      .end(done);
  });

  it('should not create request with empty field', (done) => {
    const userRequest = {
      title: "",
      content: "Game of the year",
      department: "Repairs"
    };

    request(app)
      .post('/api/v1/users/requests/')
      .set('Authorization', userToken)
      .send(userRequest)
      .expect(400)
      .expect((res) => {
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe('Ensure no field is empty');
      })
      .end(done);
  });

  it('should create request with valid data', (done) => {
    const userRequest = {
      title: "Homecoming",
      content: "Game of the year 2018",
      department: "Repairs",
      user
    };

    request(app)
      .post('/api/v1/users/requests/')
      .set('Authorization', userToken)
      .send(userRequest)
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe('Request created');
      })
      .end(done);
  });

});

describe('PUT /users/requests/:requestId', () => {
  it('should not update request with wrong requestId', (done) => {
    const requestId = 4;

    const reqBody = {
      "title": "The Game of the year",
      "content": "It is played in the continent",
      user
    }

    request(app)
      .put(`/api/v1/users/requests/${requestId}`)
      .set('Authorization', userToken)
      .send(reqBody)
      .expect(404)
      .expect((res) => {
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe('Request not found');
      })
      .end(done);
  });

  it('should update request with valid requestId', (done) => {
    let requestId = 1;

    const reqBody = {
      "title": "The Game of the year",
      "content": "It is played in the continent",
      user
    }

    request(app)
      .put(`/api/v1/users/requests/${requestId}`)
      .set('Authorization', userToken)
      .send(reqBody)
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('request_id');
        expect(res.body.message).toBe('Request not found');
      })
      .end(done);
  });

  it('should not update approved request', (done) => {
    const requestId = 1;

    const reqBody = {
      "title": "The Game of the year",
      "content": "It is played in the continent",
      "status": "approved",
      user
    }

    request(app)
      .put(`/api/v1/users/requests/${requestId}`)
      .set('Authorization', userToken)
      .send(reqBody)
      .expect(401)
      .expect((res) => {
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe('You cannot modify request');
      })
      .end(done);
  });
});

describe('GET /requests', () => {
  it('should not get requests for non-admin', (done) => {
    request(app)
      .get(`/api/v1/requests`)
      .set('Authorization', userToken)
      .expect(401)
      .expect((res) => {
        expect(res.body).toHaveProperty('message');    
        expect(res.body.message).toBe('only Admin allowed');
      })
      .end(done);
  });

  it('should get requests for admin', (done) => {
    const admin = {
      admin_role: 'true'
    }
    request(app)
      .get(`/api/v1/requests`)
      .set('Authorization', adminToken)
      .send(admin.admin_role)
      .expect(200)
      .expect((res) => {
        expect(res.body.length).toHaveProperty('message');    
        expect(res.body.message).toBe('only Admin allowed');
      })
      .end(done);
  });
});