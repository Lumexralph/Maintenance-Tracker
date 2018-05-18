import UserStorageSystem from '../data-store/user-datastore';

const authenticate = (req, res, next) => {
  const token = req.header('x-auth');

  // check the token
  UserStorageSystem.findByToken(token)
    .then((user) => {
      req.user = user;
      req.token = token;
      next();
    }, err => res.status(401).send({ message: err.message }));
};

export default authenticate;
