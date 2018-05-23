import express from 'express';

import apiVersion1 from './api/api-1';
import apiVersion2 from './api/api-2';

const app = express();
const port = process.env.PORT || 3000;

// app.use('/api/v1', apiVersion1);
app.use('/api/v1', apiVersion2);

if (!module.parent) {
  app.listen(port);
}

export default app;
