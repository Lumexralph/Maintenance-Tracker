import DataStorageSystem from '../datastore/datastore';

const getAllRequests = (req, res) => {
  DataStorageSystem.getAllData()
    .then(requests => res.status(200).send({ requests }), err => res.status(500).send({
      message: err.message,
    }));
};

export default getAllRequests;
