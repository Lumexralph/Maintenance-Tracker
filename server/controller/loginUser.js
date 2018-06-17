import validator from 'validator';

import db from '../db/index';
import utils from './utils/index';


const loginUser = (req, res) => {

  /** Check if the request came with no data or missing fields */
  if (!Object.prototype.hasOwnProperty.call(req.body, 'username') || !Object.prototype.hasOwnProperty.call(req.body, 'password')) {
    return res.status(400).send({ message: 'Please provide valid data with required fields' });
  }

  let { username, password } = req.body;

  if (validator.isEmpty(username) ||
     validator.isEmpty(password)) {
    return res.status(400).send({
      message: 'It seems one of the field is empty, Ensure no field is empty',
    });
  }

  /** clean up the data of white spaces */
  username = validator.trim(username);
  password = validator.trim(password);

  /**
   * @constant {string}
   * database query string
   */
  const text = `SELECT * FROM users WHERE username='${username}'`;

  /** Check by username then confirm the passowrd */
  return db.query(text)
    .then(result => result.rows[0])
    .then((user) => {
      if (utils.checkPassword(password, user.password)) {
        /**
         * genrate another token and save it
         */
        const token = utils.generateToken(user);
        return res.header('Authorization', token)
          .status(200).send({
            message: 'Login successful',
            userId: user.user_id,
            username: user.username,
            adminRole: user.admin_role,
            token,
          });
      }

      return res.status(400).send({
        message: 'Password not correct',
      });
    })
    .catch(err => res.status(400).send({
      message: 'Account with the credentials does not exist',
    }));
};

export default loginUser;

