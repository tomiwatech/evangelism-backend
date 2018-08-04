
import { Router } from 'express';
import users from '../routes/evangelism/user';

const api = Router();

api.get('/', (req, res) => res.send({ ok: true, message: 'Management System', status: 'API version 2' }));
api.use('/auth', users);
api.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// No routes matched? 404.
api.use((req, res) => res.status(404).send('Sorry that route/method doesnt exist'));

export default api;
