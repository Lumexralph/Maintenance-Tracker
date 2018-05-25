import jwt from 'jsonwebtoken';
import config from '../../config/index';

let secret;
if (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'test') {
  ({ secret } = config);
} else {
  secret = process.env.SECRET;
}

const generateAuthToken = (userData) => {
  const access = 'auth';
  const token = jwt.sign({ user_id: String(userData.user_id), access }, secret).toString();

  return JSON.stringify({ access, token });
};

export default generateAuthToken;
