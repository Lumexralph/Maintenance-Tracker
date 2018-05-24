import { Pool } from 'pg';
import config from '../config/index';

const pool = new Pool({
  user: config.user,
  host: config.host,
  database: config.dbtest,
  password: config.password,
  port: config.port,
});

const query = (text, params, callback) => pool.query(text, params, callback);

export default { query };
