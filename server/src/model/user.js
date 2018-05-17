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
}

export default User;
