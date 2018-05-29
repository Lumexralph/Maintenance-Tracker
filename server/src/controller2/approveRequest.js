import db from '../db/index';

const approveRequest = (req, res) => {
  const { requestId } = req.params;
  const { user, status } = req.body;

  if (!user.admin_role) {
    return res.status(401).send({ message: 'You cannot modify request' });
  }

  if (status !== 'pending') {
    return res.status(400).send({ message: 'Request can not be modified' });
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
    .catch(err => res.status.send({ message: err }));
};

export default approveRequest;
