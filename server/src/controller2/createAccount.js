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
      status: 'Error',
      message: 'Ensure no field is empty',
    });
  }


  if (password1 !== password2) {
    return res.status(400).send({
      status: 'Error',
      message: 'Passwords do not match',
    });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).send({
      status: 'Error',
      message: 'Please, provide valid email',
    });
  }
  // hash the password just one
  hashedPassword = hashPassword(password1);
  // insert data in db
  const text = `INSERT INTO users(username, password, email) VALUES('${username}', '${hashedPassword}', '${email}') RETURNING *`;

  db.query(text)
    .then(result => result.rows[0])
    .then((result) => {
      const jsonToken = generateAuthToken(result);

      const text2 = `UPDATE users 
      SET token = '${jsonToken}' WHERE user_id = '${result.user_id}' RETURNING *`;

      /**
       * Token is updated in the database
       */
      db.query(text2)
        .then((newUser) => {
          const data = newUser.rows[0];
          const {
            user_id, username, admin_role, token,
          } = data;

          /**
           * add token to a custom field in response object header
           */
          res.header('x-auth', token.token).status(201).send({
            message: 'success',
            body: { user_id, username, admin_role },
          });
        })
        .catch(err => res.status(400).send({
          message: 'error',
          body: 'username or email exists, use another one',
        }));
    })
    .catch(err => res.status(400).send({
      message: 'error',
      body: 'username or email exists, use another one',
    }));
};

export default createUserAccount;


//   checkPassword(userStringPassword) {
//     return bcrypt.compareSync(userStringPassword, this.password);
//   }

//   clearToken() {
//     this.token = [];

//     return !this.token.length;
//   }
// }
