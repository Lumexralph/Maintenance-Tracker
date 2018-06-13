import expect from 'expect';
import request from 'supertest';

import app from '../app';
import { 
        user,
        adminUser,
        createTables,
        userDataWithInvalidEmail,
        userDataWithEmptyField,
        userDataWithDifferentPasswords,
        validUserData,
        userDataThatUsernameExists,
        userWithPresentEmail,
        userToken,
        adminToken,
        requestWithMissingFields,
        requestWithEmptyFields,
        requestWithValidData,
        requestWithNewData        
   } 
    from './seed/seed';

beforeEach(createTables);


describe('GET / homepage API endpoint', () => {
  it('should give the status code and JSON', (done) => {
    request(app)
      .get('/api/v1/')
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeDefined();
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe('Welcome to FixZit, a Maintenance Tracker');
      })
      .end(done);
  });
});


describe('POST /api/v1/auth/signup API endpoint', () => {
  it('should not create user with invalid email', (done) => {

    request(app)
      .post('/api/v1/auth/signup')
      .send(userDataWithInvalidEmail)
      .expect(400)
      .expect((res) => {
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe('Please, provide a valid email');
        expect(res.body).toMatchObject({
          message: 'Please, provide a valid email'
        });
      })
      .end(done);
  });

  it('should not create user with empty field', (done) => {
    
    request(app)
      .post('/api/v1/auth/signup')
      .send(userDataWithEmptyField)
      .expect(400)
      .expect((res) => {
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe('It seems one of the field is empty, Ensure no field is empty');
      })
      .end(done);
  });


  it('should not create user with different passwords', (done) => {
    
    request(app)
      .post('/api/v1/auth/signup')
      .send(userDataWithDifferentPasswords)
      .expect(400)
      .expect((res) => {
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe('Passwords provided do not match, please verify');
      })
      .end(done);
  });

  it('should create user with valid data', (done) => {     

    request(app)
      .post('/api/v1/auth/signup')
      .send(validUserData)
      .expect(201)
      .expect((res) => {
        expect(res.header).toHaveProperty('authorization');
        expect(res.body).toHaveProperty('userId');
        expect(res.body).toHaveProperty('username');
        expect(res.body).toHaveProperty('adminRole');
        expect(res.body).toHaveProperty('token');
        expect(res.body.userId).toBe(3);
        expect(res.body.adminRole).toBe(false);
      })
      .end(done);
  });

  it('should not create user with same username in database', (done) => {     

    request(app)
      .post('/api/v1/auth/signup')
      .send(userDataThatUsernameExists)
      .expect(400)
      .expect((res) => {
        expect(res.header).not.toHaveProperty('authorization');
        expect(res.body).not.toHaveProperty('userId');
        expect(res.body).not.toHaveProperty('username');
        expect(res.body).not.toHaveProperty('adminRole');
        expect(res.body).not.toHaveProperty('token');
      })
      .end(done);
  });

  it('should not create user with same email in database', (done) => {     

    request(app)
      .post('/api/v1/auth/signup')
      .send(userWithPresentEmail)
      .expect(400)
      .expect((res) => {
        expect(res.header).not.toHaveProperty('authorization');
        expect(res.body).not.toHaveProperty('userId');
        expect(res.body).not.toHaveProperty('username');
        expect(res.body).not.toHaveProperty('adminRole');
        expect(res.body).not.toHaveProperty('token');
      })
      .end(done);
  });
});


describe('POST /api/v1/auth/login API endpoint', () => {

  it('should login the user with valid credentials', (done) => {
    const userCredentials = {
      username: user.username,
      password: user.password
    };

    request(app)
      .post('/api/v1/auth/login')
      .send(userCredentials)
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe('Login successful');
        expect(res.header).toHaveProperty('authorization');
        expect(res.body).toHaveProperty('userId');
        expect(res.body).toHaveProperty('username');
        expect(res.body).toHaveProperty('adminRole');
        expect(res.body).toHaveProperty('token');
        expect(res.body.userId).toBe(1);
        expect(res.body.username).toBe(user.username);
        expect(res.body.adminRole).toBe(false);
        expect(res.body.token).toEqual(res.header.authorization);
      })
      .end(done);
  });

  it('should not login the user with empty fields', (done) => {
    const userCredentials = {
      username: '',
      password: user.password
    };

    request(app)
      .post('/api/v1/auth/login')
      .send(userCredentials)
      .expect(400)
      .expect((res) => {
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe('It seems one of the field is empty, Ensure no field is empty');
        expect(res.header).not.toHaveProperty('authorization');
        expect(res.body).not.toHaveProperty('userId');
        expect(res.body).not.toHaveProperty('username');
        expect(res.body).not.toHaveProperty('adminRole');
        expect(res.body).not.toHaveProperty('token');
      })
      .end(done);
  });

  it('should not login the user with wrong password', (done) => {
      
      const userCredentials = {
        username: user.username,
        password: 'awesome'
      };

    request(app)
      .post('/api/v1/auth/login')
      .send(userCredentials)
      .expect(400)
      .expect((res) => {
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe('Password not correct');
        expect(res.header).not.toHaveProperty('authorization');
        expect(res.body).not.toHaveProperty('userId');
        expect(res.body).not.toHaveProperty('username');
        expect(res.body).not.toHaveProperty('adminRole');
        expect(res.body).not.toHaveProperty('token');
      })
      .end(done);
  });

  it('should not login the user with wrong username', (done) => {
      
    const userCredentials = {
      username: `${user.username}s`,
      password: user.password
    };

  request(app)
    .post('/api/v1/auth/login')
    .send(userCredentials)
    .expect(400)
    .expect((res) => {
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toBe('Account with the credentials does not exist');
      expect(res.header).not.toHaveProperty('authorization');
      expect(res.body).not.toHaveProperty('userId');
      expect(res.body).not.toHaveProperty('username');
      expect(res.body).not.toHaveProperty('adminRole');
      expect(res.body).not.toHaveProperty('token');
    })
    .end(done);
  });
});


describe('GET /users/requests API endpoint', () => {

  it('should get the requests a user created', (done) => {

    const requestBody = {
      user: {
            userId: user.user_id,
            username: user.username,
            adminRole: user.admin_role,
            }
    };

    request(app)
      .get('/api/v1/users/requests')
      .set('Authorization', userToken)
      .send(requestBody)
      .expect(200)
      .expect((res) => {
        expect(res.body.length).toBe(2);
        expect(res.body[0]).toHaveProperty('request_id');
        expect(res.body[0]).toHaveProperty('request_title');
        expect(res.body[0]).toHaveProperty('request_content');
        expect(res.body[0]).toHaveProperty('department');
        expect(res.body[0]).toHaveProperty('status');
        expect(res.body[1].request_id).toBe(2);
        expect(res.body[1].request_title).toBe('Fix Generator');
        expect(res.body[1].request_content).toBe('The plug needs replacement');
        expect(res.body[1].department).toBe('Repairs');
        expect(res.body[1].status).toBe('resolved');
      })
      .end(done);
  });

  it('should not return array of requests for valid user with no requests created', (done) => {
      const requestBody = {
        user: {
              userId: adminUser.user_id,
              username: adminUser.username,
              adminRole: adminUser.admin_role,
              }
        };

        request(app)
        .get('/api/v1/users/requests')
        .set('Authorization', adminToken)
        .send(requestBody)
        .expect(200)
        .expect((res) => {
          expect(res.body.length).toBeUndefined();
          expect(res.body[0]).toBeUndefined();
          expect(res.body[1]).toBeUndefined();
          expect(res.body).toHaveProperty('message');
          expect(res.body.message).toBe('You have not created any request yet');
        })
        .end(done);
  });

  it('should not allow user that fails authentication with invalid token', (done) => {

    request(app)
    .get('/api/v1/users/requests')
    .set('Authorization', 'ahahadhdjsskskfkjffk')
    .expect(401)
    .expect((res) => {
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toBe('The system could not verify the user with the token');
    })
    .end(done);
  });

  it('should not allow unregistered user without a token', (done) => {

    request(app)
    .get('/api/v1/users/requests')
    .expect(401)
    .expect((res) => {
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toBe('You are not allowed to perform action if not registered user');
    })
    .end(done);
  });

});

describe('GET /users/requests/:requestId API endpoint', () => {  

  it('should get a request created by the user', (done) => {

    let requestId = 1;

  const requestBody = {
    user: {
          userId: user.user_id,
          username: user.username,
          adminRole: user.admin_role,
          }
    };

    request(app)
      .get(`/api/v1/users/requests/${requestId}`)
      .set('Authorization', userToken)
      .send(requestBody)
      .expect(200)
      .expect((res) => {
        expect(res.body.length).toBe(1);
        expect(res.body[0]).toHaveProperty('request_id');
        expect(res.body[0]).toHaveProperty('request_title');
        expect(res.body[0]).toHaveProperty('request_content');
        expect(res.body[0]).toHaveProperty('department');
        expect(res.body[0]).toHaveProperty('status');
        expect(res.body[0].request_id).toBe(1);
        expect(res.body[0].request_title).toBe('Fix Car');
        expect(res.body[0].request_content).toBe('The brake pad needs replacement');
        expect(res.body[0].department).toBe('Repairs');
        expect(res.body[0].status).toBe('pending');
      })
      .end(done);
  });

  it('should not get a request if not created by the user', (done) => {

    let requestId = 8;

  const requestBody = {
    user: {
          userId: user.user_id,
          username: user.username,
          adminRole: user.admin_role,
          }
    };

    request(app)
      .get(`/api/v1/users/requests/${requestId}`)
      .set('Authorization', userToken)
      .send(requestBody)
      .expect(404)
      .expect((res) => {
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe('Particular request not found');        
      })
      .end(done);
  });

  it('should not allow user that fails authentication with invalid token', (done) => {

    let requestId = 1;

    request(app)
    .get(`/api/v1/users/requests/${requestId}`)
    .set('Authorization', 'ahahadhdjsskskfkjffk')
    .expect(401)
    .expect((res) => {
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toBe('The system could not verify the user with the token');
    })
    .end(done);
  });

  it('should not allow unregistered user without a token', (done) => {
    let requestId = 1;

    request(app)
    .get(`/api/v1/users/requests/${requestId}`)
    .expect(401)
    .expect((res) => {
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toBe('You are not allowed to perform action if not registered user');
    })
    .end(done);
  });

});

describe('POST /users/requests API endpoint', () => {

  it('should not allow user that fails authentication with invalid token', (done) => {

    request(app)
    .post(`/api/v1/users/requests/`)
    .set('Authorization', 'ahahadhdjsskskfkjffk')
    .expect(401)
    .expect((res) => {
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toBe('The system could not verify the user with the token');
    })
    .end(done);
  });

  it('should not allow unregistered user without a token', (done) => {

    request(app)
    .post(`/api/v1/users/requests/`)
    .expect(401)
    .expect((res) => {
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toBe('You are not allowed to perform action if not registered user');
    })
    .end(done);
  });

  it('should not create request with missing fields', (done) => {   

    request(app)
      .post('/api/v1/users/requests/')
      .set('Authorization', userToken)
      .send(requestWithMissingFields)
      .expect(400)
      .expect((res) => {
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe('Ensure no field is empty');
      })
      .end(done);
  });

  it('should not create request with empty fields', (done) => {

    request(app)
      .post('/api/v1/users/requests/')
      .set('Authorization', userToken)
      .send(requestWithEmptyFields)
      .expect(400)
      .expect((res) => {
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe('Ensure no field is empty');
      })
      .end(done);
  });

  it('should create request with valid data', (done) => {

      requestWithValidData.user = {
            userId: user.user_id,
            username: user.username,
            adminRole: user.admin_role,
        };
    
      request(app)
        .post('/api/v1/users/requests/')
        .set('Authorization', userToken)
        .send(requestWithValidData)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('request_id');
          expect(res.body).toHaveProperty('request_title');
          expect(res.body).toHaveProperty('request_content');
          expect(res.body).toHaveProperty('department');
          expect(res.body).toHaveProperty('status');
          expect(res.body.request_id).toBe(3);
          expect(res.body.request_title).toBe('Clean Engine');
          expect(res.body.request_content).toBe('Engine of the airplane');
          expect(res.body.department).toBe('Repairs');
          expect(res.body.status).toBe('pending');
        })
        .end(done);
    });
});


describe('PUT /users/requests/:requestId API endpoint', () => {

  it('should not allow user that fails authentication with invalid token', (done) => {

    let requestId = 1;

    request(app)
    .put(`/api/v1/users/requests/${requestId}`)
    .set('Authorization', 'ahahadhdjsskskfkjffk')
    .expect(401)
    .expect((res) => {
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toBe('The system could not verify the user with the token');
    })
    .end(done);
  });

  it('should not allow unregistered user without a token', (done) => {
    let requestId = 1;

    request(app)
    .put(`/api/v1/users/requests/${requestId}`)
    .expect(401)
    .expect((res) => {
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toBe('You are not allowed to perform action if not registered user');
    })
    .end(done);
  });

  it('should not update request with missing fields', (done) => {    
    let requestId = 1;

    request(app)
      .put(`/api/v1/users/requests/${requestId}`)
      .set('Authorization', userToken)
      .send(requestWithMissingFields)
      .expect(400)
      .expect((res) => {
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe('Ensure no field is empty');
      })
      .end(done);
  });

  it('should not update request with empty fields', (done) => {

    let requestId = 1;

    request(app)
      .put(`/api/v1/users/requests/${requestId}`)
      .set('Authorization', userToken)
      .send(requestWithEmptyFields)
      .expect(400)
      .expect((res) => {
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe('Ensure no field is empty');
      })
      .end(done);
  });

  it('should not update request with id not created by user', (done) => {

    const requestId = 4;

    requestWithNewData.user = {
      userId: user.user_id,
      username: user.username,
      adminRole: user.admin_role,
    };

    request(app)
      .put(`/api/v1/users/requests/${requestId}`)
      .set('Authorization', userToken)
      .send(requestWithNewData)
      .expect(404)
      .expect((res) => {
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe('Request cannot be found, please ensure it is in the system or created by you');
      })
      .end(done);
  });

  it('should not update user request that does not have a pending status', (done) => {

    const requestId = 2;

    requestWithNewData.user = {
      userId: user.user_id,
      username: user.username,
      adminRole: user.admin_role,
    };

    request(app)
      .put(`/api/v1/users/requests/${requestId}`)
      .set('Authorization', userToken)
      .send(requestWithNewData)
      .expect(401)
      .expect((res) => {
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe('You can only modify request if status is pending');
      })
      .end(done);
  });

  it('should update request', (done) => {

    const requestId = 1;

    requestWithNewData.user = {
      userId: user.user_id,
      username: user.username,
      adminRole: user.admin_role,
    };

    request(app)
      .put(`/api/v1/users/requests/${requestId}`)
      .set('Authorization', userToken)
      .send(requestWithNewData)
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('request_id');
        expect(res.body).toHaveProperty('request_title');
        expect(res.body).toHaveProperty('request_content');
        expect(res.body).toHaveProperty('department');
        expect(res.body).toHaveProperty('status');
        expect(res.body.request_id).toBe(1);
        expect(res.body.request_title).toBe('Clean Gear');
        expect(res.body.request_content).toBe('Gear of the airplane');
        expect(res.body.department).toBe('Repairs');
        expect(res.body.status).toBe('pending'); 
        expect(res.body.user_id).toBe(user.user_id);  
      })
      .end(done);
  });
  
 });

describe('GET /requests API endpoint', () => {
  
  it('should not allow user that fails authentication with invalid token', (done) => {

    request(app)
    .get('/api/v1/requests')
    .set('Authorization', 'ahahadhdjsskskfkjffk')
    .expect(401)
    .expect((res) => {
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toBe('The system could not verify the user with the token');
    })
    .end(done);
  });

  it('should not allow unregistered user without a token', (done) => {

    request(app)
    .get('/api/v1/requests')
    .expect(401)
    .expect((res) => {
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toBe('You are not allowed to perform action if not registered user');
    })
    .end(done);
  });

  it('should not get requests for non-admin user', (done) => {

    request(app)
      .get('/api/v1/requests')
      .set('Authorization', userToken)
      .send(user)
      .expect(401)
      .expect((res) => {
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe('Only Admin is allowed to carry out the action');
      })
      .end(done);
  });

  it('should get all requests for an admin user', (done) => {
    
    request(app)
      .get('/api/v1/requests')
      .set('Authorization', adminToken)
      .send(adminUser)
      .expect(200)
      .expect((res) => {
        expect(res.body.length).toBe(2);
        expect(res.body[0]).toHaveProperty('request_id');
        expect(res.body[0]).toHaveProperty('request_title');
        expect(res.body[0]).toHaveProperty('request_content');
        expect(res.body[0]).toHaveProperty('department');
        expect(res.body[0]).toHaveProperty('status');
        expect(res.body[1].request_id).toBe(2);
        expect(res.body[1].request_title).toBe('Fix Generator');
        expect(res.body[1].request_content).toBe('The plug needs replacement');
        expect(res.body[1].department).toBe('Repairs');
        expect(res.body[1].status).toBe('resolved');
        
      })
      .end(done);
  });
});


describe('PUT /requests/:requestId/approve API endpoint', () => {

  it('should not allow user that fails authentication with invalid token to approve request', (done) => {

    let requestId = 1;

    request(app)
    .put(`/api/v1/requests/${requestId}/approve`)
    .set('Authorization', 'ahahadhdjsskskfkjffk')
    .expect(401)
    .expect((res) => {
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toBe('The system could not verify the user with the token');
    })
    .end(done);
  });

  it('should not allow unregistered user without a token to approve request', (done) => {

    let requestId = 1;

    request(app)
    .put(`/api/v1/requests/${requestId}/approve`)
    .expect(401)
    .expect((res) => {
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toBe('You are not allowed to perform action if not registered user');
    })
    .end(done);
  });

  it('should not approve a request for non-admin user', (done) => {
    let requestId = 1;

    request(app)
      .put(`/api/v1/requests/${requestId}/approve`)
      .set('Authorization', userToken)
      .send(user)
      .expect(401)
      .expect((res) => {
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe('Only Admin is allowed to approve a request');
      })
      .end(done);
  });

  it('should not allow admin approve a request that cannot be found', (done) => {
    let requestId = 5;

    request(app)
      .put(`/api/v1/requests/${requestId}/approve`)
      .set('Authorization', adminToken)
      .send(adminUser)
      .expect(404)
      .expect((res) => {
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe('Request cannot be found');
      })
      .end(done);
  });

  it('should approve a request', (done) => {
    let requestId = 1;

    request(app)
      .put(`/api/v1/requests/${requestId}/approve`)
      .set('Authorization', adminToken)
      .send(adminUser)
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('request_id');
        expect(res.body).toHaveProperty('request_title');
        expect(res.body).toHaveProperty('request_content');
        expect(res.body).toHaveProperty('department');
        expect(res.body).toHaveProperty('status');
        expect(res.body.request_id).toBe(1);
        expect(res.body.request_title).toBe('Fix Car');
        expect(res.body.request_content).toBe('The brake pad needs replacement');
        expect(res.body.department).toBe('Repairs');
        expect(res.body.status).toBe('approved'); 
        expect(res.body.user_id).toBe(user.user_id);    
      })
      .end(done);
  });

  it('should not allow admin approve a resolved or approved request', (done) => {
    let requestId = 2;

    request(app)
      .put(`/api/v1/requests/${requestId}/approve`)
      .set('Authorization', adminToken)
      .send(adminUser)
      .expect(400)
      .expect((res) => {
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe('Resolved or already approved request cannot be approved');
      })
      .end(done);
  });
  
});

describe('PUT /requests/:requestId/disapprove API endpoint', () => {

  it('should not allow user that fails authentication with invalid token to disapprove request', (done) => {

    let requestId = 1;

    request(app)
    .put(`/api/v1/requests/${requestId}/disapprove`)
    .set('Authorization', 'ahahadhdjsskskfkjffk')
    .expect(401)
    .expect((res) => {
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toBe('The system could not verify the user with the token');
    })
    .end(done);
  });

  it('should not allow unregistered user without a token to disapprove request', (done) => {

    let requestId = 1;

    request(app)
    .put(`/api/v1/requests/${requestId}/disapprove`)
    .expect(401)
    .expect((res) => {
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toBe('You are not allowed to perform action if not registered user');
    })
    .end(done);
  });

  it('should not disapprove a request for non-admin user', (done) => {
    let requestId = 1;

    request(app)
      .put(`/api/v1/requests/${requestId}/disapprove`)
      .set('Authorization', userToken)
      .send(user)
      .expect(401)
      .expect((res) => {
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe('Only Admin is allowed to disapprove a request');
      })
      .end(done);
  });

  it('should not allow admin disapprove a request that cannot be found', (done) => {
    let requestId = 5;

    request(app)
      .put(`/api/v1/requests/${requestId}/disapprove`)
      .set('Authorization', adminToken)
      .send(adminUser)
      .expect(404)
      .expect((res) => {
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe('Request cannot be found');
      })
      .end(done);
  });

  it('should disapprove a request', (done) => {
    let requestId = 1;

    request(app)
      .put(`/api/v1/requests/${requestId}/disapprove`)
      .set('Authorization', adminToken)
      .send(adminUser)
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('request_id');
        expect(res.body).toHaveProperty('request_title');
        expect(res.body).toHaveProperty('request_content');
        expect(res.body).toHaveProperty('department');
        expect(res.body).toHaveProperty('status');
        expect(res.body.request_id).toBe(1);
        expect(res.body.request_title).toBe('Fix Car');
        expect(res.body.request_content).toBe('The brake pad needs replacement');
        expect(res.body.department).toBe('Repairs');
        expect(res.body.status).toBe('rejected'); 
        expect(res.body.user_id).toBe(user.user_id);    
      })
      .end(done);
  });

  it('should not allow admin disapprove a resolved or rejected request', (done) => {
    let requestId = 2;

    request(app)
      .put(`/api/v1/requests/${requestId}/disapprove`)
      .set('Authorization', adminToken)
      .send(adminUser)
      .expect(400)
      .expect((res) => {
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe('Resolved or already rejected request cannot be disapproved');
      })
      .end(done);
  });
  
});

describe('PUT /requests/:requestId/resolve', () => {

  it('should not allow user that fails authentication with invalid token to disapprove request', (done) => {

    let requestId = 1;

    request(app)
    .put(`/api/v1/requests/${requestId}/resolve`)
    .set('Authorization', 'ahahadhdjsskskfkjffk')
    .expect(401)
    .expect((res) => {
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toBe('The system could not verify the user with the token');
    })
    .end(done);
  });

  it('should not allow unregistered user without a token to disapprove request', (done) => {

    let requestId = 1;

    request(app)
    .put(`/api/v1/requests/${requestId}/resolve`)
    .expect(401)
    .expect((res) => {
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toBe('You are not allowed to perform action if not registered user');
    })
    .end(done);
  });

});