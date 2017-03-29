import { Mockgoose } from 'mockgoose';
import mongoose from 'mongoose';

import changePassword from '../change-password';
import { testUser } from '../../test-util';
import User from '../user.model';

describe('Change password controller', () => {
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

  it('can change password and set lastLogin', done => {
    const now = new Date();
    const { name, password: oldPassword } = testUser;
    const newPassword = oldPassword + oldPassword;
    expect(newPassword).not.toEqual(oldPassword);

    return changePassword({ name, oldPassword, newPassword })
      .then(user => {
        expect(user.hash).not.toEqual(testUser.hash);
        expect(user.lastLogin).not.toBeLessThan(now);
        expect(user.lastLogin).not.toBeGreaterThan(new Date());
      })
      .then(done, done.fail);
  });

  it('reject if newPassword is less than 8 characters', done => {
    const { name, password: oldPassword } = testUser;
    const newPassword = '123';

    return changePassword({ name, oldPassword, newPassword })
      .then(done.fail, done);
  });

  it('reject if oldPassword is incorrect', done => {
    const { name, password: newPassword } = testUser;
    const oldPassword = '123456789';

    return changePassword({ name, oldPassword, newPassword })
      .then(done.fail, done);
  });

  it('reject if name is not found', done => {
    const name = '404notfound';
    const oldPassword = '123456789';
    const newPassword = 'thisisuseless';

    return changePassword({ name, oldPassword, newPassword })
      .then(done.fail, done);
  });
});

