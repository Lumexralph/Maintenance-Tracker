import bcrypt from 'bcryptjs';

/**
 * @param {string} userStringPassword
 * @param {string} hashed password in database
 * @function {function} checkPassword returns boolean
 * if the password exists in the database
 */

const checkPassword = (password, hashedPassword) => bcrypt.compareSync(password, hashedPassword);

export default checkPassword;
