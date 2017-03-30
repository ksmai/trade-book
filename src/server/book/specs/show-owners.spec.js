import { Mockgoose } from 'mockgoose';
import mongoose from 'mongoose';

import showOwners from '../show-owners';
import Book from '../book.model';
import BookInfo from '../../book-info/book-info.model';
import User from '../../user/user.model';
import { testBook, testBookInfo, testUser } from '../../test-util';

describe('Show owners controller', () => {
  beforeAll(done => {
    mongoose.Promise = Promise;

    return (new Mockgoose(mongoose))
      .prepareStorage()
      .then(() => mongoose.connect(''))
      .then(done, done.fail);
  }, 120000);

  beforeEach(done => {
    return Promise.all([
      Book.remove({}),
      BookInfo.remove({}),
      User.remove({}),
    ]).then(() => Promise.all([
      Book.create(testBook),
      BookInfo.create(testBookInfo),
      User.create(testUser),
    ])).then(done, done.fail);
  });

  afterAll(done => {
    return mongoose
      .disconnect()
      .then(done, done.fail);
  });

  it('show ownerships of a book', done => {
    return showOwners({ volumeID: testBookInfo.volumeID })
      .then(books => {
        expect(books.length).toEqual(1);

        const { _id, displayName, email, location } = books[0].user;
        expect(_id.toString()).toEqual(testUser._id);
        expect(displayName).toEqual(testUser.displayName);
        expect(email).toEqual(testUser.email);
        expect(location).toEqual(testUser.location);
      })
      .then(done, done.fail);
  });
});

