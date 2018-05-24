import jwt from 'jsonwebtoken';

const generateAuthToken = (userData) => {
  const access = 'auth';
  const token = jwt.sign({ user_id: String(userData.user_id), access }, 'abc').toString();

  return JSON.stringify({ access, token });
};

export default generateAuthToken;
