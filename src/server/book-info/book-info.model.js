import mongoose from 'mongoose';

const bookInfoSchema = new mongoose.Schema({
  volumeID: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    index: true,
  },
  title: {
    type: String,
    trim: true,
    required: true,
  },
  subtitle: {
    type: String,
    trim: true,
  },
  thumbnail: {
    type: String,
    match: /^\/\//,
    required: true,
  },
});

export default mongoose.model('BookInfo', bookInfoSchema, 'bookInfos');

