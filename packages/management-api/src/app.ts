import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

export const getApp = () => {
  const app = express();
  app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
  }));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.post('/sessions', (_, res) => {
    res.json({ user: { id: 'a98sdf09', email: 'patrick@gmail.com', name: 'Patrick' } });
  })

  app.get('/api/v1/test', (_, res) => {
    res.json({ ok: true });
  });

  return app;
};
