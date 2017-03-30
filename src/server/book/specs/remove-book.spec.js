import { Mockgoose } from 'mockgoose';
import mongoose from 'mongoose';

import removeBook from '../remove-book';
import Book from '../book.model';
import { testBook } from '../../test-util';

describe('Remove book controller', () => {
  beforeAll(done => {
    mongoose.Promise = Promise;

    return (new Mockgoose(mongoose))
      .prepareStorage()
      .then(() => mongoose.connect(''))
      .then(done, done.fail);
  }, 120000);

  beforeEach(done => {
    return Book
      .remove({})
      .then(() => Book.create(testBook))
      .then(done, done.fail);
  });

  afterAll(done => {
    return mongoose
      .disconnect()
      .then(done, done.fail);
  });

  it('remove a book', done => {
    const { user, _id: bookID } = testBook;

    return Book
      .find({})
      .exec()
      .then(books => {
        expect(books.length).toEqual(1);

        return removeBook({ user, bookID });
      })
      .then(() => Book.find({}).exec())
      .then(books => {
        expect(books.length).toEqual(0);
      })
      .then(done, done.fail);
  });
});

