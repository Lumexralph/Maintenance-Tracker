import jwt from 'jsonwebtoken';
import config from '../../config/index';

const generateAuthToken = (userData) => {
  const access = 'auth';
  const token = jwt.sign({ user_id: String(userData.user_id), access }, config.secret).toString();

  return JSON.stringify({ access, token });
};

export default generateAuthToken;
