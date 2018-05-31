import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import path from 'path';

/**
 * Represents the api using non-persistent data
 */
// import apiVersion1 from './api/api1';
import apiVersion1 from './api/api2';

const app = express();

// configure third party middleware
app.use(bodyParser.json());
app.use(morgan('combined'));
// app.use('/', express.static(path.resolve(__dirname, '../../UI/')));


const port = process.env.PORT || 3000;

app.use('/api/v1', apiVersion1);
// app.use('/api/v1', apiVersion2);

if (!module.parent) {
  app.listen(port);
}

export default app;
