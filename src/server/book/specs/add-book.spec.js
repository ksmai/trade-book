import { Mockgoose } from 'mockgoose';
import mongoose from 'mongoose';

import addBook from '../add-book';
import Book from '../book.model';
import { testUser, testBookInfo } from '../../test-util';

describe('Add book controller', () => {
  beforeAll(done => {
    mongoose.Promise = Promise;

    return (new Mockgoose(mongoose))
      .prepareStorage()
      .then(() => mongoose.connect(''))
      .then(done, done.fail);
  }, 120000);

  afterAll(done => {
    return mongoose
      .disconnect()
      .then(done, done.fail);
  });

  it('add a new book', done => {
    const user = testUser._id;
    const volumeID = testBookInfo.volumeID;

    return addBook({ user, volumeID })
      .then(book => {
        expect(book.user.toString()).toEqual(user);
      })
      .then(done, done.fail);
  });

  it('does not add the same book twice', done => {
    const user = testUser._id;
    const volumeID = testBookInfo.volumeID;

    return addBook({ user, volumeID })
      .then(() => addBook({ user, volumeID }))
      .then(() => Book.find({ user }))
      .then(books => {
        expect(books.length).toEqual(1);

        return books[0];
      })
      .then(book => {
        expect(book.user.toString()).toEqual(user);
      })
      .then(done, done.fail);
  });
});

