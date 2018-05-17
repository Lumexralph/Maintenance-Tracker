import validator from 'validator';

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
      
      localUserStore.set(id, userData);

      const newUser = localUserStore.get(id);
      if (newUser) {
        resolve(newUser);
      }
      reject(new Error('User data not saved'));
    });
  }

}

export default UserStorageSystem;
