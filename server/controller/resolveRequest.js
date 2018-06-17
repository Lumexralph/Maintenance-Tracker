import db from '../db/index';

const resolveRequest = (req, res) => {
  const { requestId } = req.params;
  const { user } = req.body;

  if (!user.adminRole) {
    return res.status(401).send({ message: 'Only Admin is allowed to resolve a request' });
  }

  const text = `UPDATE requests
  SET status = 'resolved'
  WHERE
  request_id = ${requestId};`;

  const text2 = `SELECT * FROM requests WHERE request_id = '${requestId}';`;

  return db.query(text2)
    .then((result) => {
      if (result.rows[0].status === 'resolved' || result.rows[0].status === 'rejected') {
        return res.status(400).send({ message: 'Resolved or rejected request cannot be resolved' });
      }

      return db.query(text)
        .then((request) => {
          if (request.rowCount === 1) {
            /** if the request is not resolved, fetch for it */
            return db.query(text2)
              .then(data => res.status(201).send(data.rows[0]))
              .catch(err => res.status(501).send({
                message: 'Error fetching the request',
              }));
          }
          return undefined;
        });
    })
    .catch(err => res.status(404).send({ message: 'Request cannot be found' }));
};

export default resolveRequest;
