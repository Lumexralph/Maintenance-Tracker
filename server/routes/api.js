import express from 'express';

import getHomePage from '../controller/getHomePage';
import createUserAccount from '../controller/createAccount';
import loginUser from '../controller/loginUser';
import getAllUserRequests from '../controller/getAllUserRequest';
import getUserRequestById from '../controller/getUserRequestById';
import creatUserRequest from '../controller/createUserRequest';
import updateUserRequest from '../controller/updateUserRequest';
import getAllRequest from '../controller/getAllRequest';
import approveRequest from '../controller/approveRequest';
import rejectRequest from '../controller/rejectRequest';
import resolveRequest from '../controller/resolveRequest';

import authenticate from '../middleware/authenticate';

const api = express.Router();


// GET / homepage
api.get('/', getHomePage);

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

// updatee user request
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
