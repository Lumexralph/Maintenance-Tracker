import db from '../db/index';

const getAllRequest = (req, res) => {
  const { user } = req.body;

  if (!user.admin_role) {
    return res.status(401).send({ message: 'only Admin allowed' });
  }

  const text = 'SELECT * FROM requests ORDER BY request_id ASC;';

  return db.query(text)
    .then(result => res.status(200).send(result.rows))
    .catch(err => res.status(501));
};

export default getAllRequest;

