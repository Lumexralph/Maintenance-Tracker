import db from '../db/index';

const getUserRequestById = (req, res) => {
  const { user } = req.body;
  const { requestId } = req.params;

  const text = `SELECT requests.request_id, requests.request_title, requests.request_content, requests.department FROM users INNER JOIN requests USING (user_id) WHERE user_id= '${user.user_id}' AND request_id = '${requestId}';`;

  db.query(text)
    .then((result) => {
      if (result.rows.length > 0) {
        return res.status(200).send(result.rows);
      }
      return res.status(404).send({ message: 'Requests not found' });
    })
    .catch(err => res.status(404).send({ message: 'Request cannot be found' }));
};

export default getUserRequestById;
