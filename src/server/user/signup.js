import bcrypt from 'bcrypt';
import User from './user.model';

function signup({ name, password }) {
  if (password.length < 8) {
    const err = new Error('Password must have at least 8 characters.');

    return Promise.reject(err);
  }

  return bcrypt
    .hash(password, 10)
    .then(hash => User.create({ name, hash }));
}

export default signup;

