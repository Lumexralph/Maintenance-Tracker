import { Pool, Client } from 'pg';
import config from '../config/index';

const pool = new Pool({
  user: config.user,
  host: config.host,
  database: config.db,
  password: config.password,
  port: config.port,
});

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();

const query1 = (text, params, callback) => client.query(text, params, callback);

const query2 = (text, params, callback) => pool.query(text, params, callback);

let query;

if (process.env.NODE_ENV === 'dev') {
  query = query2;
} else {
  query = query1;
}

export default { query };
