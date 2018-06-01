import UserRequest from '../model/userRequest';
import DataStorageSystem from '../datastore/datastore';


const createUserRequest = (req, res) => {
  // check and validate the data
  if (!Object.prototype.hasOwnProperty.call(req.body, 'content') || !Object.prototype.hasOwnProperty.call(req.body, 'title')) {
    return res.status(400).send({ message: 'One of the field is empty' });
  }
  if (!req.body.title || !req.body.content) {
    return res.status(400).send({ message: 'The field has missing values' });
  }

  const { title, content } = req.body;
  const newRequest = new UserRequest(title, content);

  // Add the new request
  DataStorageSystem.createData(newRequest)
    .then(
      data => res.status(201).send(data),
      err => res.status(400).send(err.message),
    );

  return undefined;
};

export default createUserRequest;
