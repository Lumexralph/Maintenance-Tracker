import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'spirit',
  port: 5432,
});

const query = (text, params, callback) => pool.query(text, params, callback);

export default { query };
