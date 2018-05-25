import { Pool, Client } from 'pg';
import config from '../config/index';

/**
 * @description {function}
 * to hold the database for production
 */
let query1 = null;

let db;
if (process.env.NODE_ENV === 'test') {
  db = config.dbtest;
} else if (process.env.NODE_ENV === 'dev') {
  ({ db } = config);
}
/**
 * @param {object} pool
 * @instance of Pool
 * @constructor Pool
 * gets conncection to database
 */

const pool = new Pool({
  user: config.user,
  host: config.host,
  database: db,
  password: config.password,
  port: config.port,
});

/**
 * @
 */

if (process.env.NODE_ENV === 'production') {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });

  client.connect();
  query1 = (text, params, callback) => client.query(text, params, callback);
}


const query2 = (text, params, callback) => pool.query(text, params, callback);

let query;

if (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'test') {
  query = query2;
} else {
  query = query1;
}

export default { query };
