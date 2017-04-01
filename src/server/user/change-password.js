import bcrypt from 'bcrypt';
import login from './login';

function changePassword({ name, oldPassword, newPassword }) {
  if (newPassword.length < 8) {
    const err = new Error('Password must have at least 8 characters');

    return Promise.reject(err);
  }

  return login({ name, password: oldPassword })
    .then(user => {
      return bcrypt
        .hash(newPassword, 10)
        .then(newHash => {
          user.hash = newHash;
          user.lastLogin = new Date();

          return user.save();
        });
    });
}

export default changePassword;

