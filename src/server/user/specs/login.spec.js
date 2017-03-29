import { Mockgoose } from 'mockgoose';
import mongoose from 'mongoose';

import login from '../login';
import { testUser } from '../../test-util';
import User from '../user.model';

describe('Login controller', () => {
  beforeAll(done => {
    mongoose.Promise = Promise;

    return (new Mockgoose(mongoose))
      .prepareStorage()
      .then(() => mongoose.connect(''))
      .then(done)
      .catch(done.fail);
  }, 120000);

  beforeEach(done => {
    return User
      .remove({})
      .then(() => User.create(testUser))
      .then(done, done.fail);
  });

  afterAll(done => {
    return mongoose
      .disconnect()
      .then(done, done.fail);
  });

  it('can log user in and update lastLogin', done => {
    const now = new Date();

    return login({ name: testUser.name, password: testUser.password })
      .then(user => {
        expect(user.lastLogin).not.toBeLessThan(now);
        expect(user.lastLogin).not.toBeGreaterThan(new Date());

        return user;
      })
      .then(done, done.fail);
  });

  it('reject invalid name', done => {
    const name = `invalid${testUser.name}`;
    expect(name).not.toEqual(testUser.name);

    return login({ name, password: testUser.password })
      .then(done.fail, done);
  });

  it('reject invalid password', done => {
    const password = `${testUser.password}invalid`;
    expect(password).not.toEqual(testUser.password);

    return login({ password, name: testUser.name })
      .then(done.fail, done);
  });
});

