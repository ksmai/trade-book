import { Mockgoose } from 'mockgoose';
import mongoose from 'mongoose';

import Book from '../../book/book.model';
import BookInfo from '../../book-info/book-info.model';
import Trade from '../trade.model';
import listPending from '../list-pending';
import {
  testUser,
  testTrade,
  testBook,
  testBookInfo
} from '../../test-util';

describe('List pending controller', () => {
  beforeAll(done => {
    mongoose.Promise = Promise;

    return (new Mockgoose(mongoose))
      .prepareStorage()
      .then(() => mongoose.connect(''))
      .then(done, done.fail);
  }, 120000);

  beforeEach(done => {
    return Promise.all([
      Trade.remove({}),
      Book.remove({}),
      BookInfo.remove({}),
    ]).then(() => Promise.all([
      Trade.create(testTrade),
      Book.create(testBook),
      BookInfo.create(testBookInfo),
    ])).then(done, done.fail);
  });

  afterAll(done => {
    return mongoose
      .disconnect()
      .then(done, done.fail);
  });

  it('lists all requests created for books owned by user', done => {
    return listPending({ user: testBook.user })
      .then(trades => {
        expect(trades.length).toEqual(1);
        expect(trades[0].requester.name).toEqual(testUser.name);
        expect(trades[0].book.info.title).toEqual(testBookInfo.title);
      })
      .then(done, done.fail);
  });
});

