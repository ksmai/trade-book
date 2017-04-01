import bcrypt from 'bcrypt';
import User from './user.model';

function login({ name, password }) {
  const query = { name };

  return User
    .findOne(query)
    .exec()
    .then(user => {
      if (!user) {
        throw new Error(`User "${name}" not found.`);
      }

      return bcrypt.compare(password, user.hash)
        .then(match => match ? user : null);
    })
    .then(user => {
      if (!user) {
        throw new Error('Password does not match.');
      }

      user.lastLogin = new Date();

      return user.save();
    });
}

export default login;

