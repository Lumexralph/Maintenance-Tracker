import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import getHomePage from '../controller2/getHomePage';
import createUserAccount from '../controller2/createAccount';
import loginUser from '../controller2/loginUser';

const api = express.Router();

// configure third party middleware
api.use(bodyParser.json());
api.use(morgan('combined'));

// GET / homepage
api.get('/', getHomePage);

// POST /auth/signup
api.post('/auth/signup', createUserAccount);

// POST /auth/signup
api.post('/auth/login', loginUser);

export default api;
