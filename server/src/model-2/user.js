class User {
  constructor(username, email, password) {
    this.userId = null;
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = 'Non-Admin';
    this.token = [];
  }
}

//   generateAuthToken() {
//     const access = 'auth';
//     const token = jwt.sign({ id: String(this.id), access }, 'abc').toString();

//     this.token[0] = { access, token };
//   }

//   hashPassword() {
//     const salt = bcrypt.genSaltSync(10);
//     const hash = bcrypt.hashSync(this.password, salt);

//     // replace with the hashed password
//     this.password = hash;
//   }

//   checkPassword(userStringPassword) {
//     return bcrypt.compareSync(userStringPassword, this.password);
//   }

//   clearToken() {
//     this.token = [];

//     return !this.token.length;
//   }
// }

export default User;
