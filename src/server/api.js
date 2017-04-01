import express from 'express';

import { ensureLogin } from './auth';
import updateInfo from './user/update-info';
import changePassword from './user/change-password';
import listBooks from './book-info/list-books';
import showOwners from './book/show-owners';
import showBooksOfUser from './book/show-books-of-user';
import addBook from './book/add-book';
import removeBook from './book/remove-book';
import initTrade from './trade/init-trade';
import approveTrade from './trade/approve-trade';
import completeTrade from './trade/complete-trade';
import withdrawTrade from './trade/withdraw-trade';
import listRequests from './trade/list-requests';
import listPending from './trade/list-pending';

function apiErrorHandler(err, req, res, next) {
  if (err) {
    res.status(400).end();
  }
}

function userHandler(req, res, next) {
  const hasPassword = req.body.oldPassword && req.body.newPassword;
  let action;

  if (hasPassword) {
    action = changePassword({
      name: req.user.name,
      oldPassword: req.body.oldPassword,
      newPassword: req.body.newPassword,
    });
  } else {
    action = updateInfo({
      name: req.user.name,
      email: req.body.email,
      location: req.body.loaction,
      displayName: req.body.displayName,
    });
  }
  
  return action.then(user => {
    const userObj = user.toObject();
    delete userObj.hash;
    delete userObj.__v;

    return res.json({ user: userObj });
  }).catch(next);
}

function listBooksHandler(req, res, next) {
  return listBooks({
    skip: req.query.skip || 0,
    limit: req.query.limit || 10,
  })
    .then(books => {
      return res.json({ books });
    })
    .catch(next);
}

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

function initTradeHandler(req, res, next) {
  return initTrade({
    requester: req.user._id,
    comment: req.body.comment,
    book: req.body.bookID,
  })
    .then(trade => res.json({ trade }))
    .catch(next);
}

function updateTradeHandler(req, res, next) {
  const requester = req.user._id;
  const user = requester;
  const tradeID = req.body.tradeID;
  let action;

  switch (req.body.action.toLowerCase().trim()) {
    case 'accept':
      action = approveTrade({ user, tradeID, approval: true });
      break;
    case 'reject':
      action = approveTrade({ user, tradeID, approval: false });
      break;
    case 'complete':
      action = completeTrade({ requester, tradeID });
      break;
    default:
      action = Promise.reject(new Error('Unknown action'));
  }

  return action
    .then(trade => res.json({ trade }))
    .catch(next);
}

function withdrawTradeHandler(req, res, next) {
  return withdrawTrade({
    requester: req.user._id,
    tradeID: req.body.tradeID,
  })
    .then(() => res.json({ tradeID: req.body.tradeID }))
    .catch(next);
}

function listTradeHandler(req, res, next) {
  let action;
  if (req.query.pending !== undefined) {
    action = listPending({ user: req.user._id });
  } else {
    action = listRequests({ requester: req.user._id });
  }

  return action
    .then(trades => res.json({ trades }))
    .catch(next);
}

const api = new express.Router();
api.use(ensureLogin);

api.put('/user', userHandler);
api.get('/book/:volumeID', getBookHandler);
api.get('/book', listBooksHandler);
api.get('/mybook', getMyBookHandler);
api.post('/mybook', addBookHandler);
api.delete('/mybook', removeBookHandler);
api.post('/trade', initTradeHandler);
api.put('/trade', updateTradeHandler);
api.delete('/trade', withdrawTradeHandler);
api.get('/trade', listTradeHandler);

api.use(apiErrorHandler);

export default api;

