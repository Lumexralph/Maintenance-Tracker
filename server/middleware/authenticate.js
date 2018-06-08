import decodedToken from './decodeToken';
import db from '../db/index';

const authenticate = (req, res, next) => {
  const token = req.header('Authorization');
  /**
   * check if token is in header
   * search database for user with such token
   */
  if (token) {
    const decodedUser = decodedToken(token);

    const text = `SELECT user_id, username, admin_role FROM users WHERE user_id = '${decodedUser.userId}'`;

    return db.query(text)
      .then((result) => {
        const user = result.rows[0];
        req.body.user = {
          userId: user.user_id,
          username: user.username,
          adminRole: user.admin_role,  
        };

        next();
        
        return req;
      })
      .catch(err => res.status(401).send({ message: 'The system could not verify the user with the token' }));
  }
  return res.status(401).send({ message: 'You are not allowed to perform action if not registered user' });
};

export default authenticate;
