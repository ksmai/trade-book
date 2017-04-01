import Trade from './trade.model';
import Book from '../book/book.model';

function initTrade({ requester, book, comment }) {
  const query = { requester, book };
  const updates = { requester, book, comment };
  const options = {
    new: true,
    upsert: true,
    setDefaultsOnInsert: true,
    runValidators: true,
  };

  return Book
    .findById(book)
    .exec()
    .then(bookFound => {
      if (!bookFound || bookFound.user.toString() === requester) {
        throw new Error('Cannot create the trade');
      }

      return Trade.findOneAndUpdate(query, updates, options).exec();
    });
}

export default initTrade;

