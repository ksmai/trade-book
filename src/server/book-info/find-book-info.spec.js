import { Mockgoose } from 'mockgoose';
import mongoose from 'mongoose';

import BookInfo from './book-info.model';
import findBookInfo from './find-book-info';
import { testBookInfo } from '../test-util';

describe('Create book info controller', () => {
  beforeAll(done => {
    mongoose.Promise = Promise;

    return (new Mockgoose(mongoose))
      .prepareStorage()
      .then(() => mongoose.connect(''))
      .then(done)
      .catch(done.fail);
  }, 120000);

  beforeEach(done => {
    return BookInfo
      .remove({})
      .then(() => BookInfo.create(testBookInfo))
      .then(done, done.fail);
  });

  afterAll(done => {
    return mongoose
      .disconnect()
      .then(done, done.fail);
  });

  it('can create a new record given volumeID', done => {
    const volumeID = '3iWABwAAQBAJ';

    return findBookInfo({ volumeID })
      .then(() => BookInfo.findOne({ volumeID }).exec())
      .then(info => {
        expect(info.volumeID).toEqual(volumeID);
        expect(info.title).toEqual('You Don\'t Know JS: Up & Going');
        expect(info.subtitle).not.toBeDefined();
        expect(info.thumbnail).toEqual('//books.google.com/books/content?id=3iWABwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api');
      })
      .then(done, done.fail);
  });

  it('does not create a new record if volumeID exists', done => {
    return findBookInfo({ volumeID: testBookInfo.volumeID })
      .then(() => BookInfo.find({ volumeID: testBookInfo.volumeID }).exec())
      .then(infos => {
        expect(infos.length).toEqual(1);

        const info = infos[0].toObject();
        info._id = info._id.toString();
        delete info.__v;
        expect(info).toEqual(testBookInfo);
      })
      .then(done, done.fail);
  });

  it('reject an invalid volumeID', done => {
    return findBookInfo({ volumeID: 'xyz' }).then(done.fail, done);
  });
});

