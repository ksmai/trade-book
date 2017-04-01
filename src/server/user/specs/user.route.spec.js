import bodyParser from 'body-parser';
import express from 'express';
import supertest from 'supertest';

import userRouter from '../user.route';
import * as updateInfo from '../update-info';
import * as changePassword from '../change-password';

describe('User routes', () => {
  const name = 'coolname';
  let request;

  beforeAll(() => {
    const app = express();
    app.use(bodyParser.json());
    app.use((req, res, next) => {
      req.user = { name };
      next();
    });
    app.use(userRouter);
    request = supertest(app);
  });

  it('update info', done => {
    const email = 'some@email.com';
    const displayName = 'I am awes0me';
    const location = 'mars';
    const user = { name, email, displayName, location };
    const ret = { toObject: jasmine.createSpy().and.returnValue(user) };
    spyOn(updateInfo, 'default').and.returnValue(Promise.resolve(ret));

    return request
      .put('/user')
      .send({ email, displayName, location })
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(updateInfo.default).toHaveBeenCalledWith({
          name,
          displayName,
          email,
          location,
        });
        expect(res.body).toEqual({ user });
      })
      .then(done, done.fail);
  });

  it('changes password', done => {
    const oldPassword = 'somethingOld';
    const newPassword = 'somethingNew';
    const val = 'somevalue';
    const ret = { toObject: jasmine.createSpy().and.returnValue(val) };
    spyOn(changePassword, 'default').and.returnValue(Promise.resolve(ret));

    return request
      .put('/user')
      .send({ oldPassword, newPassword })
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(changePassword.default).toHaveBeenCalledWith({
          oldPassword,
          newPassword,
          name,
        });
        expect(res.body).toEqual({ user: val });
      })
      .then(done, done.fail);
  });
});

