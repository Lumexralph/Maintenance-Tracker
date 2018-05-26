import db from '../db/index';

const requestTable = `CREATE TABLE requests (
  request_id serial PRIMARY KEY,
  request_title VARCHAR (255) NOT NULL,
  request_content TEXT NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (user_id)
 )`;

db.query(requestTable);
