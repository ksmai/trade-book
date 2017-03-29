import mongoose from 'mongoose';

mongoose.Promise = Promise;
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    match: /^[A-Za-z0-9@.-_]{1,255}$/,
    required: true,
    index: true,
    unique: true,
  },
  displayName: {
    type: String,
    trim: true,
    maxlength: 255,
  },
  hash: {
    type: String,
    match: /^[A-Za-z0-9$.\/]{60}$/,
    required: true,
  },
  email: {
    type: String,
    match: /[^@ ]+@[^@ ]+/,
    maxlength: 254,
  },
  location: {
    type: String,
    trim: true,
    maxlength: 1024,
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('User', userSchema, 'users');

