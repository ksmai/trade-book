import express from 'express';

import listBooks from './list-books';

function listBooksHandler(req, res, next) {
  return listBooks({
    skip: parseInt(req.query.skip, 10) || 0,
    limit: parseInt(req.query.limit, 10) || 10,
  })
  .then(books => {
    return res.json({ books });
  })
  .catch(next);
}

const bookInfoRouter = new express.Router();
bookInfoRouter.get('/book', listBooksHandler);

export default bookInfoRouter;

