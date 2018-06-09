import db from '../db/index';

const resolveRequest = (req, res) => {
  const { requestId } = req.params;
  const { user } = req.body;

  if (!user.adminRole) {
    return res.status(401).send({ message: 'Only Admin is allowed to carry out the action.' });
  }

  const text = `UPDATE requests
  SET status = 'resolved'
  WHERE
  request_id = ${requestId};`;

  const text2 = `SELECT * FROM requests WHERE request_id = '${requestId}';`;

  return db.query(text)
    .then((result) => {
      if (result.rowCount === 0) {
        return res.status(404).send({ message: 'Request not found' });
      }

      return db.query(text2)
        .then(request => res.send(request.rows[0]))
        .catch(err => res.status(404).send({ message: 'Request not found' }));
    })
    .catch(err => res.status.send({ message: 'Request cannot be found, please ensure it is in the system' }));
};

export default resolveRequest;
