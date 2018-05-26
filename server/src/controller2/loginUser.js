import db from '../db/index';
import checkPassword from '../controller2/utils/checkPassword';
import generateAuthToken from './utils/generateToken';

const loginUser = (req, res) => {
  const { username, password } = req.body;

  /**
   * @constant {string}
   * database query string
   */
  const text = `SELECT * FROM users WHERE username='${username}'`;

  /** Check by username then confirm the passowrd */
  db.query(text)
    .then(result => result.rows[0])
    .then((user) => {
      if (checkPassword(password, user.password)) {
        /**
         * genrate another token and save it
         */
        const token = generateAuthToken(user);
        const text2 = `UPDATE users 
      SET token = '${token}' WHERE user_id = '${user.user_id}' RETURNING *`;
        db.query(text2)
          .then(result =>
            /** set the header with token */
            res.header('Authorization', result.rows[0].token.token)
              .status(200).send({
                message: 'Login Successful',
              }))
          .catch(err => res.status(501).send({
            message: 'Internal Error',
          }));
        return undefined;
      }
      return res.status(400).send({
        message: 'Password not correct',
      });
    })
    .catch(err => res.status(400).send({
      message: 'Account does not exist',
    }));
};

export default loginUser;

