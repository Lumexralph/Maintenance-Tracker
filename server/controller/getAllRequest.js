import db from '../db/index';

const getAllRequest = (req, res) => {
  const { user } = req.body;
  const { filter } = req.query;

  if (!user.admin_role) {
    return res.status(401).send({ message: 'Only Admin is allowed to carry out the action.' });
  }

  if (filter) {
    const text = `SELECT * 
    FROM requests
    WHERE status = '${filter}'
    ORDER BY request_id ASC;`;

    return db.query(text)
      .then((result) => {
        if (result.rows.length === 0) {
          return res.status(200).send({ message: 'There is no request that matches the condition' });
        }
        return res.status(200).send(result.rows);
      })
      .catch(err => res.status(400).send({ message: 'Requests cannot be filtered' }));
  }

  const text = 'SELECT * FROM requests ORDER BY request_id ASC;';

  return db.query(text)
    .then(result => res.status(200).send(result.rows))
    .catch(err => res.status(501).send({ message: 'Sorry, error occured in the system.' }));
};

export default getAllRequest;

