import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import validator from 'validator';

import User from '../model-2/user';

const createUserAccount = (req, res) => {
  const {
    username, password1, password2, email,
  } = req.body;

  if (password1 !== password2) {
    res.status(400).send({
      status: 'Error',
      message: 'Passwords do not match',
    });
  }

  if (!validator.isEmail(email)) {
    res.status(400).send({
      status: 'Error',
      message: 'Please, provide valid email',
    });
  }
};

export default createUserAccount;
