import { Mockgoose } from 'mockgoose';
import mongoose from 'mongoose';

import BookInfo from '../book-info.model';
import listBooks from '../list-books';
import { testBookInfo } from '../../test-util';

describe('List books controller', () => {
  beforeAll(done => {
    mongoose.Promise = Promise;

    return (new Mockgoose(mongoose))
      .prepareStorage()
      .then(() => mongoose.connect(''))
      .then(done)
      .catch(done.fail);
  }, 120000);

  beforeEach(done => {
    const moreBookInfo = Array(10)
      .fill()
      .map((e, i) => ({
        volumeID: String(i),
        title: `${testBookInfo.title}${i}`,
        thumbnail: `//${i}`,
      }));

    return BookInfo
      .remove({})
      .then(() => BookInfo.create(testBookInfo))
      .then(() => BookInfo.create(moreBookInfo))
      .then(done, done.fail);
  });

  afterAll(done => {
    return mongoose
      .disconnect()
      .then(done, done.fail);
  });

  it('limit results', done => {
    return listBooks({ skip: 0, limit: 1 })
      .then(books => {
        expect(books.length).toEqual(1);
        expect(books[0]._id.toString()).toEqual(testBookInfo._id);
      })
      .then(done, done.fail);
  });

  it('skip results', done => {
    return listBooks({ skip: 1, limit: 2 })
      .then(books => {
        expect(books.length).toEqual(2);
        const volumeIDs = books.map(book => book.volumeID);
        expect(volumeIDs).toEqual(['0', '1']);
      })
      .then(done, done.fail);
  });

  it('skip 0 limit 10 by default', done => {
    return listBooks()
      .then(books => {
        expect(books.length).toEqual(10);
        expect(books[0].subtitle).toEqual(testBookInfo.subtitle);
      })
      .then(done, done.fail);
  });
});

