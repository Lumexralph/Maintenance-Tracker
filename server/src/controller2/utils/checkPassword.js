import bcrypt from 'bcryptjs';

/**
 * @param {string} userStringPassword
 * @param {string} hashed password in database
 * @function {function} checkPassword returns boolean
 * if the password exists in the database
 */

const checkPassword = (userStringPassword, storedHashedPassword) => {
  return bcrypt.compareSync(userStringPassword, storedHashedPassword);
};

export default checkPassword;
