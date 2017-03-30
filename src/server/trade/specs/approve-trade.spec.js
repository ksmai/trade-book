import { Mockgoose } from 'mockgoose';
import mongoose from 'mongoose';

import Book from '../../book/book.model';
import Trade from '../trade.model';
import approveTrade from '../approve-trade';
import { testUser, testTrade, testBook } from '../../test-util';

describe('Approve trade controller', () => {
  beforeAll(done => {
    mongoose.Promise = Promise;

    return (new Mockgoose(mongoose))
      .prepareStorage()
      .then(() => mongoose.connect(''))
      .then(done, done.fail);
  }, 120000);

  beforeEach(done => {
    return Promise.all([Trade.remove({}), Book.remove({})])
      .then(() => Promise.all([
        Trade.create(testTrade),
        Book.create(testBook),
      ]))
      .then(done, done.fail);
  });

  afterAll(done => {
    return mongoose
      .disconnect()
      .then(done, done.fail);
  });

  it('accept a trade', done => {
    const user = testUser._id;
    const approval = true;
    const tradeID = testTrade._id;

    return approveTrade({ user, approval, tradeID })
      .then(trade => {
        expect(trade.isRejected).toEqual(false);
        expect(trade.isAccepted).toEqual(true);
      })
      .then(done, done.fail);
  });

  it('reject a trade', done => {
    const user = testUser._id;
    const approval = false;
    const tradeID = testTrade._id;

    return approveTrade({ user, approval, tradeID })
      .then(trade => {
        expect(trade.isRejected).toEqual(true);
        expect(trade.isAccepted).toEqual(false);
      })
      .then(done, done.fail);
  });

  it('reject if the trade is already accepted/rejected', done => {
    const user = testUser._id;
    const approval = false;
    const tradeID = testTrade._id;

    return approveTrade({ user, approval, tradeID })
      .then(() => approveTrade({ user, approval, tradeID }))
      .then(done.fail, done);
  });
});

