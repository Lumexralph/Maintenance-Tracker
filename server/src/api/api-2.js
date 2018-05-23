import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import getHomePage from '../controler-2/get-homepage';
import createUserAccount from '../controler-2/create-account';

const api = express.Router();

// configure third party middleware
api.use(bodyParser.json());
api.use(morgan('combined'));

// GET / homepage
api.get('/', getHomePage);

// POST /auth/signup
api.post('/auth/signup', createUserAccount);

export default api;
