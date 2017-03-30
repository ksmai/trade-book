import Book from '../book/book.model';
import BookInfo from '../book-info/book-info.model';
import Trade from './trade.model';

function listPending({ user }) {
  return Book
    .find({ user })
    .exec()
    .then(books => {
      const bookIDs = books.map(book => book._id);

      return Trade
        .find({ book: { $in: bookIDs } })
        .populate('book')
        .populate('requester', { hash: 0 })
        .exec();
    })
    .then(trades => {
      return BookInfo.populate(trades, { path: 'book.info' });
    });
}

export default listPending;

