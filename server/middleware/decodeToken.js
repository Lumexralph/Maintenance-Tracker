import jwt from 'jsonwebtoken';
import config from '../config/index';

let secret;
if (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'test') {
  ({ secret } = config);
} else {
  secret = process.env.SECRET;
}

/**
 * if secret pattern was changed or token was altered     JWT will throw an error
 */

const decodeToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return new Error(error);
  }
};

export default decodeToken;
