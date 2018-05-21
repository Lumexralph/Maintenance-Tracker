import User from '../model/user';
import UserStorageSystem from '../data-store/user-datastore';


const signupUser = (req, res) => {
  let id;
  let username;
  let email;
  let password;
  ({ username, email, password } = req.body);

  // make a new instance
  const userData = new User(username, email, password);

  // create new user
  UserStorageSystem.createUser(userData).then((user) => {
    ({
      id, email, username, password,
    } = user);

    res.header('x-auth', user.token[0].token).status(201).send({
      id, email, username, password,
    });
  }, (err) => {
    res.status(400).send({
      message: err.message,
    });
  });
};

export default signupUser;
