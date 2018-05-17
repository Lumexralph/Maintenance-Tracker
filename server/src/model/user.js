import jwt from 'jsonwebtoken';

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
    const token = jwt.sign({ _id: String(this.id), access }, 'abc').toString();

    this.token.push({ access, token });
  }
}

export default User;
