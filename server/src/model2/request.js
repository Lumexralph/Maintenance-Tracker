import db from '../db/index';

const requestTable = `CREATE TABLE requests (
  request_id serial PRIMARY KEY,
  request_title VARCHAR (255) NOT NULL,
  request_content TEXT NOT NULL,
  department VARCHAR (255) DEFAULT 'Maintenance',
  user_id INT NOT NULL,
  status VARCHAR (100) DEFAULT 'pending',
  FOREIGN KEY (user_id) REFERENCES users (user_id)
 );`;

db.query(requestTable)
  .then(result => result)
  .catch(err => err);
