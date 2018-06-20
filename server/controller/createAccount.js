import validator from 'validator';

import db from '../db/index';
import utils from './utils/index';

/** @function createUserAccount */
const createUserAccount = (req, res) => {
  let hashedPassword = null;
  let username = null;

  /** Check if the request came with no data or missing fields */
  if (!Object.prototype.hasOwnProperty.call(req.body, 'username') || !Object.prototype.hasOwnProperty.call(req.body, 'password1') || !Object.prototype.hasOwnProperty.call(req.body, 'password2') || !Object.prototype.hasOwnProperty.call(req.body, 'email')) {
    return res.status(400).send({ message: 'Please provide valid data with required fields' });
  }

  let {
    password1, password2, email,
  } = req.body;
  ({ username } = req.body);

  /** clean up the data of white spaces */
  username =  validator.trim(username);
  password1 = validator.trim(password1);
  password2 = validator.trim(password2);
  email = validator.trim(email);


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
  hashedPassword = utils.hashPassword(password1);
  // insert data in db
  const text = `INSERT INTO users(username, password, email) VALUES('${username}', '${hashedPassword}', '${email}') RETURNING *`;

  db.query(text)
    .then(result => result.rows[0])
    .then((result) => {
      const {
        user_id, admin_role,
      } = result;

      ({ username } = result);

      const jsonToken = utils.generateToken(result);

      return res.header('Authorization', jsonToken).status(201).send({
        userId: user_id, username, adminRole: admin_role, token: jsonToken,
      });
    })
    .catch(err => res.status(400).send({
      message: 'username or email already exists, use another one or login',
    }));

  return undefined;
};

export default createUserAccount;
