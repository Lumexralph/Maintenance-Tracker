import db from '../db/index';

const approveRequest = (req, res) => {
  const { requestId } = req.params;
  const { user } = req.body;

  if (!user.adminRole) {
    return res.status(401).send({ message: 'Only Admin is allowed to modify request' });
  }

  const text = `UPDATE requests
  SET status = 'approved'
  WHERE
  request_id = ${requestId};`;

  const text2 = `SELECT * FROM requests WHERE request_id = '${requestId}'`;

  return db.query(text)
    .then((result) => {
      if (result.rowCount === 0) {
        return res.status(404).send({ message: 'Request not found' });
      }

      return db.query(text2)
        .then(request => res.send(request.rows[0]))
        .catch(err => res.status(404).send({ message: 'Request not found' }));
    })
    .catch(err => res.status(501).send({ message: 'Error from system' }));
};

export default approveRequest;
