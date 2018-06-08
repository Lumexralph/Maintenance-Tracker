import db from '../db/index';

const getAllUserRequests = (req, res) => {
  const { user } = req.body;

  const text = `SELECT request_id, request_title, request_content, department, status
   FROM users INNER JOIN requests USING (user_id) WHERE user_id='${user.userId}'`;

  db.query(text)
    .then((result) => {
      if (result.rows.length > 0) {
        return res.status(200).send(result.rows);
      }
      return res.status(200).send({ message: 'You have not created any request yet' });
    })
    .catch(err => res.status(404).send({ message: 'User requests cannot be found.' }));
};

export default getAllUserRequests;
