import express from 'express';

import getHomePage from '../controller2/getHomePage';
import createUserAccount from '../controller2/createAccount';
import loginUser from '../controller2/loginUser';
import getAllUserRequests from '../controller2/getAllUserRequest';
import getUserRequestById from '../controller2/getUserRequestById';
import creatUserRequest from '../controller2/createUserRequest';
import updateUserRequest from '../controller2/updateUserRequest';
import getAllRequest from '../controller2/getAllRequest';
import approveRequest from '../controller2/approveRequest';
import rejectRequest from '../controller2/rejectRequest';
import resolveRequest from '../controller2/resolveRequest';

import authenticate from '../middleware2/authenticate';

const api = express.Router();



// GET / homepage
// api.get('/', getHomePage);

// POST /auth/signup
api.post('/auth/signup', createUserAccount);

// POST /auth/signup
api.post('/auth/login', loginUser);

// GET /users/requests
api.get('/users/requests', authenticate, getAllUserRequests);

// GET a request from user by requestid
api.get('/users/requests/:requestId', authenticate, getUserRequestById);

// create user request
api.post('/users/requests', authenticate, creatUserRequest);

// create user request
api.put('/users/requests/:requestId', authenticate, updateUserRequest);

/**
 * get all application requests
 * also filter requests if there's query
 * /request?filter={value}
 */
api.get('/requests', authenticate, getAllRequest);

/**
 * approve a request
 */
api.put('/requests/:requestId/approve', authenticate, approveRequest);

/**
 * disapprove a request
 */
api.put('/requests/:requestId/disapprove', authenticate, rejectRequest);

/**
 * resolve a request
 */
api.put('/requests/:requestId/resolve', authenticate, resolveRequest);

export default api;
