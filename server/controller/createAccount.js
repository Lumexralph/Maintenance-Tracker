import validator from 'validator';

import db from '../db/index';
import hashPassword from './utils/hashPassword';
import generateAuthToken from './utils/generateToken';

/** @function createUserAccount */
const createUserAccount = (req, res) => {
  let hashedPassword = null;

  const {
    username, password1, password2, email,
  } = req.body;

  /** clean up the data of white spaces */
  validator.trim(username);
  validator.trim(password1);
  validator.trim(password2);
  validator.trim(email);

  if (validator.isEmpty(username) ||
     validator.isEmpty(password1) ||
     validator.isEmpty(password2) ||
     validator.isEmpty(email)) {
    return res.status(400).send({
      message: 'It seems one of the field is empty, Ensure no field is empty',
    });
  }


  if (password1 !== password2) {
    return res.status(400).send({
      message: 'Passwords provided do not match, please verify',
    });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).send({
      message: 'Please, provide a valid email',
    });
  }
  // hash the password just one
  hashedPassword = hashPassword(password1);
  // insert data in db
  const text = `INSERT INTO users(username, password, email) VALUES('${username}', '${hashedPassword}', '${email}') RETURNING *`;

  db.query(text)
    .then(result => result.rows[0])
    .then((result) => {
      const {
        user_id, username, admin_role,
      } = result;

      const jsonToken = generateAuthToken(result);

      return res.header('Authorization', jsonToken).status(201).send({
        userId: user_id, username, adminRrole: admin_role, token: jsonToken,
      });
    })
    .catch(err => res.status(400).send({
      message: 'username or email already exists, use another one or login',
    }));

  return undefined;
};

export default createUserAccount;
