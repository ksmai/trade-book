import mongoose from 'mongoose';

const bookSchema = {
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  info: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BookInfo',
    required: true,
  },
};

export default mongoose.model('Book', bookSchema, 'books');

