import UserStorageSystem from '../data-store/user-datastore';

const loginUser = (req, res) => {
  const { username, password } = req.body;

  UserStorageSystem.findByCredentials({ username, password })
    .then((user) => {
      res.header('x-auth', user.token[0].token).status(200).send(user);
    }, (err) => {
      res.status(401).send({ message: err.message });
    });
};

export default loginUser;
