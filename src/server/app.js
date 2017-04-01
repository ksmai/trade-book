import bodyParser from 'body-parser';
import compression from 'compression';
import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import passport from 'passport';
import path from 'path';
import session from 'express-session';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import apiRouter from './api';
import { authRouter } from './auth';
import webpackDevConfig from '../../webpack.config';

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
app.use(session(SESSION_OPTS));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(authRouter);
app.use('/api/v1', apiRouter);

const compiler = webpack(webpackDevConfig);
app.use(webpackDevMiddleware(compiler));
app.use(webpackHotMiddleware(compiler));

app.use((err, req, res, next) => res.status(500).end());

app.listen(PORT, () => console.log(`Development Server running on port ${PORT}`));

export default app;

