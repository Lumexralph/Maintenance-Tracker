import dotenv from 'dotenv';

dotenv.config();

const config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  user: process.env.DB_USER,
  db: process.env.DB_DATABASE,
  secret: process.env.JWT_SECRET,
};

export default config;
