import validator from 'validator';

import db from '../db/index';

const createUserRequest = (req, res) => {
  
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

  const text = `INSERT INTO requests(request_title, request_content, department, user_id) VALUES('${title}', '${content}', '${department}', '${user.userId}') RETURNING *;`;

  db.query(text)
    .then(result => res.status(201).send(result.rows[0]))
    .catch(err => res.status(400).send({ message: 'Error occurred, Request not created' }));

  return undefined;
};

export default createUserRequest;
