import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import db from '../db/index';

const api = express.Router();

// configure third party middleware
api.use(bodyParser.json());
api.use(morgan('combined'));

// GET homepage
api.get('/', (req, res) => {
  db.query('SELECT * FROM Student')
    .then(result => res.send(result))
    .catch(err => res.send(err));  
});


export default api;