import { Mockgoose } from 'mockgoose';
import mongoose from 'mongoose';

import Book from '../book.model';
import BookInfo from '../../book-info/book-info.model';
import { testBook, testBookInfo } from '../../test-util';
import showBooksOfUser from '../show-books-of-user';

describe('Show books of user controller', () => {
  beforeAll(done => {
    mongoose.Promise = Promise;

    return (new Mockgoose(mongoose))
      .prepareStorage()
      .then(() => mongoose.connect(''))
      .then(done, done.fail);
  }, 120000);

  beforeEach(done => {
    return Promise.all([Book.remove({}), BookInfo.remove({})])
      .then(() => Promise.all([
        Book.create(testBook),
        BookInfo.create(testBookInfo),
      ]))
      .then(done, done.fail);
  });

  afterAll(done => {
    return mongoose
      .disconnect()
      .then(done, done.fail);
  });

  it('shows all books owned by a certain user', done => {
    return showBooksOfUser({ user: testBook.user })
      .then(books => {
        expect(books.length).toEqual(1);
        expect(books[0].info._id.toString()).toEqual(testBookInfo._id);
        expect(books[0].info.title).toEqual(testBookInfo.title);
        expect(books[0].info.subtitle).toEqual(testBookInfo.subtitle);
        expect(books[0].info.thumbnail).toEqual(testBookInfo.thumbnail);
      })
      .then(done, done.fail);
  });
});

