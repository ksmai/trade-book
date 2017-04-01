import bodyParser from 'body-parser';
import express from 'express';
import supertest from 'supertest';

import bookRouter from '../book.route';
import * as addBook from '../add-book';
import * as removeBook from '../remove-book';
import * as showBooksOfUser from '../show-books-of-user';
import * as showOwners from '../show-owners';

describe('Book routes', () => {
  let request;
  const volumeID = 'myVolumeID';
  const userID = 'myUserID';
  const book = { foo: 'bar', baz: 42 };
  const bookID = 'myBookID';

  beforeAll(() => {
    const app = express();
    app.use(bodyParser.json());
    app.use((req, res, next) => {
      req.user = { _id: userID };
      next();
    });
    app.use(bookRouter);
    request = supertest(app);
  });

  it('add a book', done => {
    spyOn(addBook, 'default').and.returnValue(Promise.resolve(book));

    return request
      .post('/mybook')
      .send({ volumeID })
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(addBook.default).toHaveBeenCalledWith({
          volumeID,
          user: userID,
        });
        expect(res.body).toEqual({ book });
      })
      .then(done, done.fail);
  });

  it('remove a book', done => {
    spyOn(removeBook, 'default').and.returnValue(Promise.resolve());

    return request
      .delete('/mybook')
      .send({ bookID })
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(removeBook.default).toHaveBeenCalledWith({
          bookID,
          user: userID,
        });
        expect(res.body).toEqual({ bookID });
      })
      .then(done, done.fail);
  });

  it('show owners of a book, if any', done => {
    spyOn(showOwners, 'default').and.returnValue(Promise.resolve([]));

    return request
      .get(`/book/${volumeID}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(showOwners.default).toHaveBeenCalledWith({ volumeID });
        expect(res.body).toEqual({
          volumeID,
          books: []
        });
      })
      .then(done, done.fail);
  });

  it('list own books', done => {
    spyOn(showBooksOfUser, 'default').and.returnValue(Promise.resolve([]));

    return request
      .get('/mybook')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(showBooksOfUser.default).toHaveBeenCalledWith({
          user: userID,
        });
        expect(res.body).toEqual({ books: [] });
      })
      .then(done, done.fail);
  });

});

