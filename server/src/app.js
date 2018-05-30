import express from 'express';

/**
 * Represents the api using non-persistent data
 */
// import apiVersion1 from './api/api1';
import apiVersion1 from './api/api2';

const app = express();
const port = process.env.PORT || 3000;

app.use('/api/v1', apiVersion1);
// app.use('/api/v1', apiVersion2);

if (!module.parent) {
  app.listen(port);
}

export default app;
