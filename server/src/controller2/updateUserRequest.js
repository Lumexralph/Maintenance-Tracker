import validator from 'validator';

import db from '../db/index';


const updateUserRequest = (req, res) => {
  const { requestId } = req.params;
  const {
    title, content, user, department = 'Maintenance', status,
  } = req.body;


  if (!user.admin_role && status === 'approved') {
    return res.status(401).send({ message: 'You cannot modify request' });
  }

  if (!title || !content) {
    return res.status(400).send({
      message: 'Ensure no field is empty',
    });
  }

  if (validator.isEmpty(title) || validator.isEmpty(content)) {
    return res.status(400).send({
      message: 'Ensure no field is empty',
    });
  }

  const text = `UPDATE requests
  SET request_title='${title}', request_content='${content}', department='${department}'
  FROM
  users
  WHERE
  requests.user_id = users.user_id AND request_id = '${requestId}' AND requests.user_id = '${user.user_id}';`;

  db.query(text)
    .then((result) => {
      if (result.rowCount === 0) {
        return res.status(404).send({ message: 'Request not found' });
      }

      const text2 = `SELECT * FROM requests WHERE request_id = '${requestId}'`;

      return db.query(text2)
        .then(request => res.send(request.rows[0]))
        .catch(err => res.status(404).send({ message: 'Request not found' }));
    })
    .catch(err => res.status.send({ message: err }));
};

export default updateUserRequest;
