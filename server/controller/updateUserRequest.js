import validator from 'validator';

import db from '../db/index';


const updateUserRequest = (req, res) => {
  const { requestId } = req.params;
  const {
    title, content, user, department = 'Maintenance',
  } = req.body;

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

  /**
   * Fecth for the request and check the status
   */

  if (!user.admin_role) {
    const text3 = `SELECT * FROM requests WHERE request_id = '${requestId}'`;

    return db.query(text3)
      .then((request) => {
        if (request.rows[0].status === 'approved') {
          return res.status(401).send({ message: 'You can only modify request if status is pending' });
        }

        const text = `UPDATE requests
  SET request_title='${title}', request_content='${content}', department='${department}'
  FROM
  users
  WHERE
  requests.user_id = users.user_id AND request_id = '${requestId}' AND requests.user_id = '${user.user_id}';`;

        return db.query(text)
          .then((result) => {
            if (result.rowCount === 0) {
              return res.status(200).send({ message: 'Request cannot be found' });
            }

            const text2 = `SELECT * FROM requests WHERE request_id = '${requestId}';`;

            return db.query(text2)
              .then(result2 => res.status(201).send(result2.rows[0]))
              .catch(err => res.status(404).send({ message: 'Request cannot be found' }));
          })
          .catch(err => res.status(404).send({ message: 'Request cannot be found' }));
      })
      .catch(err => res.status(404).send({ message: 'Request cannot be found, please ensure it is in the system' }));
  }
};

export default updateUserRequest;
