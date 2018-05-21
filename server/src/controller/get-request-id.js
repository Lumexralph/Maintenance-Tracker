import DataStorageSystem from '../data-store/data-store';

const getRequestById = (req, res) => {
  const { requestId } = req.params;

  // if validdates requestId go ahead to look for it in DataStorageSystem
  DataStorageSystem.getById(requestId)
    .then(request => res.status(200).send(request), err => res.status(404).send({
      message: err.message,
    }));
};


export default getRequestById;
