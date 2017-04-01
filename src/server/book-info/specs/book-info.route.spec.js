import express from 'express';
import supertest from 'supertest';

import bookInfoRouter from '../book-info.route';
import * as listBooks from '../list-books';

describe('Book info routes', () => {
  let request;

  beforeAll(() => {
    const app = express();
    app.use(bookInfoRouter);
    request = supertest(app);
  });

  it('list book info', done => {
    const skip = 42;
    const limit = 17;
    const ret = 'something';
    spyOn(listBooks, 'default').and.returnValue(Promise.resolve(ret));

    return request
      .get(`/book?skip=${skip}&limit=${limit}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(listBooks.default).toHaveBeenCalledWith({ skip, limit });
        expect(res.body).toEqual({ books: ret });
      })
      .then(done, done.fail);
  });

  it('list book info with default parameter', done => {
    const ret = 'something';
    spyOn(listBooks, 'default').and.returnValue(Promise.resolve(ret));

    return request
      .get('/book')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(listBooks.default).toHaveBeenCalledWith({
          skip: 0,
          limit: 10,
        });
        expect(res.body).toEqual({ books: ret });
      })
      .then(done, done.fail);
  });
});

