import validator from 'validator';
import jwt from 'jsonwebtoken';

const localUserStore = new Map();
let id = 0;
let usernameExists = false;
let emailExists = false;

// import validator library to validate email

class UserStorageSystem {

  static validateEmail(email) {
    return validator.isEmail(email);
  }

  static verifyDetails(userData) {

    localUserStore.forEach((value, key) => {
      if (value.username === userData.username) {
        usernameExists = true;
      }
      if (value.email === userData.email) {
        emailExists = true;
      }
    });
  }

  static createUser(userData) {
    return new Promise((resolve, reject) => {
      // check if email is valid
      if (!UserStorageSystem.validateEmail(userData.email)) {
        throw new Error('Please provide a valid email');
      }

      // check for uniqueness
      UserStorageSystem.verifyDetails(userData);
      if (usernameExists || emailExists) {
        usernameExists = false;
        emailExists = false;

        throw new Error('username or email already exists');
      }

      // if the data doesn't exist yet
      // add new user and increase count
      id += 1;
      userData.id = id;

      // generate the token
      userData.generateAuthToken();

      // hash the password before saving
      userData.hashPassword();
      
      // save the data
      localUserStore.set(id, userData);

      const newUser = localUserStore.get(id);
      if (newUser) {
        resolve(newUser);
      }
      reject(new Error('User data not saved'));
    });
  }
  // needed to verify user id from token in header

  static findByToken(token) {
    return new Promise((resolve, reject) => {
      let decodedUser = null;

      // if secret pattern was changed or token was altered JWT will throw an error

      try {
        decodedUser = jwt.verify(token, 'abc');
      } catch (error) {
        throw new Error(error);
      }

      // if there's successful verification of token get the id
      // check the data store, if found check the token and return the user
      const userWithId = localUserStore.get(Number(decodedUser.id));

      if (userWithId.token[0].token === token && userWithId.token[0].access === decodedUser.access) {
        resolve(userWithId);
      }

      // if the user can not be found
      if (!userWithId) {
        throw new Error('User id does not exists');
      }

      reject(new Error('No user with the token'));

    });
  }

  static findByCredentials(username, password) {
    
  }

}

export default UserStorageSystem;
