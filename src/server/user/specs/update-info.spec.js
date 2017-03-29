import { Mockgoose } from 'mockgoose';
import mongoose from 'mongoose';

import updateInfo from '../update-info';
import { testUser } from '../../test-util';
import User from '../user.model';

describe('Update info controller', () => {
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

  it('can update email/location/displayName/lastLogin of a user', done => {
    const email = 'foo@bar.com';
    const location = 'Harvard University';
    const displayName = 'My Awesome Display Name';
    const now = new Date();
    const name = testUser.name;

    return updateInfo({ email, location, displayName, name })
      .then(() => User.findOne({ name }))
      .then(user => {
        expect(user.email).toEqual(email);
        expect(user.location).toEqual(location);
        expect(user.displayName).toEqual(displayName);
        expect(user.lastLogin).not.toBeGreaterThan(new Date());
        expect(user.lastLogin).not.toBeLessThan(now);
      })
      .then(done, done.fail);
  });

  it('reject if name not found', done => {
    const name = `abc${testUser.name}`;
    expect(name).not.toEqual(testUser.name);

    return updateInfo({ name })
      .then(done.fail, done);
  });

  it('reject if email is (obviously) invalid', done => {
    const email = '@@@@';
    const name = testUser.name;

    return updateInfo({ name, email })
      .then(done.fail, done);
  });

  it('reject if location is too long', done => {
    const location = 'abc'.repeat(1024);
    const name = testUser.name;

    return updateInfo({ name, location })
      .then(done.fail, done);
  });

  it('reject if displayName is too long', done => {
    const displayName = 'abc'.repeat(1024);
    const name = testUser.name;

    return updateInfo({ name, displayName })
      .then(done.fail, done);
  });
});

