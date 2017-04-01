import { Mockgoose } from 'mockgoose';
import mongoose from 'mongoose';

import signup from '../signup';
import { testUser } from '../../test-util';
import User from '../user.model';

describe('Signup controller', () => {
  beforeAll(done => {
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

  it('can create a new user and set lastLogin', done => {
    const name = 'awesome';
    const now = new Date();

    return signup({ name, password: '12345678' })
      .then(() => User.findOne({ name }).exec())
      .then(user => {
        expect(user.name).toEqual(name);
        expect(user.lastLogin).not.toBeLessThan(now);
        expect(user.lastLogin).not.toBeGreaterThan(new Date());
      })
      .then(done, done.fail);
  });

  it('reject password with less than 8 characters', done => {
    const name = 'shortpw';
    const password = '123';

    return signup({ name, password }).then(done.fail, done);
  });

  it('reject if name already exists', done => {
    return signup({ name: testUser.name, password: testUser.password })
      .then(done.fail, done);
  });
});

