import express from 'express';
import bodyParser from 'body-parser';

import UserRequest from './model/reques-model';
import DataStorageSystem from './data-store/data-store';

const app = express();

// configure third party middleware
app.use(bodyParser.json());
// create routes version 1
app.post('/api/v1/users/requests', (req, res) => {
  const { title, content } = req.body;
  const newRequest = new UserRequest(title, content);

  // Add the new request
  DataStorageSystem.createData(newRequest).then(data => res.status(201).send(data), e => res.status(400).send(e.message));

});


app.listen(3000, () => console.log('Started on port 3000'));
