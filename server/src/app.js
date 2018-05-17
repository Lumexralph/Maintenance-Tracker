import express from 'express';
import bodyParser from 'body-parser';

import UserRequest from './model/reques-model';
import DataStorageSystem from './data-store/data-store';
import UserStorageSystem from './data-store/user-datastore';
import User from './model/user';

const app = express();

// configure third party middleware
app.use(bodyParser.json());


// create routes version 1
app.post('/api/v1/users/requests', (req, res) => {
  // check and validate the data
  if (!req.body.hasOwnProperty('content') || !req.body.hasOwnProperty('title')) {
    return res.status(400).send({ message: 'One of the field is empty' });
  }
  if (!req.body.title || !req.body.content) {
    return res.status(400).send({ message: 'The field has missing values' });
  }


  const { title, content } = req.body;
  const newRequest = new UserRequest(title, content);

  // Add the new request
  DataStorageSystem.createData(newRequest).then(data => res.status(201).send(data), err => res.status(400).send(err.message));
});


// GET all requests
app.get('/api/v1/users/requests', (req, res) => {
  DataStorageSystem.getAllData().then(requests => res.status(200).send({ requests }), err => res.status(500).send({
    message: err.message,
  }));
});


// GET a request from user by id
app.get('/api/v1/users/requests/:requestId', (req, res) => {
  const { requestId } = req.params;

  // if validdates requestId go ahead to look for it in DataStorageSystem

  DataStorageSystem.getById(requestId).then(request => res.status(200).send(request), err => res.status(404).send({
    message: err.message,
  }));
});

// PUT modify a request by id
app.put('/api/v1/users/requests/:requestId', (req, res) => {
  const { requestId } = req.params;
  const data = req.body;

  // update the new data
  DataStorageSystem.getByIdAndUpdate(requestId, data).then((newRequest) => {
    if (!newRequest) {
      return res.status(404).send({
        message: 'Request to be updated not found',
      });
    }

    res.status(201).send(newRequest);
  })
    .catch(err => res.status(400).send({
      message: err.message,
    }));
});

// POST /api/v1/users/ .... user signup
app.post('/api/v1/users', (req, res) => {
  const { username, email, password } = req.body;

  // make a new instance
  const userData = new User(username, email, password);

  // create new user
  UserStorageSystem.createUser(userData).then(user => res.status(201).send(user), (err) => {
    res.status(401).send({
      message: err.message,
    });
  });

});

app.listen(3000, () => console.log('Started on port 3000'));


export default app;
