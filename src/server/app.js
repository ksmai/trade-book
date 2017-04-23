import bodyParser from 'body-parser';
import compression from 'compression';
import express from 'express';
import helmet from 'helmet';
import historyApiFallback from 'connect-history-api-fallback';
import mongoose from 'mongoose';
import passport from 'passport';
import path from 'path';
import session from 'express-session';
import cookieSession from 'cookie-session';

import apiRouter from './api';
import { authRouter } from './auth';

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost/trade-book';
const SECRET = process.env.SECRET || 'keyboard cat';
const SESSION_OPTS = {
  secret: SECRET,
  resave: false,
  saveUninitialized: false,
};

mongoose
  .connect(MONGO_URL)
  .then(() => console.log(`MongoDB connected: ${MONGO_URL}`))
  .catch(err => {
    console.log(`Fail to connect to MongoDB(${MONGO_URL}): ${err}`);
    process.exit(1);
  });

const app = express();
app.use(compression());
app.use(helmet());
if (process.env.NODE_ENV === 'production') {
  app.use(cookieSession(Object.assign({
    maxAge: 24 * 60 * 60 * 1000,
  }, SESSION_OPTS)));
} else {
  app.use(session(SESSION_OPTS));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(authRouter);
app.use('/api/v1', apiRouter);

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');

  const webpackDevConfig = require('../../webpack.config');

  const compiler = webpack(webpackDevConfig);
  const instance = webpackDevMiddleware(compiler);
  app.use(instance);
  app.use(webpackHotMiddleware(compiler));
  app.use(historyApiFallback());
  app.use(instance);
} else {
  const DIST = path.join(__dirname, '..', '..', 'dist');

  app.use(express.static(DIST));
  app.get('*', (req, res) => res.sendFile('index.html', {
    root: DIST,
  }));
}

// for express error handler
/* eslint-disable-next-line no-unused-vars: "off' */
app.use((err, req, res, next) => res.status(500).end());

app.listen(PORT, () => console.log(
  `${process.env.NODE_ENV} server running on port ${PORT}`
));

export default app;

