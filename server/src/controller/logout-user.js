import UserStorageSystem from '../data-store/user-datastore';

const logoutUser = (req, res) => {
  const { user } = req;

  UserStorageSystem.endUserProcess(user)
    .then(
      result => res.status(200).send('logged out'),
      err => res.status(400).send('error'),
    );
};

export default logoutUser;
