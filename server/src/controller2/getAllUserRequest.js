import db from '../db/index';

const getAllUserRequests = (req, res) => {
  const { user } = req.body;

  const text = `SELECT * FROM users INNER JOIN requests USING (user_id) WHERE user_id='${user.user_id}'`;

  db.query(text)
    .then((result) => {
      if (result.rows.length > 0) {
        return res.status(200).send(result.rows);
      }
      return res.status(404).send({ message: 'No requests yet' });
    })
    .catch(err => res.status(404).send({ message: 'Request cannot be found' }));
};

export default getAllUserRequests;
