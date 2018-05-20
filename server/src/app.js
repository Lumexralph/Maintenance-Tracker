import express from 'express';

import apiVersion1 from './api/api-1';

const app = express();
const port = process.env.PORT || 3000;

app.use('/api/v1', apiVersion1);

if (!module.parent) {
  app.listen(port);
}

export default app;
