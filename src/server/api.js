import express from 'express';

import { ensureLogin } from './auth';
import bookRouter from './book/book.route';
import bookInfoRouter from './book-info/book-info.route';
import tradeRouter from './trade/trade.route';
import userRouter from './user/user.route';

/* eslint-disable-next-line no-unused-vars */
function apiErrorHandler(err, req, res, next) {
  if (err) {
    res.status(400).end();
  }
}

const api = new express.Router();
api.use(ensureLogin);
api.use(bookRouter);
api.use(bookInfoRouter);
api.use(tradeRouter);
api.use(userRouter);
api.use(apiErrorHandler);

export default api;

