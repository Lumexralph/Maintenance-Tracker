import db from '../db/index';

const createUserTable = `CREATE TABLE users(
  user_id serial PRIMARY KEY,
  username VARCHAR (50) UNIQUE NOT NULL,
  password VARCHAR (500) NOT NULL,
  email VARCHAR (355) UNIQUE NOT NULL,
  last_login TIMESTAMP,
  admin_role BOOL DEFAULT 'f',
  token json
 )`;


