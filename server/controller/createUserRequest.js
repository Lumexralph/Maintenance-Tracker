import validator from 'validator';

import db from '../db/index';

const createUserRequest = (req, res) => {
  let title = null;
  let content = null;
  let user = null;
  let department = null;
  ({
    title, content, user, department = 'Maintenance',
  } = req.body);

  /** Check if the request came with no data or missing fields */
  if (!Object.prototype.hasOwnProperty.call(req.body, 'title') || !Object.prototype.hasOwnProperty.call(req.body, 'content')) {
    return res.status(400).send({ message: 'Please provide valid data with required fields' });
  }

  title = validator.trim(title);
  content = validator.trim(content);

  if (!title || !content) {
    return res.status(400).send({
      message: 'Ensure title and content fields are not empty missing',
    });
  }

  if (validator.isEmpty(title) || validator.isEmpty(content)) {
    return res.status(400).send({
      message: 'Ensure title and content fields are not empty',
    });
  }

  title = validator.trim(title);
  content = validator.trim(content);

  const text = `INSERT INTO requests(request_title, request_content, department, user_id) VALUES('${title}', '${content}', '${department}', '${user.userId}') RETURNING *;`;

  db.query(text)
    .then(result => res.status(201).send(result.rows[0]))
    .catch(err => res.status(400).send({ message: 'Error occurred, Request not created' }));

  return undefined;
};

export default createUserRequest;
