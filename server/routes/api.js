import express from 'express';

import routeController from '../controller/index';
import authenticate from '../middleware/authenticate';

const api = express.Router();


// GET / homepage
api.get('/', routeController.getHomePage);

// POST /auth/signup
api.post('/auth/signup', routeController.createUserAccount);

// POST /auth/signup
api.post('/auth/login', routeController.loginUser);

// GET /users/requests
api.get('/users/requests', authenticate, routeController.getAllUserRequests);

// GET a request from user by requestid
api.get('/users/requests/:requestId', authenticate, routeController.getUserRequest);

// create user request
api.post('/users/requests', authenticate, routeController.createUserRequest);

// updatee user request
api.put('/users/requests/:requestId', authenticate, routeController.updateUserRequest);

/**
 * get all application requests
 * also filter requests if there's query
 * /request?filter={value}
 */
api.get('/requests', authenticate, routeController.getAllRequest);

/**
 * approve a request
 */
api.put('/requests/:requestId/approve', authenticate, routeController.approveRequest);

/**
 * disapprove a request
 */
api.put('/requests/:requestId/disapprove', authenticate, routeController.rejectRequest);

/**
 * resolve a request
 */
api.put('/requests/:requestId/resolve', authenticate, routeController.resolveRequest);

/** API Docs page */
api.get('/docs', displayApiDocumentation);

export default api;
