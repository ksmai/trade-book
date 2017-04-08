import { Mockgoose } from 'mockgoose';
import mongoose from 'mongoose';

import Book from '../book.model';
import User from '../../user/user.model';
import showOwner from '../show-owner';
import { testUser, testBook } from '../../test-util';

describe('Show owner handler', () => {
  beforeAll(done => {
    mongoose.Promise = Promise;
    
    return (new Mockgoose(mongoose))
      .prepareStorage()
      .then(() => mongoose.connect(''))
      .then(done, done.fail);
  }, 120000);

  beforeEach(done => {
    return Promise.all([
      User.remove({}),
      Book.remove({}),
    ])
      .then(() => Promise.all([
        User.create(testUser),
        Book.create(testBook),
      ]))
      .then(done, done.fail);
  });

  afterAll(done => {
    return mongoose.disconnect().then(done, done.fail);
  });

  it('shows the owner of a particular book', done => {
    return showOwner({ bookID: testBook._id })
      .then(book => {
        expect(book._id.toString()).toEqual(testBook._id);
        expect(book.user._id.toString()).toEqual(testUser._id);
        expect(book.user.name).toEqual(testUser.name);
      })
      .then(done, done.fail);
  });

  it('rejects if book not found', done => {
    return showOwner({ bookID: testUser._id })
      .then(done.fail, done);
  });
});

