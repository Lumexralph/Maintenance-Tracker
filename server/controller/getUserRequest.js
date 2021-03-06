import db from '../db/index';

const getUserRequest = (req, res) => {
  const { user } = req.body;
  const { requestId } = req.params;

  const text = `SELECT requests.request_id, requests.request_title, requests.request_content, requests.department,
  requests.status FROM users INNER JOIN requests USING (user_id) WHERE user_id= '${user.userId}' AND request_id = '${requestId}';`;

  db.query(text)
    .then((result) => {
      if (result.rows.length > 0) {
        return res.status(200).send(result.rows[0]);
      }
      return res.status(404).send({ message: 'Particular request not found' });
    })
    .catch(err => res.status(404).send({ message: 'Request cannot be found or user does not exists in the system' }));
};

export default getUserRequest;
