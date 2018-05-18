import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// this class will build new instances of users that will be stored
class User {
  constructor(username, email, password) {
    this.id = null;
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = 'Non-Admin';
    this.token = [];
  }

  generateAuthToken() {
    const access = 'auth';
    const token = jwt.sign({ id: String(this.id), access }, 'abc').toString();

    this.token.push({ access, token });
  }

  hashPassword() {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.password, salt);

    // replace with the hashed password
    this.password = hash;
  }

  checkPassword(userStringPassword) {
    return bcrypt.compareSync(userStringPassword, this.password);
  }
}

export default User;
