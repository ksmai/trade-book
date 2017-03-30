import Trade from './trade.model';
import Book from '../book/book.model';

function initTrade({ requester, book }) {
  const query = { requester, book };
  const options = {
    new: true,
    upsert: true,
    setDefaultsOnInsert: true,
    runValidators: true,
  };

  return Book
    .findById(book)
    .exec()
    .then(book => {
      if(!book || book.user.toString() === requester) {
        throw new Error('Cannot create the trade');
      }

      return Trade.findOneAndUpdate(query, query, options).exec();
    });
}

export default initTrade;

