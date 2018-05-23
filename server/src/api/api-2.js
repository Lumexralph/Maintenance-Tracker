import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

const api = express.Router();

// configure third party middleware
api.use(bodyParser.json());
api.use(morgan('combined'));