import express from 'express';

import apiVersion1 from './api/api-1';

const app = express();

app.use('/api/v1', apiVersion1);

if (!module.parent) {
  app.listen(3000);
}

export default app;
