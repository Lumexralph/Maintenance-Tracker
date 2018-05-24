import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';


import authenticate from '../middleware/authenticate';
import creatUserRequest from '../controller/createRequest';
import getAllRequests from '../controller/getAllRequests';
import getRequestById from '../controller/getRequestId';
import modifyRequest from '../controller/modifyRequest';
import loginUser from '../controller/loginUser';
import signupUser from '../controller/signupUser';
import logoutUser from '../controller/logoutUser';

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
