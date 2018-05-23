import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import validator from 'validator';

const createUserAccount = (req, res) => {
  const {
    username, password1, password2, email,
  } = req.body;

  // clean up the data of white spaces
  validator.trim(username);
  validator.trim(password1);
  validator.trim(password2);
  validator.trim(email);

  if (validator.isEmpty(username) ||
     validator.isEmpty(password1) ||
     validator.isEmpty(password2) ||
     validator.isEmpty(email)) {
    res.status(400).send({
      status: 'Error',
      message: 'Ensure no field is empty',
    });
  }
  

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

  // hash the password just one

  // insert data in db 

  // get it back create token and add token field in db

  // insert it, get it back and send to user
  
};

export default createUserAccount;




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
