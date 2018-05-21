import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';


import authenticate from '../middleware/authenticate';
import creatUserRequest from '../controller/create-request';
import getAllRequests from '../controller/get-all-requests';
import getRequestById from '../controller/get-request-id';
import modifyRequest from '../controller/modify-request';
import loginUser from '../controller/login-user';
import signupUser from '../controller/signup-user';
import logoutUser from '../controller/logout-user';

const api = express.Router();

// configure third party middleware
api.use(bodyParser.json());
api.use(morgan('combined'));

// create routes version 1
api.post('/users/requests', authenticate, creatUserRequest);

// GET all requests
api.get('/users/requests', authenticate, getAllRequests);

// GET a request from user by id
api.get('/users/requests/:requestId', authenticate, getRequestById);

// PUT modify a request by id
api.put('/users/requests/:requestId', authenticate, modifyRequest);

// POST /api/v1/users/ .... user signup
api.post('/users', signupUser);

// POST /users/login {username, password}
api.post('/users/login', loginUser);

// log out
api.delete('/users/logout', authenticate, logoutUser);


export default api;
