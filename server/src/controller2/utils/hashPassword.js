import bcrypt from 'bcryptjs';

const hashPassword = (stringPassword) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(stringPassword, salt);

  return hash;
};

export default hashPassword;
