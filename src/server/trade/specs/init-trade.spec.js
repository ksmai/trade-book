import { Mockgoose } from 'mockgoose';
import mongoose from 'mongoose';

import Book from '../../book/book.model';
import Trade from '../trade.model';
import initTrade from '../init-trade';
import { testBook } from '../../test-util';

describe('Init trade controller', () => {
  const requester = '58dcf48bfa60ba9503dd567d';

  beforeAll(done => {
    mongoose.Promise = Promise;

    return (new Mockgoose(mongoose))
      .prepareStorage()
      .then(() => mongoose.connect(''))
      .then(done, done.fail);
  }, 120000);

  beforeEach(done => {
    return Promise.all([Trade.remove({}), Book.remove({})])
      .then(() => Book.create(testBook))
      .then(done, done.fail);
  });

  afterAll(done => {
    return mongoose
      .disconnect()
      .then(done, done.fail);
  });

  it('initializes a trade', done => {
    return initTrade({ requester, book: testBook._id, comment: 'abc' })
      .then(done, done.fail);
  });

  it('does not create new trade for same book/requester', done => {
    const book = testBook._id;
    const query = { requester, book };

    return Trade
      .find(query)
      .exec()
      .then(trades => {
        expect(trades.length).toEqual(0);

        return initTrade({ ...query, comment: '1' });
      })
      .then(() => Trade.find(query).exec())
      .then(trades => {
        expect(trades.length).toEqual(1);

        return initTrade({ ...query, comment: '2' });
      })
      .then(() => Trade.find(query).exec())
      .then(trades => {
        expect(trades.length).toEqual(1);
      })
      .then(done, done.fail);
  });

  it('reject if requesting to trade for one\'s own book', done => {
    return initTrade({
      requester: testBook.user,
      book: testBook._id,
      comment: 'some comments',
    })
      .then(done.fail, done);
  });

  it('reject if no comment (leading/trailing spaces excluded)', done => {
    return initTrade({ requester: testBook.user, book: testBook._id })
      .then(done.fail, done);
  });
});

