import User from './user.model';

function updateInfo({ name, email, location, displayName }) {
  const query = { name };
  const updates = { email, location, displayName, lastLogin: new Date() };
  const options = {
    new: true,
    upsert: false,
    runValidators: true,
  };

  return User.findOneAndUpdate(query, updates, options)
    .then(user => {
      if(!user) {
        throw new Error(`User "${name}" not found.`);
      }

      return user;
    });
}

export default updateInfo;

