import db from '../../db/index';
import utils from '../../controller/utils/index';


const user = {
  user_id: 1,
	username: "Ralph",
	password: "gatekeeper",
  email: "ralph@gmail.com",
  admin_role: false
};

const userToken = utils.generateToken(user);

const adminUser = {
  user_id: 2,
  username1: 'Bj',
  password1: 'spirit',
  email1: 'bj@gmail.com',
  admin_role: true
};

const adminToken = utils.generateToken(adminUser);

const {
  username, password, email,
} = user;

const {
  username1, password1, email1
} = adminUser;

const userHashedPassword = utils.hashPassword(password);
const adminHashedPassword = utils.hashPassword(password1);


const userData = `INSERT INTO users (username, password, email)
VALUES
 ('${username}', '${userHashedPassword}', '${email}');
INSERT INTO users (username, password, email, admin_role) VALUES
 ('${username1}', '${adminHashedPassword}', '${email1}', 't');`;

/**
 * after all tests clear table
 */

const tables = `CREATE TABLE users(
  user_id serial PRIMARY KEY,
  username VARCHAR (50) UNIQUE NOT NULL,
  password VARCHAR (500) NOT NULL,
  email VARCHAR (355) UNIQUE NOT NULL,
  last_login TIMESTAMP,
  admin_role BOOL DEFAULT 'f'
 );
 CREATE TABLE requests (
  request_id serial PRIMARY KEY,
  request_title VARCHAR (255) NOT NULL,
  request_content TEXT NOT NULL,
  department VARCHAR (255) DEFAULT 'Maintenance',
  user_id INT NOT NULL,
  status VARCHAR (100) DEFAULT 'pending',
  FOREIGN KEY (user_id) REFERENCES users (user_id)
 );`;

const text = 'DROP TABLE IF EXISTS requests; DROP TABLE IF EXISTS users;';

const createTables = async () => { 
  await db.query(text)  
  await db.query(tables)
  await db.query(userData)
};

const userDataWithInvalidEmail = {
  username: 'Looemuu',
  password1: 'gatekeeper',
  password2: 'gatekeeper',
  email: 'oldrlpkookh@',
};

const userDataWithEmptyField =  {
    username: '',
    password1: 'gatekeeper',
    password2: 'gatekeeper',
    email: 'oldrlpkookh@gmail.com',
  };

  const userDataWithDifferentPasswords = {
    username: 'Lumexy',
    password1: 'gatekee',
    password2: 'gatekeeper',
    email: 'oldrlpkookh@gmail.com',
  };

  const validUserData = {
    username: 'Lumexy',
    password1: 'gatekeeper',
    password2: 'gatekeeper',
    email: 'oldrlpkookh@gmail.com',
  };

  const userDataThatUsernameExists = {
    username: "Ralph",
    password1: "gatekeeper",
    password2: "gatekeeper",
    email: "ralph@gmail.com",
  };

  const userWithPresentEmail = {
    username: "Ralphy",
    password1: "gatekeeper",
    password2: "gatekeeper",
    email: "ralph@gmail.com",
  };

export {
  user,
  createTables,
  userDataWithInvalidEmail,
  userDataWithEmptyField,
  userDataWithDifferentPasswords,
  validUserData,
  userDataThatUsernameExists,
  userWithPresentEmail,
  userToken
};