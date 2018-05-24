import DataStorageSystem from '../datastore/datastore';

const modifyRequest = (req, res) => {
  const { requestId } = req.params;
  const data = req.body;

  // update the new data
  DataStorageSystem.getByIdAndUpdate(requestId, data).then((newRequest) => {
    if (!newRequest) {
      return res.status(404).send({
        message: 'Request to be updated not found',
      });
    }

    return res.status(201).send(newRequest);
  })
    .catch(err => res.status(400).send({
      message: err.message,
    }));
};

export default modifyRequest;
