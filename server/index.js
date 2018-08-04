import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';

import config from './config/index';
import apiVersion1 from './versioning/v1';
import apiVersion2 from './versioning/v2';

const PORT = process.env.PORT || 3000;

console.log(config.mongoUri)

const promise = mongoose.connect(config.mongoUri, { useMongoClient: true }, function (err) {
  if (err) {
    console.log('Could not connect to mongo db');
    console.log(err);
  }
  else {
    console.log('Successfully connected to mongo db');
  }
});

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));

// Remember to set this in your enviroment variables later
// app.set('superSecret', 'helloword');
// api versioning;
app.use('/api/v1', apiVersion1);
app.use('/api/v2', apiVersion2);
app.get('/', (req, res) => res.send({ ok: true, message: 'Welcome to Evangelism Management System', baseurl: '/api/{version}' }).status(200));
app.listen(PORT, () => {
  if (process.env.NODE_ENV === 'dev') {
    /* eslint no-console: 0 */
    console.log(`The Dev server is running on port ${PORT}`);
  } else {
    console.log(`The production server is now running at ${PORT}`);
  }
});

export default app;
