import mongoose from 'mongoose';

const tradeSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
    required: true,
  },
  isAccepted: {
    type: Boolean,
    default: false,
    required: true,
  },
  isRejected: {
    type: Boolean,
    default: false,
    required: true,
  },
  comment: {
    type: String,
    trim: true,
    minlength: 1,
    required: true,
  },
});

export default mongoose.model('Trade', tradeSchema, 'trades');

