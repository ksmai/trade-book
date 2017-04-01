import express from 'express';

import initTrade from './init-trade';
import approveTrade from './approve-trade';
import completeTrade from './complete-trade';
import withdrawTrade from './withdraw-trade';
import listRequests from './list-requests';
import listPending from './list-pending';

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

const tradeRouter = new express.Router();
tradeRouter.post('/trade', initTradeHandler);
tradeRouter.put('/trade', updateTradeHandler);
tradeRouter.delete('/trade', withdrawTradeHandler);
tradeRouter.get('/trade', listTradeHandler);

export default tradeRouter;

