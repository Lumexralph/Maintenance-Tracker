import db from '../db/index';

const getAllRequest = (req, res) => {
  const { user } = req.body;
  const { filter } = req.query;

  if (!user.admin_role) {
    return res.status(401).send({ message: 'Action cannot be performed' });
  }

  if (filter) {
    const text = `SELECT * 
    FROM requests
    WHERE status = '${filter}'
    ORDER BY request_id ASC;`;

    return db.query(text)
      .then(result => res.status(200).send(result.rows))
      .catch(err => res.status(400).send({ message: 'Request cannot be filtered' }));
  }

  const text = 'SELECT * FROM requests ORDER BY request_id ASC;';

  return db.query(text)
    .then(result => res.status(200).send(result.rows))
    .catch(err => res.status(501));
};

export default getAllRequest;

