import express from 'express';

import showOwners from './show-owners';
import showBooksOfUser from './show-books-of-user';
import addBook from './add-book';
import removeBook from './remove-book';

function getBookHandler(req, res, next) {
  return showOwners({ volumeID: req.params.volumeID })
    .then(books => {
      const payload = {
        books,
        volumeID: req.params.volumeID,
      };

      res.json(payload);
    })
  .catch(next);
}

function getMyBookHandler(req, res, next) {
  return showBooksOfUser({ user: req.user._id })
    .then(books => res.json({ books }))
    .catch(next);
}

function addBookHandler(req, res, next) {
  return addBook({ user: req.user._id, volumeID: req.body.volumeID })
    .then(book => res.json({ book }))
    .catch(next);
}

function removeBookHandler(req, res, next) {
  const user = req.user._id;
  const bookID = req.body.bookID;

  return removeBook({ user, bookID })
    .then(() => res.json({ bookID }))
    .catch(next);
}


const bookRouter = new express.Router();
bookRouter.get('/book/:volumeID', getBookHandler);
bookRouter.get('/mybook', getMyBookHandler);
bookRouter.post('/mybook', addBookHandler);
bookRouter.delete('/mybook', removeBookHandler);

export default bookRouter;

